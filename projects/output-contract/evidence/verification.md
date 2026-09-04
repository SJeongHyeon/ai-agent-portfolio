# Verification Evidence

검증일: 2026-09-03 (Asia/Seoul)

## 검증 환경

- Python: 3.11.9
- Pydantic: 2.13.5
- 외부 LLM/API 호출: 없음
- 입력 데이터: 저장소에 포함된 합성 JSON과 합성 오류 응답

## 자동 테스트

실행 명령:

```powershell
python -m unittest discover -s tests -v
```

실행 결과:

```text
Ran 12 tests in 0.002s

OK
```

검증된 항목:

- `schema_version == "1.0.0"`
- `retry_ceiling == 1`
- `escalation_owner == "human_reviewer"`
- 정상 응답의 `valid` 판정
- `NO_JSON`, `JSON_DECODE`의 `parse_error` 분류
- 키·enum·범위 위반의 `schema_error` 분류
- 필드 간 모순의 `policy_error` 분류
- 첫 시도 성공 시 재시도하지 않음
- 첫 실패 후 한 번만 재시도
- 재시도 초과 시 `human_review`와 `escalate` 반환
- `retry_ceiling=0`일 때 최초 실패 직후 escalation

## 데모 실행

실행 명령:

```powershell
python run_demo.py
```

| 시나리오 | 최종 상태 | 시도 | 재시도 | 결정 |
| --- | --- | ---: | ---: | --- |
| 첫 응답 valid | `accepted` | 1 | 0 | `accept` |
| `NO_JSON` 후 정상 응답 | `accepted` | 2 | 1 | `retry -> accept` |
| `JSON_DECODE` 2회 | `human_review` | 2 | 1 | `retry -> escalate` |
| `SCHEMA_VIOLATION` 2회 | `human_review` | 2 | 1 | `retry -> escalate` |
| `POLICY_ERROR` 2회 | `human_review` | 2 | 1 | `retry -> escalate` |

세 escalation 시나리오 모두 `escalation_owner="human_reviewer"`를 반환했습니다.

## 증거의 범위

이 결과는 validator와 retry/escalate 제어 흐름이 정해진 입력에서 작동한다는 deterministic evidence입니다. 실제 LLM의 정확도, latency, token usage, 비용 개선을 증명하지는 않습니다. 운영용 사람 검토 queue 전송도 아직 구현하지 않았습니다.
