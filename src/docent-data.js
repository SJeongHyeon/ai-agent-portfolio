const freezeLinks = (links = []) =>
  Object.freeze(links.map((link) => Object.freeze({ ...link })));

const topic = ({ id, keywords, answer, links = [] }) =>
  Object.freeze({
    id,
    keywords: Object.freeze([...keywords]),
    answer,
    links: freezeLinks(links),
  });

const suggestedQuestions = Object.freeze([
  "어떤 개발자가 되고 싶나요?",
  "현재 확인할 수 있는 프로젝트는 무엇인가요?",
  "실패를 어떻게 다루나요?",
  "지금 가장 집중해서 배우는 것은 무엇인가요?",
]);

const topics = Object.freeze([
  topic({
    id: "projects",
    keywords: ["프로젝트", "만든 것", "코드", "깃허브", "github"],
    answer:
      "현재 공개 코드로 확인할 수 있는 작업은 Pima 당뇨병 데이터 EDA 대시보드와 MNIST 분류·자전거 수요 회귀 프로젝트입니다. 완성된 작업은 Built, 구현 중인 내용은 Building, 학습 계획은 Exploring으로 구분해 소개합니다.",
    links: [
      {
        label: "Pima Diabetes EDA Dashboard",
        url: "https://github.com/SJeongHyeon/Streamlit",
      },
      {
        label: "MNIST 분류 · 자전거 수요 회귀",
        url: "https://github.com/SJeongHyeon/MINI-TEST",
      },
    ],
  }),
  topic({
    id: "failure",
    keywords: ["실패", "한계", "부족", "개선"],
    answer:
      "실패를 감추기보다 어떤 조건에서 기대와 달랐는지 기록하고 다음 검증 항목으로 바꾸는 것을 중요하게 생각합니다. 현재 프로젝트에는 정량 평가와 실패 사례 문서가 충분하지 않으며, README·평가 데이터·실행 데모를 보강하는 것이 우선 개선 과제입니다.",
  }),
  topic({
    id: "learning",
    keywords: ["학습", "공부", "기술", "집중", "배우"],
    answer:
      "현재는 도구 호출이 실패해도 원인을 추적하고 복구할 수 있는 Agent loop를 중심으로 tool schema, timeout, retry, fallback과 tracing을 배우고 있습니다. 이후 STT·TTS와 텍스트 fallback을 연결한 음성 인터페이스로 확장할 계획입니다.",
  }),
  topic({
    id: "vision",
    keywords: ["목표", "비전", "미래", "되고 싶"],
    answer:
      "장기적으로는 실패 이유를 설명하고 도구를 안전하게 사용하며, 음성과 멀티모달 환경에서도 사람이 통제권을 가질 수 있는 AI 에이전트를 만들고 싶습니다. 지금은 그 목표를 작은 구현과 검증 기록으로 나누어 쌓고 있습니다.",
  }),
  topic({
    id: "philosophy",
    keywords: ["철학", "개발자", "가치관", "신뢰"],
    answer:
      "배우기 위해 만들고, 신뢰를 얻기 위해 검증하는 개발자를 지향합니다. 완벽한 결과를 주장하기보다 왜 이 방법을 선택했는지, 무엇으로 확인했는지, 어디가 부족한지를 코드와 문서로 설명하려고 합니다.",
  }),
]);

export const docentContent = Object.freeze({
  initialMessage:
    "안녕하세요. 서정현의 학습 과정과 프로젝트를 안내하는 AI 도슨트입니다. 현재 공개된 포트폴리오 정보를 바탕으로 답변해 드립니다.",
  disclosure:
    "실제 생성형 AI가 아닌 포트폴리오 안내 도슨트이며, 사전에 검증된 답변만 제공합니다.",
  fallback:
    "아직 그 질문에 맞는 안내가 준비되지 않았습니다. 프로젝트, 실패 경험, 현재 학습, 개발 철학 또는 미래 목표에 대해 질문해 주세요.",
  suggestedQuestions,
  topics,
});
