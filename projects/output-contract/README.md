# Versioned LLM Output Contract & Validation Pipeline

LLM의 자유로운 응답을 버전이 있는 JSON 계약으로 검사하고, 한 번만 자동 재시도한 뒤 실패하면 사람에게 넘기는 학습용 프로젝트입니다.

## 해결하려는 문제

LLM은 JSON을 요청해도 설명문을 붙이거나, 키·타입·범위를 틀리거나, 형식상 맞지만 업무적으로 모순된 값을 만들 수 있습니다. 이 프로젝트는 실패를 한 덩어리로 처리하지 않고 실패 지점을 구분해 다음 행동을 결정합니다.

```text
raw output
  -> JSON parse
  -> schema validation
  -> policy validation
  -> accept / retry / human_review
```

## 12강 체크포인트

| 필수 항목 | 구현값 | 의미 |
| --- | --- | --- |
| `schema_version` | `1.0.0` | 계약 변경 전후를 구별하는 버전 |
| `valid` | parse + schema + policy를 모두 통과 | 다음 코드가 안전하게 사용할 수 있음 |
| `invalid` | 세 단계 중 하나라도 실패 | 자동 사용을 중단하고 오류를 분류 |
| `retry_ceiling` | `1` | 최초 시도 뒤 자동 수리는 최대 한 번 |
| `escalation_owner` | `human_reviewer` | 재시도 후에도 실패하면 확인할 담당자 |

일상 예시로 보면, 택배 상자를 받는 과정과 같습니다. 주소표를 읽을 수 있는지(parse), 주문한 물건과 규격이 맞는지(schema), 규격은 맞아도 실제 주문 규칙과 모순되지 않는지(policy)를 차례로 확인합니다.

## 13강 체크포인트

| 공개 분류 | 내부 코드 | 정확한 판정 |
| --- | --- | --- |
| `parse_error` | `NO_JSON`, `JSON_DECODE` | JSON 객체가 없거나 JSON 문법을 읽을 수 없음 |
| `schema_error` | `SCHEMA_VIOLATION` | 필수 키, 타입, enum, 숫자 범위 계약 위반 |
| `policy_error` | `POLICY_ERROR` | 형식은 맞지만 필드 사이 업무 규칙이 모순 |
| `retry_or_escalate` | `retry`, `escalate` | 재시도 여유가 있으면 retry, 없으면 사람 검토 |

현재 policy는 두 가지입니다.

- `issue == "delivery_delay"`이면 `delay_days > 0`
- 배송 지연 이슈가 아니면 `delay_days == 0`

## 설치와 실행

Python 3.11 이상에서 이 디렉터리로 이동한 다음 실행합니다.

```bash
python -m venv .venv
# Windows
.venv\Scripts\python -m pip install -r requirements.txt
.venv\Scripts\python -m unittest discover -s tests -v
.venv\Scripts\python run_demo.py
```

macOS/Linux에서는 마지막 세 명령의 `.venv\Scripts\python`을 `.venv/bin/python`으로 바꾸면 됩니다.

## 핵심 코드

```python
from output_contract.pipeline import run_pipeline

responses = iter([
    "JSON이 아닌 첫 응답",
    '{"sentiment":"negative","issue":"delivery_delay",'
    '"delay_days":3,"sentiment_score":-0.8}',
])

result = run_pipeline(lambda attempt, previous_result: next(responses))
print(result.status)          # accepted
print(result.retries)         # 1
print(result.final_decision)  # accept
```

provider를 함수로 주입했기 때문에 테스트에서는 고정 응답을 사용하고, 나중에는 실제 LLM 호출 함수로 교체할 수 있습니다. 모델 추론과 검증·재시도 제어 책임도 분리됩니다.

## 테스트와 증거

- validator 테스트: 정상, JSON 없음, 깨진 JSON, schema 위반, policy 위반
- pipeline 테스트: 첫 시도 성공, 한 번 수리 성공, 재시도 초과, 재시도 금지
- 실행 결과: [evidence/verification.md](evidence/verification.md)

이 테스트는 같은 입력에 항상 같은 결과가 나오는 deterministic test입니다. 실제 모델의 정확도·비용·지연시간 평가는 아닙니다.

## 주요 설계 결정과 trade-off

- Pydantic strict schema를 사용해 암묵적 타입 변환과 알 수 없는 추가 키를 막았습니다.
- 공개 오류 분류와 내부 코드를 분리해 사용자 설명은 단순하게, 디버깅은 구체적으로 유지했습니다.
- 재시도를 1회로 제한해 무한 반복·비용·지연 증가를 막았습니다.
- 외부 LLM 없이 provider를 주입해 제어 흐름을 빠르고 결정적으로 검증했습니다. 대신 실제 모델 품질은 별도 평가가 필요합니다.

## 알려진 한계와 다음 단계

- JSON 추출은 첫 `{`부터 마지막 `}`까지를 후보로 삼는 학습용 구현입니다. 여러 객체나 문자열 속 중괄호에는 더 견고한 decoder가 필요합니다.
- 한 리뷰에서 하나의 `issue`만 표현합니다.
- 원문과 구조화 결과의 의미 일치 여부는 아직 검사하지 않습니다.
- 실제 LLM 평가셋, latency, token usage, 비용 측정은 아직 없습니다.
- 실제 사람 검토 시스템에 전송하지 않고 `human_review` 상태와 담당자만 반환합니다.

## 내가 직접 구현한 범위

버전 계약, Pydantic schema, parse/schema/policy 분류, 재시도 상한, escalation 결정, deterministic 테스트와 데모를 이 프로젝트 범위로 구현했습니다. 외부 모델 연동과 운영용 queue는 포함하지 않았습니다.
