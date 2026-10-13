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
  "말해봄에서 맡은 역할은 무엇인가요?",
  "현재 확인할 수 있는 프로젝트는 무엇인가요?",
  "Langfuse에서 무엇을 검증했나요?",
  "지금 가장 집중해서 배우는 것은 무엇인가요?",
]);

const topics = Object.freeze([
  topic({id:'presentation', keywords:['ppt','발표','슬라이드'], answer:'말해봄 Mk.2의 프로젝트 발표용 PPT를 제작했습니다. 발표는 담당하지 않았습니다.'}),
  topic({id:'observability', keywords:['langfuse','트레이스','관측','토큰'], answer:'말해봄 Mk.2에서 Langfuse의 트레이스와 입출력, 토큰 사용량·비용·지연 시간을 확인하고 오류를 추적했습니다. 프롬프트 버전별 비교 실험과 구분되는 관측 검증 작업입니다.'}),
  topic({id:'malhaebom', keywords:['말해봄','면접','프롬프트','사람 평가'], answer:'말해봄 Mk.2에서 사람 평가 기준 수립·재검증, 모델 탐색과 프롬프트 버전별 성능·비용·응답 시간 비교를 수행했습니다. Langfuse 검증, 로그인·공고 분석·면접 코칭 E2E 테스트, pytest CI, 코칭 시작 화면·테마 개선과 PPT 제작도 담당했습니다. 코드 저장소는 비공개이며 공개 소개 페이지를 확인할 수 있습니다.', links:[{label:'말해봄 팀 프로젝트 소개',url:'https://nanocode00.github.io/malhaebom-showcase/'}]}),
  topic({id:'voiceguard', keywords:['보이스가드','보이스피싱','fastapi','railway'], answer:'보이스가드는 통화 녹음을 전사·분류하는 음성 분석 팀 프로젝트입니다. 저는 FastAPI 백엔드 API, 비동기 분석 작업 관리와 Railway 배포를 담당했습니다. 팀의 분류 모델 학습과 성능은 개인 기여와 구분합니다.',links:[{label:'보이스가드 GitHub',url:'https://github.com/aihuman-7th/proj1-e'}]}),
  topic({
    id: "projects",
    keywords: ["프로젝트", "만든 것", "코드", "깃허브", "github"],
    answer:
      "대표 프로젝트는 말해봄 Mk.2와 보이스가드입니다. 말해봄에서는 LLM 평가와 관측·E2E 검증을, 보이스가드에서는 FastAPI 백엔드와 비동기 작업 관리·배포를 맡았습니다. 말해봄 코드는 비공개입니다. 기존 EDA·딥러닝·음악 장르 예측 실습도 학습 프로젝트로 소개합니다.",
    links: [
      {
        label: "말해봄 팀 프로젝트 소개",
        url: "https://nanocode00.github.io/malhaebom-showcase/",
      },
      {
        label: "보이스가드 GitHub",
        url: "https://github.com/aihuman-7th/proj1-e",
      },
    ],
  }),
  topic({
    id: "failure",
    keywords: ["실패", "한계", "부족", "개선"],
    answer:
      "실패를 감추기보다 어떤 조건에서 기대와 달랐는지 기록하고 다음 검증 항목으로 바꾸는 것을 중요하게 생각합니다. 평가 버전과 실행 조건을 구분하며, 개별 성공 사례를 전체 서비스 품질로 일반화하지 않습니다. 보이스가드의 정상 통화 오탐과 말해봄의 버전별 평가 범위를 한계로 함께 설명합니다.",
  }),
  topic({
    id: "learning",
    keywords: ["학습", "공부", "기술", "집중", "배우"],
    answer:
      "두 팀 프로젝트에서 얻은 백엔드·LLM 평가·관측 경험을 바탕으로 신뢰할 수 있는 Agent loop와 음성·멀티모달 인터페이스를 계속 학습하고 있습니다.",
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
