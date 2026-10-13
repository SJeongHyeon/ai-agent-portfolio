export const profile = {
  "name": "서정현",
  "role": "Junior AI Agent Developer",
  "positioning": "음성 분석 서비스의 백엔드와 비동기 작업 처리를 구현하고, 면접 코칭 에이전트의 품질과 동작을 검증했습니다.",
  "statement": "모델·프롬프트 비교부터 Langfuse 관측과 E2E 테스트까지, 만든 결과를 근거로 설명합니다.",
  "vision": "장기적으로는 실패를 설명하고 안전하게 도구를 사용하며, 음성과 멀티모달 환경에서도 사람이 통제권을 가질 수 있는 AI 에이전트를 만들고 싶습니다.",
  "githubUrl": "https://github.com/SJeongHyeon"
};

export const projects = [
  {
    "id": "malhaebom",
    "title": "말해봄 Mk.2",
    "subtitle": "답변에서 근거를 찾는 면접 코칭 에이전트",
    "status": "built",
    "statusLabel": "Built",
    "group": "featured",
    "number": "01",
    "detailId": "malhaebom-detail",
    "repositoryVisibility": "private",
    "summary": "지원 공고와 프로젝트 경험을 연결하고, 한국어 면접 답변에 근거한 피드백과 재연습을 돕는 팀 프로젝트입니다.",
    "role": "LLM 평가 · 관측 검증 · E2E 테스트",
    "focus": [
      "LLM Evaluation",
      "Langfuse",
      "E2E",
      "React"
    ],
    "flow": [
      "면접 답변",
      "분석 · 코칭",
      "재답변 비교"
    ],
    "evidence": [
      "사람 평가 기준과 재검증 기록",
      "프롬프트 비교·Langfuse 검증 기록",
      "로그인·공고 분석·코칭 E2E 테스트"
    ],
    "contributions": [
      "사람 평가 기준을 수립하고 평가 결과를 재검증했습니다.",
      "모델을 탐색하고 프롬프트 버전별 성능·비용·응답 시간을 비교했습니다.",
      "Langfuse에서 트레이스·입출력, 토큰 사용량·비용·지연 시간을 확인하고 오류를 추적했습니다.",
      "로그인 → 공고 분석 → 면접 코칭 E2E 테스트와 pytest CI 작업을 수행했습니다.",
      "코칭 시작 화면과 테마를 개선했습니다.",
      "프로젝트 발표용 PPT를 제작했습니다."
    ],
    "problem": "면접 답변에 대한 피드백이 실제 답변의 근거를 반영하는지, 서비스 흐름 전체에서 일관되게 제공되는지 확인해야 했습니다.",
    "approach": "팀은 음성 분석과 LLM 코칭을 연결했습니다. 저는 평가 기준과 비교 실험, 관측 기록, 사용자 흐름 테스트를 통해 코칭 품질과 동작을 확인했습니다.",
    "limitation": "평가 결과는 프롬프트 버전과 실행 조건에 따라 달라집니다. 과거 평가나 개별 API 성공을 현재 서비스 전체 품질의 보장으로 표현하지 않습니다.",
    "next": "동일 조건의 반복 평가와 사용자 피드백을 연결해, 버전 변경에 따른 품질 차이를 더 명확하게 확인하고 싶습니다.",
    "showcaseUrl": "https://nanocode00.github.io/malhaebom-showcase/",
    "showcaseLabel": "팀 프로젝트 소개",
    "demoUrl": "https://malhaebom.xyz/",
    "demoLabel": "서비스 방문",
    "evidenceNote": "공개 소개 페이지와 아래 개인 기여 요약을 제공합니다. 코드 저장소는 비공개입니다."
  },
  {
    "id": "voiceguard",
    "title": "보이스가드",
    "subtitle": "통화 속 위험 징후를 확인하는 음성 분석 서비스",
    "status": "built",
    "statusLabel": "Built",
    "group": "featured",
    "number": "02",
    "detailId": "voiceguard-detail",
    "repositoryVisibility": "public",
    "summary": "통화 녹음파일을 전사·분류하고, 보이스피싱 의심 구간과 대응 안내를 제공하는 팀 프로젝트입니다.",
    "role": "FastAPI 백엔드 · 비동기 작업 · 배포",
    "focus": [
      "Python",
      "FastAPI",
      "Async Jobs",
      "Railway"
    ],
    "flow": [
      "통화 녹음",
      "비동기 분석",
      "위험 구간 확인"
    ],
    "codeUrl": "https://github.com/aihuman-7th/proj1-e",
    "codeLabel": "GitHub 코드",
    "demoUrl": "https://voice-guard-project.netlify.app/",
    "demoLabel": "서비스 방문",
    "evidence": [
      "FastAPI API와 비동기 작업 관리 코드",
      "Railway 배포 설정",
      "팀 README의 역할·실행·평가 기록"
    ],
    "contributions": [
      "FastAPI 기반 백엔드 API를 담당했습니다.",
      "음성 분석 요청 이후의 비동기 작업 관리와 상태·결과 조회 흐름을 구현했습니다.",
      "Railway 배포를 담당했습니다."
    ],
    "problem": "음성 전사와 분류에 시간이 걸리는 동안 사용자가 분석 진행 상태를 확인하고 결과를 받아볼 수 있는 백엔드가 필요했습니다.",
    "approach": "팀의 음성 분석 파이프라인을 FastAPI 서비스와 연결하고, 분석 작업의 상태와 결과를 조회하는 흐름을 구현했습니다.",
    "limitation": "모델 결과는 참고 정보입니다. 팀 평가에서 정상 통화 오탐이 확인되어 추가 개선이 필요하며, 모델 학습·분류 성능은 제 개인 개발 성과와 구분합니다.",
    "next": "분석 작업의 실패·복구 조건과 배포 환경에서의 처리 시간을 더 체계적으로 기록하고 검증하고 싶습니다.",
    "evidenceNote": "공개 저장소에서 팀 구성, 담당 역할, 실행 방법과 평가 조건을 확인할 수 있습니다."
  },
  {
    "title": "Pima Diabetes EDA Dashboard",
    "status": "built",
    "statusLabel": "Built",
    "summary": "숨은 결측치, 진단 그룹별 분포와 변수 관계를 탐색하는 Streamlit 데이터 분석 대시보드입니다.",
    "focus": [
      "Data quality",
      "EDA",
      "Streamlit"
    ],
    "evidence": [
      "공개 Python 소스 코드",
      "프로젝트 목적과 구조를 설명하는 README",
      "의료 진단용이 아닌 교육 프로젝트라는 사용 한계 명시"
    ],
    "codeUrl": "https://github.com/SJeongHyeon/Streamlit",
    "codeLabel": "GitHub에서 코드 보기",
    "demoUrl": "https://app-mnwavumy2ofm2vx4kh4aph.streamlit.app/",
    "demoLabel": "라이브데모",
    "id": "learning-0",
    "group": "learning",
    "repositoryVisibility": "public"
  },
  {
    "title": "MNIST 분류 · 자전거 수요 회귀",
    "status": "built",
    "statusLabel": "Built",
    "summary": "CNN 이미지 분류와 회귀 모델을 Streamlit 인터페이스로 실험한 딥러닝 미니 프로젝트입니다.",
    "focus": [
      "CNN",
      "Regression",
      "Model serving"
    ],
    "evidence": [
      "MNIST 분류와 자전거 회귀 공개 코드",
      "학습된 모델 파일과 실행 진입점",
      "다음 개선 대상으로 README와 실패 사례 분석을 공개"
    ],
    "codeUrl": "https://github.com/SJeongHyeon/MINI-TEST",
    "codeLabel": "GitHub에서 코드 보기",
    "demoUrl": "https://mini-test-vn5fwt5rqftsmqx5hsk4rh.streamlit.app/",
    "demoLabel": "라이브데모",
    "id": "learning-1",
    "group": "learning",
    "repositoryVisibility": "public"
  },
  {
    "title": "장르예측앱(Streamlit)",
    "status": "built",
    "statusLabel": "Built",
    "summary": "RandomForest와 멜스펙트로그램 피처를 이용해 WAV 파일의 장르를 예측하는 Streamlit 앱입니다.",
    "focus": [
      "Python Code Analysis",
      "Streamlit",
      "Audio features"
    ],
    "evidence": [
      "WAV 업로드 → 장르 예측 → 확률 결과를 한 화면에 표시",
      "멜스펙트로그램과 예측 근거를 함께 보여주는 UI",
      "GitHub 코드와 Streamlit 라이브 데모를 함께 연결"
    ],
    "codeUrl": "https://github.com/SJeongHyeon/AI-music",
    "codeLabel": "GitHub에서 코드 보기",
    "demoUrl": "https://ai-music-my6hspe8sftupha2sabjag.streamlit.app/",
    "demoLabel": "라이브데모",
    "id": "learning-2",
    "group": "learning",
    "repositoryVisibility": "public"
  },
  {
    "title": "Reliable Tool-Calling Agent",
    "status": "building",
    "statusLabel": "Building",
    "summary": "도구 호출이 실패해도 원인을 추적하고 복구할 수 있는 에이전트 실행 루프를 설계하고 있습니다.",
    "focus": [
      "Tool calling",
      "Retry",
      "Tracing"
    ],
    "evidence": [
      "구현 예정 범위를 timeout, retry, fallback으로 제한",
      "완료 주장 대신 현재 학습·설계 중인 상태를 명시"
    ],
    "id": "learning-3",
    "group": "future",
    "repositoryVisibility": "public"
  },
  {
    "title": "Voice & Multimodal Agent",
    "status": "exploring",
    "statusLabel": "Exploring",
    "summary": "STT·TTS와 텍스트 fallback을 결합해 사용자가 실패를 이해할 수 있는 음성 에이전트를 탐구합니다.",
    "focus": [
      "STT",
      "TTS",
      "Human-in-the-loop"
    ],
    "evidence": [
      "딥러닝과 Transformer 학습을 기반으로 다음 프로젝트 범위를 구체화",
      "음성 입력부터 검증·fallback까지의 실행 흐름을 학습 목표로 설정"
    ],
    "id": "learning-4",
    "group": "future",
    "repositoryVisibility": "public"
  }
];


export function getProjectsByStatus(status) {
  return projects.filter(project => project.status === status);
}

function escapeHtml(value = '') {
  return String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
}

function link(url, label) {
  if (!url || !url.startsWith('https://')) return '';
  return '<a class="text-link" href="'+escapeHtml(url)+'" target="_blank" rel="noreferrer">'+escapeHtml(label)+' <span aria-hidden="true">↗</span></a>';
}

function projectLinks(project) {
  return (project.repositoryVisibility === 'private' ? '<span class="private-note">코드 저장소 비공개</span>' : link(project.codeUrl,project.codeLabel || 'GitHub 코드'))
    + link(project.showcaseUrl,project.showcaseLabel || '프로젝트 소개')
    + link(project.demoUrl,project.demoLabel || '라이브 데모');
}

export function renderProjectCard(project) {
  const featured = project.group === 'featured';
  const diagram = featured ? '<div class="project-visual" aria-label="서비스 흐름 개요"><div class="visual-top"><span>SERVICE FLOW</span><span>'+escapeHtml(project.number)+'</span></div><div class="flow-diagram">'+(project.flow || []).map((step,i)=>'<span class="flow-step"><small>0'+(i+1)+'</small>'+escapeHtml(step)+'</span>').join('<i aria-hidden="true">→</i>')+'</div><span class="visual-caption">'+escapeHtml(project.subtitle || '')+'</span></div>' : '';
  return '<article class="project-card '+(featured?'project-card--featured':'')+'" data-status="'+escapeHtml(project.status)+'">'+diagram+
    '<div class="project-card__body"><div class="project-card__header"><span class="status">'+escapeHtml(project.statusLabel)+'</span>'+(featured?'<span class="project-kind">팀 프로젝트</span>':'')+'</div><h3>'+escapeHtml(project.title)+'</h3><p>'+escapeHtml(project.summary)+'</p>'+
    (project.role?'<p class="project-role"><span>MY ROLE</span>'+escapeHtml(project.role)+'</p>':'')+
    '<ul class="tag-list" aria-label="핵심 기술">'+project.focus.map(item=>'<li>'+escapeHtml(item)+'</li>').join('')+'</ul>'+
    '<div class="project-links">'+(project.detailId?'<a class="detail-link" href="#'+escapeHtml(project.detailId)+'">기여와 검증 살펴보기 <span aria-hidden="true">↗</span></a>':projectLinks(project))+'</div>'+
    (featured?'<div class="card-resources">'+projectLinks(project)+'</div>':'')+'</div></article>';
}

export function renderProjectDetail(project) {
  return '<article class="case-study" id="'+escapeHtml(project.detailId)+'"><div class="case-heading"><p class="eyebrow">CASE STUDY / '+escapeHtml(project.number || '')+'</p><h3>'+escapeHtml(project.title)+'</h3><p>'+escapeHtml(project.role)+'</p><a class="text-link" href="#projects">프로젝트 목록 ↑</a></div><div class="case-content">'+
    '<div class="case-intro"><div><h4>해결하려던 문제</h4><p>'+escapeHtml(project.problem)+'</p></div><div><h4>접근 방법</h4><p>'+escapeHtml(project.approach)+'</p></div></div>'+
    '<div class="contributions"><h4>내가 맡은 일</h4><ol>'+project.contributions.map(item=>'<li>'+escapeHtml(item)+'</li>').join('')+'</ol></div>'+
    '<div class="evidence-box"><h4>검증 근거</h4><ul>'+project.evidence.map(item=>'<li>'+escapeHtml(item)+'</li>').join('')+'</ul><p>'+escapeHtml(project.evidenceNote || '')+'</p><div class="project-links">'+projectLinks(project)+'</div></div>'+
    '<div class="case-intro case-limits"><div><h4>한계와 해석</h4><p>'+escapeHtml(project.limitation)+'</p></div><div><h4>다음 개선</h4><p>'+escapeHtml(project.next)+'</p></div></div></div></article>';
}
