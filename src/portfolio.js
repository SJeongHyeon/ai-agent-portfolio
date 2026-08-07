export const profile = {
  name: "서정현",
  role: "Junior AI Agent Developer",
  positioning:
    "AI 에이전트 개발을 배우며 작은 모델 실습부터 도구 호출과 멀티모달 인터페이스까지 직접 구현하고 있습니다.",
  statement:
    "완벽한 결과보다 왜 이 방법을 선택했고, 어디서 실패했으며, 다음에는 무엇을 개선할지를 기록합니다.",
  vision:
    "장기적으로는 실패를 설명하고 안전하게 도구를 사용하며, 음성과 멀티모달 환경에서도 사람이 통제권을 가질 수 있는 AI 에이전트를 만들고 싶습니다.",
  githubUrl: "https://github.com/SJeongHyeon",
};

export const projects = [
  {
    title: "Pima Diabetes EDA Dashboard",
    status: "built",
    statusLabel: "Built",
    summary:
      "숨은 결측치, 진단 그룹별 분포와 변수 관계를 탐색하는 Streamlit 데이터 분석 대시보드입니다.",
    focus: ["Data quality", "EDA", "Streamlit"],
    evidence: [
      "공개 Python 소스 코드",
      "프로젝트 목적과 구조를 설명하는 README",
      "의료 진단용이 아닌 교육 프로젝트라는 사용 한계 명시",
    ],
    url: "https://github.com/SJeongHyeon/Streamlit",
    linkLabel: "GitHub에서 코드 보기",
  },
  {
    title: "MNIST 분류 · 자전거 수요 회귀",
    status: "built",
    statusLabel: "Built",
    summary:
      "CNN 이미지 분류와 회귀 모델을 Streamlit 인터페이스로 실험한 딥러닝 미니 프로젝트입니다.",
    focus: ["CNN", "Regression", "Model serving"],
    evidence: [
      "MNIST 분류와 자전거 회귀 공개 코드",
      "학습된 모델 파일과 실행 진입점",
      "다음 개선 대상으로 README와 실패 사례 분석을 공개",
    ],
    url: "https://github.com/SJeongHyeon/MINI-TEST",
    linkLabel: "GitHub에서 코드 보기",
  },
  {
    title: "장르예측앱(Streamlit)",
    status: "built",
    statusLabel: "Built",
    summary:
      "RandomForest와 멜스펙트로그램 피처를 이용해 WAV 파일의 장르를 예측하는 Streamlit 앱입니다.",
    focus: ["Python Code Analysis", "Streamlit", "Audio features"],
    evidence: [
      "WAV 업로드 → 장르 예측 → 확률 결과를 한 화면에 표시",
      "멜스펙트로그램과 예측 근거를 함께 보여주는 UI",
      "GitHub 코드와 Streamlit 라이브 데모를 함께 연결",
    ],
    url: "https://ai-music-my6hspe8sftupha2sabjag.streamlit.app/",
    linkLabel: "Streamlit 보기",
    codeUrl: "https://github.com/SJeongHyeon/AI-music",
    codeLabel: "GitHub에서 코드 보기",
  },
  {
    title: "Reliable Tool-Calling Agent",
    status: "building",
    statusLabel: "Building",
    summary:
      "도구 호출이 실패해도 원인을 추적하고 복구할 수 있는 에이전트 실행 루프를 설계하고 있습니다.",
    focus: ["Tool calling", "Retry", "Tracing"],
    evidence: [
      "구현 예정 범위를 timeout, retry, fallback으로 제한",
      "완료 주장 대신 현재 학습·설계 중인 상태를 명시",
    ],
  },
  {
    title: "Voice & Multimodal Agent",
    status: "exploring",
    statusLabel: "Exploring",
    summary:
      "STT·TTS와 텍스트 fallback을 결합해 사용자가 실패를 이해할 수 있는 음성 에이전트를 탐구합니다.",
    focus: ["STT", "TTS", "Human-in-the-loop"],
    evidence: [
      "딥러닝과 Transformer 학습을 기반으로 다음 프로젝트 범위를 구체화",
      "음성 입력부터 검증·fallback까지의 실행 흐름을 학습 목표로 설정",
    ],
  },
];

export function getProjectsByStatus(status) {
  return projects.filter((project) => project.status === status);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderLinkButton(url, label, className = "project-link") {
  if (!url) {
    return "";
  }

  return `<a class="${className}" href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`;
}

export function renderProjectCard(project) {
  const tags = project.focus
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
  const evidence = project.evidence
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
  const codeLink = renderLinkButton(project.codeUrl, project.codeLabel, "project-link project-link--code");
  const demoLink = renderLinkButton(project.url, project.linkLabel, "project-link project-link--demo");
  const fallbackLink = project.url
    ? ""
    : `<span class="project-link project-link--muted">진행 내용을 정리 중입니다</span>`;

  return `
    <article class="project-card" data-status="${escapeHtml(project.status)}">
      <div class="project-card__header">
        <span class="status status--${escapeHtml(project.status)}">${escapeHtml(project.statusLabel)}</span>
        <h3>${escapeHtml(project.title)}</h3>
      </div>
      <p>${escapeHtml(project.summary)}</p>
      <ul class="tag-list" aria-label="핵심 기술">${tags}</ul>
      <div class="evidence">
        <h4>검증 가능한 증거</h4>
        <ul>${evidence}</ul>
      </div>
      <div class="project-links">
        ${codeLink}
        ${demoLink || fallbackLink}
      </div>
    </article>
  `;
}



