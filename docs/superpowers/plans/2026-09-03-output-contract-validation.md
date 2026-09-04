# Output Contract Validation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 12·13강의 필수 체크포인트를 실행 가능한 Python 코드, 결정적 테스트, 재현 가능한 실행 증거로 구현한다.

**Architecture:** Pydantic 계약 모델이 형식 계약을 강제하고, validator가 parse/schema/policy 오류를 분리한다. pipeline은 주입된 응답 provider를 최대 `retry_ceiling`만큼 재시도하고, 초과 시 `escalation_owner`에게 넘긴다. 외부 LLM 호출 없이 결정적 시나리오로 제어 흐름을 검증한다.

**Tech Stack:** Python 3.11+, Pydantic 2.x, stdlib `unittest`, 기존 Node.js 테스트

**Spec:** `docs/output-contract/ContractSpec.md`, `docs/output-contract/failure_taxonomy.md`

## Global Constraints

- 공개 저장소에 API key, `.env`, 실제 사용자 데이터, 원본 대화 로그를 넣지 않는다.
- 루트 포트폴리오의 기존 동작과 무관한 코드는 수정하지 않는다.
- 실제 LLM 품질을 측정했다고 주장하지 않는다. 이번 증거는 deterministic control-flow 검증이다.
- 커밋과 push는 사용자가 별도로 요청하기 전까지 수행하지 않는다.

---

## Task 1: 프로젝트 골격과 검증기 RED 테스트

- [ ] `projects/output-contract/tests/test_validator.py`에 정상 JSON, `NO_JSON`, `JSON_DECODE`, `SCHEMA_VIOLATION`, `POLICY_ERROR` 사례를 작성한다.
- [ ] 테스트를 실행해 구현 모듈 부재로 실패하는지 확인한다.

검증 명령: `python -m unittest tests.test_validator -v`

## Task 2: 계약 모델과 3단계 검증기 GREEN 구현

- [ ] `output_contract/contract.py`에 `schema_version`, Pydantic schema, `retry_ceiling`, `escalation_owner`를 선언한다.
- [ ] `output_contract/validator.py`에 JSON 추출·파싱, schema 검증, policy 검증, 정확한 `valid/invalid` 정의를 구현한다.
- [ ] validator 테스트를 모두 통과시킨다.

성공 조건: 유효 입력만 `success=True`; 모든 위반은 공개 오류 분류와 내부 오류 코드가 일치한다.

## Task 3: 재시도/에스컬레이션 RED 테스트

- [ ] `projects/output-contract/tests/test_pipeline.py`에 첫 시도 성공, 1회 복구 성공, 재시도 초과, 재시도 0회 사례를 작성한다.
- [ ] pipeline 미구현 상태의 실패를 확인한다.

검증 명령: `python -m unittest tests.test_pipeline -v`

## Task 4: retry_or_escalate GREEN 구현

- [ ] `output_contract/pipeline.py`에 provider 주입형 실행 루프를 구현한다.
- [ ] 각 시도에 `accept`, `retry`, `escalate` 결정을 기록한다.
- [ ] 초과 시 `human_review`와 `escalation_owner`를 반환한다.
- [ ] 전체 Python 테스트를 통과시킨다.

## Task 5: 실행 예시와 검증 증거

- [ ] `run_demo.py`에 합성 입력 기반 대표 시나리오를 만든다.
- [ ] `README.md`에 구조, 실행법, 설계 선택, 한계를 기록한다.
- [ ] 실제 실행 결과를 `evidence/verification.md`에 명령·환경·결과와 함께 기록한다.
- [ ] 기존 12·13강 체크포인트 문서의 구현 상태를 사실에 맞게 갱신한다.

## Task 6: 최종 검증과 공개 안전성 점검

- [ ] Python 전체 테스트를 새로 실행한다.
- [ ] 기존 `npm test`를 실행해 회귀가 없는지 확인한다.
- [ ] demo 실행, `git diff --check`, 비밀정보 패턴 검색을 수행한다.
- [ ] 커밋하지 않은 변경 목록을 사용자에게 보고한다.
