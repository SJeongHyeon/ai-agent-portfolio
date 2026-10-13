# 서정현 — AI Agent Portfolio

두 팀 프로젝트의 개인 기여와 검증 과정을 소개하는 정적 포트폴리오입니다.

[공개 포트폴리오](https://ai-agent-portfolio-theta.vercel.app/)

## 포트폴리오 목표

채용 담당자가 대표 프로젝트와 담당 역할을 빠르게 파악하고, 기술 면접관이 문제·접근·기여·근거·한계를 확인할 수 있도록 구성했습니다. Junior AI Agent Developer 방향을 유지하며 흑백 디자인을 사용합니다.

## 대표 프로젝트와 검증 가능한 증거

| 프로젝트 | 개인 기여 | 공개 자료 |
| --- | --- | --- |
| 말해봄 Mk.2 | 사람 평가 기준 수립·재검증, 모델·프롬프트 비교, Langfuse 검증, E2E·pytest CI, UI 개선, PPT 제작 | [팀 소개](https://nanocode00.github.io/malhaebom-showcase/) / 코드 비공개 |
| 보이스가드 | FastAPI API, 비동기 분석 작업 관리, Railway 배포 | [팀 저장소](https://github.com/aihuman-7th/proj1-e) |

Langfuse 검증은 트레이스·입출력, 토큰·비용·지연 시간 확인과 오류 추적입니다. PPT는 제작만 담당했고 발표는 담당하지 않았습니다. 과거 평가·개별 API 성공과 최신 서비스 전체 품질을 구분합니다. 팀의 모델 성능을 개인 개발 성과로 표현하지 않습니다.

## 페이지 구성

소개 → 대표 프로젝트 → 개인 기여·검증 상세 → 역량 → 학습 프로젝트 → 관심 분야·GitHub 연락 경로.

기존 EDA, MNIST·회귀, 음악 장르 예측은 학습 프로젝트로 보존합니다.

## 구조

- index.html: 의미 구조와 접근성, 도슨트 UI
- styles.css: 흑백 팔레트, 반응형 레이아웃
- src/portfolio.js: 프로필·프로젝트 데이터, 카드와 상세 렌더링
- src/main.js: 그룹별 화면 초기화
- src/docent-data.js: 사전 작성 질문·답변
- src/docent.js: 입력 검증과 도슨트 동작
- tests/: 렌더링·링크·라우팅·입력 경계 회귀 테스트

## 로컬 실행

Node.js가 있는 환경에서 `npm test`로 검증합니다. 프로덕션 패키지 의존성은 없습니다.

```sh
npm test
python -m http.server 4173 --bind 127.0.0.1
```

http://127.0.0.1:4173 에서 확인합니다. 브라우저의 파일 직접 열기 대신 HTTP 서버를 사용해 ES modules를 로드합니다.

## 키워드 기반 AI 도슨트

실제 생성형 AI가 아니며 외부 AI API를 사용하지 않습니다. 사전 작성된 포트폴리오 답변만 제공합니다. 질문은 최대 240자이고 대화 내용을 저장하거나 전송하지 않습니다. 준비되지 않은 질문은 안내 가능한 범위를 알려줍니다.

## Vercel 배포

기존 SJeongHyeon/ai-agent-portfolio 저장소와 Vercel 프로젝트를 사용합니다. Framework Preset은 Other이며 별도 빌드 없이 정적 파일을 제공합니다. 변경 브랜치를 검토한 뒤 승인된 변경을 GitHub에 반영하고 Vercel의 배포 결과를 확인합니다.

기존 reliable-ai-engineer-portfolio 및 Streamlit·MINI-TEST 프로젝트를 삭제하거나 이동하지 않습니다. 새 배포 검증 전 기존 공개 사이트를 유지합니다.

## 알려진 한계

- 말해봄 코드와 상세 내부 실험 기록은 비공개이며 공개 소개와 개인 기여 요약만 제공합니다.
- 서비스 흐름 도식은 설명용이며 실제 서비스 화면 캡처가 아닙니다.
- 과거 평가 기록은 현재 운영 버전의 성공·품질을 보장하지 않습니다.
- 이 개편은 포트폴리오 UI 검증이며 두 팀 서비스의 신규 E2E 테스트를 수행한 것은 아닙니다.
- 연락 수단은 GitHub입니다.
