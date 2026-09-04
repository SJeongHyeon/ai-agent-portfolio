# Review Extraction Output Contract

## 1. 목적

고객 리뷰를 LLM이 자유 문장으로 답하는 대신, 다음 코드와 데이터베이스가 안전하게 처리할 수 있는 JSON으로 변환한다.

이 문서는 어떤 필드와 값을 허용하는지, 무엇을 valid/invalid로 판단하는지, 실패 시 몇 번 재시도하고 누구에게 넘기는지를 명시한다.

## 2. 범위와 비범위

### 범위

- 한국어 고객 리뷰 1건을 구조화한다.
- JSON 문법, 필수 필드, 타입, enum, 숫자 범위를 검사한다.
- 일부 필드 사이의 업무 규칙을 검사한다.
- 실패를 기록하고 제한된 횟수만 재시도한다.

### 비범위

- 모델 출력이 원문의 의미와 완전히 일치한다는 보장
- 여러 이슈가 동시에 있는 리뷰의 완전한 표현
- 자동 환불·보상·결제 같은 외부 행동
- 법률·재무적 의사결정

## 3. 계약 버전

```yaml
schema_version: 1.0.0
status: learning_artifact
```

- PATCH: 설명이나 검증 메시지만 변경
- MINOR: 선택 필드 또는 허용 enum 추가
- MAJOR: 필드 삭제, 이름 변경, 타입 변경처럼 기존 소비 코드가 깨지는 변경

## 4. 출력 스키마

```json
{
  "sentiment": "negative",
  "issue": "delivery_delay",
  "delay_days": 3,
  "sentiment_score": -0.8
}
```

| 필드 | 타입 | 필수 | 허용값·범위 | 의미 |
| --- | --- | --- | --- | --- |
| `sentiment` | string | 예 | `positive`, `negative`, `neutral` | 리뷰 전체의 감정 |
| `issue` | string | 예 | `none`, `delivery_delay`, `packaging`, `product_defect`, `customer_service`, `other` | 핵심 이슈 하나 |
| `delay_days` | integer | 예 | 0~30, boolean 금지 | 명시된 배송 지연 일수, 해당 없으면 0 |
| `sentiment_score` | number | 예 | -1.0~1.0 | 음수는 부정, 양수는 긍정 |

Pydantic 기준 구현:

```python
from typing import Literal
from pydantic import BaseModel, Field


class ReviewExtraction(BaseModel):
    sentiment: Literal["positive", "negative", "neutral"]
    issue: Literal[
        "none", "delivery_delay", "packaging",
        "product_defect", "customer_service", "other",
    ]
    delay_days: int = Field(ge=0, le=30)
    sentiment_score: float = Field(ge=-1.0, le=1.0)
```

## 5. 출력 생성 규칙

모델에는 다음 여섯 원칙을 전달한다.

1. 키 이름을 위 스키마와 동일하게 고정한다.
2. 문자열·정수·실수 타입을 지킨다.
3. enum과 숫자 범위를 지킨다.
4. 모든 필드를 출력하고 해당 값이 없으면 `none` 또는 0을 사용한다.
5. 입력과 출력 예시를 1~2개 제공한다.
6. 설명과 Markdown 없이 JSON 객체 하나만 출력한다.

## 6. Valid / Invalid 판정

### Valid

다음 조건을 모두 만족해야 한다.

1. 응답에서 JSON 객체 하나를 찾을 수 있다.
2. JSON 문법을 파싱할 수 있다.
3. 네 필드가 모두 존재한다.
4. 각 필드의 타입·enum·범위가 스키마와 일치한다.
5. 아래 업무 규칙을 통과한다.

### Invalid

다음 중 하나라도 발생하면 invalid다.

- JSON 객체가 없음
- JSON 문법 오류
- 필수 키 누락
- 허용하지 않은 enum
- 잘못된 타입 또는 숫자 범위
- 필드 사이의 업무 규칙 위반

## 7. 업무 규칙

스키마 검증만으로는 필드 사이의 논리적 모순을 잡지 못한다. 현재 버전은 다음 최소 규칙을 둔다.

```python
def validate_policy(data: ReviewExtraction) -> list[str]:
    errors = []

    if data.issue == "delivery_delay" and data.delay_days == 0:
        errors.append("delivery_delay requires delay_days >= 1")

    if data.issue != "delivery_delay" and data.delay_days != 0:
        errors.append("non-delivery issue requires delay_days == 0")

    return errors
```

알려진 한계: 현재 `issue`는 하나만 선택하므로 포장 파손과 배송 지연이 동시에 있는 리뷰를 완전히 표현하지 못한다.

## 8. 실패 정책

```yaml
retry_ceiling: 1
escalation_owner: human_reviewer
```

처리 순서:

1. STRICT 요청을 1회 실행한다.
2. 실패 유형과 상세 오류를 사용해 REPAIR 요청을 최대 1회 실행한다.
3. 같은 요청이 다시 실패하면 추가 호출을 중단한다.
4. 상태를 `human_review`로 기록하고 사람 검토 큐로 보낸다.

무한 재시도를 금지하는 이유는 같은 오류의 반복, API 비용 증가, 지연시간 증가를 막기 위해서다.

## 9. 오류별 처리

| 내부 상태 | 의미 | 자동 처리 |
| --- | --- | --- |
| `NO_JSON` | JSON 객체가 없음 | JSON 객체 하나만 출력하도록 1회 재요청 |
| `JSON_DECODE` | JSON 문법 오류 | 파싱 오류 위치를 제공해 1회 수리 요청 |
| `SCHEMA_VIOLATION` | 키·타입·enum·범위 위반 | 위반 필드와 허용 규칙을 제공해 1회 수리 요청 |
| `POLICY_ERROR` | 형식은 맞지만 업무 규칙 위반 | 모순을 설명해 1회 수리 요청 후 사람 검토 |

## 10. 검증 사례

| 입력 또는 모델 출력 | 기대 결과 |
| --- | --- |
| 자연어 설명만 있음 | `NO_JSON` |
| 마지막 항목 뒤에 불필요한 쉼표가 있는 JSON | `JSON_DECODE` |
| `sentiment="화남"` | `SCHEMA_VIOLATION` |
| `sentiment_score=1.5` | `SCHEMA_VIOLATION` |
| `issue="delivery_delay"`, `delay_days=0` | `POLICY_ERROR` |
| 모든 계약과 업무 규칙을 만족 | `valid` |
| REPAIR 후에도 같은 오류 | `human_review` |

## 11. 완료 기준과 현재 증거

완료 기준:

- 위 정상·실패 사례가 서로 다른 상태로 기록된다.
- 재시도 횟수가 1회를 넘지 않는다.
- 재시도 초과 결과가 `human_review`로 끝난다.
- 내부 오류 상세와 외부 제어 결과가 분리된다.

현재 저장소 증거:

- 구현: `projects/output-contract/output_contract/`
- 자동 테스트: `projects/output-contract/tests/`
- 재현 가능한 데모: `projects/output-contract/run_demo.py`
- 실행 결과: `projects/output-contract/evidence/verification.md`
- 2026-09-03 로컬 실행에서 Python 테스트 12개가 통과했다.
- 강의 Notebook의 23/30 대 1/30 결과는 특정 모델·프롬프트·리뷰 10건의 관측값이며 일반 성능으로 주장하지 않는다.

## 12. 다음 단계

1. 실제 LLM provider adapter를 별도 모듈로 연결한다.
2. 최소 100건의 비식별 평가셋으로 성공률과 실패 유형 분포를 측정한다.
3. 지연시간, token usage, 재시도 비용을 함께 기록한다.
4. 운영 환경의 실제 사람 검토 queue와 연결한다.
