# 서정현 — AI Agent Portfolio

[공개 포트폴리오](https://ai-agent-portfolio-theta.vercel.app/) · [GitHub 프로필](https://github.com/SJeongHyeon)

기업여신 심사, 면접 코칭, 음성 분석의 세 팀 프로젝트에서 맡은 작업과 검증 근거를 소개하는 정적 사이트입니다. 채용 담당자는 프로젝트와 역할을 먼저 보고, 기술 면접관은 구현·측정 조건·한계를 따라 읽을 수 있게 구성했습니다.

## 대표 프로젝트

| 프로젝트 | 개인 기여 | 공개 근거 |
| --- | --- | --- |
| CreditPulse | 초기 그래프 라우팅·단일 에이전트·승인 재개, 평가 지표·인용 검증, 심사 API·화면, 미채택 검색 실험 | [서비스](https://creditpulse-api-236552047198.asia-northeast3.run.app/) · [공개용 코드·평가 기록](https://github.com/SJeongHyeon/credit-pulse) · [시연 영상](https://github.com/SJeongHyeon/credit-pulse/blob/main/docs/demo/creditpulse_demo.mp4) |
| 말해봄 Mk.2 | 모델·프롬프트 평가, Langfuse 관측, E2E·CI, UI 개선 | [공개용 코드·평가 기록](https://github.com/SJeongHyeon/malhaebom-mk2) |
| 보이스가드 | FastAPI API, 비동기 분석 작업 관리, Railway 배포 | [서비스 화면](https://voice-guard-project.netlify.app/) · [공개용 코드](https://github.com/SJeongHyeon/voiceguard) · [시연 영상](https://github.com/SJeongHyeon/voiceguard/blob/main/docs/demo/voiceguard_demo.mp4) (분석 백엔드 중지) |

CreditPulse의 정답 근거 인용 23/25는 팀의 동결 평가셋 v2 관련 25문항을 2026-11-12 한 번 실행한 값입니다. 같은 평가셋으로 구성을 골랐고, 독립 질문에서 일반화 성능을 잰 기록은 없습니다. 그래프 검색은 동결 v2에서 한 문항 회귀와 검색 p95 증가로, 목차 어휘 번역은 일상어 23문항 1회에서 Hit@10 20/23 → 22/23이었지만 검색 p50 지연 한도 초과로 기본 경로에 적용하지 않았습니다. 목차 어휘 번역은 동결 v2를 측정하지 않았습니다. 팀 결과와 개인 기여는 각 공개 사본의 CONTRIBUTIONS.md에서 구분합니다.

## 페이지 구성

개발자의 구현·검증 방식 → 같은 위계의 세 대표 프로젝트 → 기술과 프로젝트 근거 → 사례별 기여·검증·한계 → 이전 학습 작업 → GitHub. CreditPulse는 첫 사례로 배치하되 세 프로젝트를 동일한 카드 형식으로 보여 줍니다. 설명용 서비스 흐름 도식은 실제 서비스 화면 캡처가 아닙니다.

## 구조와 실행

- index.html: 페이지 구조와 접근성
- styles.css: 흑백 디자인과 반응형 배치
- src/portfolio.js: 프로젝트 데이터와 카드·사례 렌더링
- src/main.js: 섹션 초기화
- src/docent-data.js, src/docent.js: 사전 작성된 안내 답변과 입력 처리
- tests/: 링크·렌더링·구조·안내 동작 검증

Node.js에서 npm test로 확인합니다. 로컬 화면은 프로젝트 루트에서 python -m http.server 4173 --bind 127.0.0.1을 실행하고 http://127.0.0.1:4173 에서 봅니다. 사이트는 정적 파일로 제공되며 외부 AI API를 호출하지 않습니다. 안내 도슨트는 생성형 AI가 아니라 미리 작성한 답변을 보여 줍니다.

## 배포와 한계

Vercel의 기존 프로젝트는 GitHub 저장소 SJeongHyeon/ai-agent-portfolio의 main을 사용합니다. 공개 사이트의 반영 상태는 상단의 포트폴리오 링크에서 확인할 수 있습니다.

보이스가드의 운영 백엔드는 2026-11-19 확인 시 내려가 있어 시연 영상으로 동작을 확인할 수 있습니다. 말해봄과 CreditPulse의 팀 운영 서비스도 지속 기간이 정해져 있지 않습니다. 포트폴리오의 수치와 기술 설명은 각 저장소에 적힌 실행 조건의 범위에서 읽어야 합니다.
