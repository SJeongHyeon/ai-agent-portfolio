# LLM Output Failure Taxonomy

## 1. 목적

LLM의 깨진 응답을 하나의 `실패`로 뭉개지 않고, 실패 지점과 원인을 분류해 재시도·중단·사람 검토 중 다음 행동을 결정한다.

핵심 원칙:

> 실패의 종류가 다르면 처방도 달라야 한다.

## 2. 파이프라인

```text
LLM raw response
  -> JSON candidate extraction
  -> JSON parsing
  -> schema validation
  -> policy validation
  -> accepted result or retry/escalation
```

## 3. 실패 분류

| 공개 분류 | 내부 오류 코드 | 실패 단계 | 의미 | 재시도 가능 |
| --- | --- | --- | --- | --- |
| `parse_error` | `NO_JSON` | parsing | 응답에 JSON 객체가 없음 | 예 |
| `parse_error` | `JSON_DECODE` | parsing | JSON 후보는 있지만 문법이 깨짐 | 예 |
| `schema_error` | `SCHEMA_VIOLATION` | validation | JSON 문법은 맞지만 키·타입·enum·범위를 위반 | 예 |
| `policy_error` | `POLICY_ERROR` | policy | 스키마는 맞지만 원문 근거 또는 업무 규칙을 위반 | 조건부 |
| `runtime_error` | `TIMEOUT`, `RATE_LIMIT`, `PROVIDER_ERROR` | execution | 모델 또는 네트워크 호출 실패 | 조건부 |

`runtime_error`는 13강의 핵심 3종 밖이지만, 실제 Agent에서 출력 실패와 호출 실패를 혼동하지 않기 위해 경계를 기록한다.

## 4. 오류별 예시와 처방

### `NO_JSON`

```text
이 리뷰는 부정적이며 배송 문제가 있습니다.
```

처방:

- JSON 객체 하나만 출력하도록 지시한다.
- 설명·인사·Markdown을 금지한다.
- 한 번만 재시도한다.

### `JSON_DECODE`

```json
{"sentiment": "negative", "issue": "delivery_delay",}
```

처방:

- JSON parser의 오류 메시지를 수리 요청에 포함한다.
- 임의 문자열 치환보다 모델 재요청을 우선한다.
- 자동 치환을 한다면 변경 전후 값을 로그에 남긴다.

### `SCHEMA_VIOLATION`

```json
{
  "sentiment": "화남",
  "issue": "delivery_delay",
  "delay_days": 3,
  "sentiment_score": -0.8
}
```

처방:

- 위반 필드 이름을 알려준다.
- 허용 enum·타입·범위를 다시 제공한다.
- 원래 입력과 계약은 변경하지 않는다.

### `POLICY_ERROR`

```json
{
  "sentiment": "negative",
  "issue": "delivery_delay",
  "delay_days": 0,
  "sentiment_score": -0.8
}
```

문법과 스키마는 맞지만 `delivery_delay`와 `delay_days=0`이 모순이다.

처방:

- 위반한 업무 규칙을 설명한다.
- 원문에 정보가 없으면 값을 추측하지 말고 사람 검토로 보낸다.
- 결제·법률·의료처럼 위험이 큰 작업은 자동 수리보다 즉시 escalation한다.

## 5. 검증 결과 타입

```python
from dataclasses import dataclass


@dataclass
class ValidationResult:
    success: bool
    data: "ReviewExtraction | None"
    error_type: str | None
    error_detail: str | None
```

설계 이유:

- `bool`만 반환하면 실패 원인을 알 수 없다.
- 구조화된 결과가 있어야 오류별 재시도와 로그가 가능하다.
- LLM 응답 검증에는 Pydantic을 사용하고, 검증 결과 전달에는 dataclass를 사용한다.

## 6. Retry or Escalate 정책

```yaml
max_attempts: 2
initial_attempt: STRICT
retry_attempt: REPAIR
final_state: human_review
```

`max_attempts=2`는 최초 호출 1회와 자동 재시도 1회를 의미한다.

| 오류 | 첫 실패 후 | 두 번째 실패 후 |
| --- | --- | --- |
| `NO_JSON` | JSON 전용 REPAIR | `human_review` |
| `JSON_DECODE` | 문법 오류 기반 REPAIR | `human_review` |
| `SCHEMA_VIOLATION` | 필드 오류 기반 REPAIR | `human_review` |
| `POLICY_ERROR` | 저위험이면 REPAIR, 고위험이면 즉시 검토 | `human_review` |
| `TIMEOUT` | 짧은 backoff 후 재시도 | `human_review` 또는 provider fallback |
| `RATE_LIMIT` | provider가 알려준 시간만큼 대기 | 재시도 상한 후 fallback |

의사코드:

```python
result = validate(raw)

if result.success:
    return {"status": "ok", "data": result.data}

if attempt < retry_ceiling:
    return retry_with_hint(result.error_type, result.error_detail)

return {
    "status": "human_review",
    "reason": result.error_type,
}
```

## 7. 심판부터 검증하는 테스트

확률적인 모델을 호출하기 전에 결정적인 `validate()`를 먼저 테스트한다.

| 테스트 | 기대 판정 |
| --- | --- |
| 자연어만 있는 응답 | `NO_JSON` |
| 끝 쉼표가 있는 JSON | `JSON_DECODE` |
| 한국어 enum 또는 범위 밖 점수 | `SCHEMA_VIOLATION` |
| 필드 사이가 모순된 정상 JSON | `POLICY_ERROR` |
| 정상 JSON | 성공 |
| 같은 오류가 두 번 반복 | 추가 호출 없이 `human_review` |

이 테스트는 같은 입력에 항상 같은 결과가 나오는 deterministic test다. 모델 품질 평가는 별도의 평가셋과 반복 실행으로 측정한다.

## 8. 관찰 가능성

내부 로그에 남길 최소 필드:

```json
{
  "trace_id": "generated-id",
  "schema_version": "1.0.0",
  "attempt": 1,
  "stage": "validation",
  "error_type": "SCHEMA_VIOLATION",
  "error_detail": "sentiment_score must be <= 1.0",
  "latency_ms": 420,
  "input_tokens": 120,
  "output_tokens": 55,
  "final_action": "retry"
}
```

보안 규칙:

- API key와 비밀번호를 기록하지 않는다.
- 실제 사용자 리뷰 원문 전체를 기본 로그에 남기지 않는다.
- 원인이 필요한 경우 비식별화한 짧은 preview 또는 데이터 ID만 남긴다.
- 사용자에게는 내부 parser·schema 상세 대신 안전한 메시지를 보여준다.

## 9. 완료 기준과 현재 증거

완료 기준:

- 정상 입력과 `parse_error`, `schema_error`, `policy_error`를 검증기가 구분한다.
- 자동 재시도가 설정된 상한을 넘지 않는다.
- 상한을 넘으면 항상 `human_review`가 반환된다.
- 시도별 `retry`, `accept`, `escalate` 결정이 trace에 기록된다.

현재 저장소 증거:

- `validate_output()`이 공개 오류 분류와 내부 오류 코드를 함께 반환한다.
- `run_pipeline()`이 기본 `retry_ceiling=1`을 강제한다.
- 반복 실패 후 `escalation_owner="human_reviewer"`를 반환한다.
- 2026-09-03 로컬 실행에서 deterministic test 12개와 데모 5개 시나리오를 확인했다.
- 상세 명령과 결과는 `projects/output-contract/evidence/verification.md`에 기록했다.

## 10. 알려진 한계와 다음 단계

- 현재 JSON 후보 추출은 첫 `{`와 마지막 `}`를 사용하므로 여러 객체와 문자열 속 중괄호에 취약할 수 있다.
- `policy_error`는 두 가지 필드 간 규칙만 검사하며 원문 근거 비교는 하지 않는다.
- `runtime_error`의 timeout, rate limit, provider fallback은 분류 설계만 있고 아직 구현하지 않았다.
- 실제 모델 품질은 100건 이상의 평가셋과 반복 실행으로 별도 측정해야 한다.
- 운영용 사람 검토 queue 전송 대신 `human_review` 상태와 owner만 반환한다.
