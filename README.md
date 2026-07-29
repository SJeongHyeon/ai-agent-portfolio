# 서정현 — AI Agent Portfolio

신뢰할 수 있는 AI 시스템을 배우고 음성·멀티모달 경험으로 확장하는 주니어 AI 에이전트 개발자 포트폴리오입니다.

## 포트폴리오 목표

기술을 많이 나열하기보다 다음 질문에 답할 수 있는 프로젝트를 보여주는 것이 목표입니다.

- 어떤 문제를 해결하려 했는가?
- 왜 이 방법을 선택했는가?
- 무엇으로 결과를 검증했는가?
- 어떤 조건에서 실패하며 다음에는 무엇을 개선할 것인가?

프로젝트는 과장을 피하기 위해 `Built`, `Building`, `Exploring`으로 구분합니다.

## 검증 가능한 증거

현재 공개 저장소에서 확인할 수 있는 프로젝트:

- [Pima Diabetes EDA Dashboard](https://github.com/SJeongHyeon/Streamlit)
- [MNIST 분류 · 자전거 수요 회귀](https://github.com/SJeongHyeon/MINI-TEST)

현재 구현 중인 Reliable Tool-Calling Agent와 탐구 중인 Voice & Multimodal Agent는 완성된 프로젝트로 주장하지 않습니다. 코드와 평가 결과가 준비되면 별도 저장소로 공개합니다.

## 구조

```text
.
├── index.html              # 포트폴리오의 의미 구조
├── styles.css              # 반응형 디자인과 접근성 스타일
├── src/
│   ├── main.js             # 페이지 초기화
│   └── portfolio.js        # 프로필·프로젝트 데이터와 카드 렌더링
├── tests/
│   └── portfolio.test.mjs  # 포지셔닝·증거·링크·문서 검증
└── README.md
```

프레임워크 의존성을 두지 않아 코드와 배포 흐름을 쉽게 이해할 수 있도록 구성했습니다.

## 로컬 실행

테스트:

```bash
npm test
```

로컬 서버:

```bash
python -m http.server 4173
```

브라우저에서 `http://localhost:4173`을 엽니다.

## Vercel 배포

이 저장소를 GitHub에 게시한 뒤 Vercel에서 새 프로젝트로 가져옵니다.

1. Vercel의 `Add New` → `Project`를 선택합니다.
2. `SJeongHyeon/ai-agent-portfolio` 저장소를 선택합니다.
3. Framework Preset은 `Other`를 사용합니다.
4. Build Command와 Output Directory는 비워둡니다.
5. 배포 후 로그인하지 않은 브라우저에서 공개 URL을 확인합니다.
6. 새 배포가 검증되기 전에는 기존 포트폴리오 프로젝트를 삭제하거나 도메인을 이동하지 않습니다.

## 알려진 한계

- 현재 Built 프로젝트들의 정량 평가와 실패 사례 문서가 충분하지 않습니다.
- 연락 수단은 GitHub만 제공합니다.
- Reliable Tool-Calling Agent와 Voice & Multimodal Agent는 아직 구현 또는 탐구 단계입니다.
- 프로젝트별 실행 데모 링크와 2분 시연 영상은 후속 개선 항목입니다.

## 다음 개선 순서

1. `Streamlit` README에 실행 화면과 데이터 품질 분석 추가
2. `MINI-TEST` README와 모델 평가·실패 사례 추가
3. Reliable Tool-Calling Agent의 최소 실행 루프와 평가 데이터 공개
4. STT·TTS와 텍스트 fallback을 결합한 음성 인터페이스 확장
