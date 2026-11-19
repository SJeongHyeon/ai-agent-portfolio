export const profile = {
  "name": "서정현",
  "role": "AI Agent Developer",
  "positioning": "에이전트 흐름과 서비스 백엔드를 구현해 왔습니다. 평가 지표와 관측 기록으로 동작을 확인하고, 실패·회귀의 원인을 추적해 개선 여부를 판단합니다.",
  "statement": "결과의 측정 조건과 한계를 함께 밝힙니다.",
  "vision": "장기적으로는 실패를 설명하고 안전하게 도구를 사용하며, 음성과 멀티모달 환경에서도 사람이 통제권을 가질 수 있는 AI 에이전트를 만들고 싶습니다.",
  "githubUrl": "https://github.com/SJeongHyeon"
};

export const projects = [
  {
    "id": "creditpulse",
    "title": "CreditPulse",
    "subtitle": "공시 근거를 확인하고 사람이 승인하는 기업여신 심사 에이전트",
    "status": "built",
    "statusLabel": "Built",
    "group": "featured",
    "number": "01",
    "detailId": "creditpulse-detail",
    "repositoryVisibility": "public",
    "summary": "기업여신 심사역이 FY2025 사업보고서에서 근거를 찾고, 판정 초안을 확인·승인한 뒤 심사 메모로 저장하는 팀 프로젝트입니다.",
    "role": "LangGraph 초기 라우팅·단일 에이전트 · 승인 재개 · 평가·인용 검증",
    "focus": ["LangGraph", "RAG", "FastAPI", "Evaluation"],
    "flow": ["회사·항목 질문", "공시 검색·초안", "근거 확인·승인"],
    "visualCaption": "설명용 도식 · 시연 영상은 키 없는 데모 모드 녹화",
    "cardResult": "팀 평가 · 동결 v2 관련 25문항 1회(2026-11-12): 정답 근거 인용 23/25",
    "cardCaveat": "같은 평가셋으로 구성 선택 · 독립 질문 미검증",
    "resultUrl": "https://github.com/SJeongHyeon/credit-pulse/blob/main/evals/results/graph50/w145_new_r3_multi_d3-55_v9_v2.summary.json",
    "evidence": [
      "동결 평가셋 v2 50문항 중 관련 25문항: 정답 근거 인용 23/25, 오답 근거 0/25(2026-11-12, 1회)",
      "비관련 25문항: 올바른 거절 24/25, 환각 위험 0/25(같은 실행)",
      "그래프 검색을 켠 일상어 23문항 1회에서 목차 어휘 번역의 Hit@10은 20/23 → 22/23이었지만 검색 p50 1.73 → 4.00초로 지연 기준을 넘어 미채택(동결 v2 미측정)"
    ],
    "contributions": [
      "초기 그래프 라우팅과 단일 에이전트, 사람 승인 후 재개를 구현하고 팀의 Supervisor·검색·작성 흐름에 기여했습니다.",
      "평가 질문과 응답 지표 계산기를 만들고, 인용 ID·문장·금액이 근거 청크와 일치하는지 검사했습니다.",
      "심사 API와 로그인·가입·승인 화면을 연결하고, 거절 시 참고 뉴스를 선별하는 기능을 기본 꺼짐으로 구현·측정했습니다.",
      "문서 구조 그래프 검색은 동결 v2 회귀와 지연 증가로, 목차 어휘 번역은 일상어 실험의 지연 한도 초과로 기본 꺼짐으로 두었습니다. 목차 어휘 번역의 동결 v2는 측정하지 않았습니다."
    ],
    "problem": "사업보고서의 여러 장과 주석에서 회사·연도·금액 단위가 맞는 근거를 찾아야 하고, 초안을 그대로 저장하면 잘못된 판정이 심사 메모에 남을 수 있습니다.",
    "approach": "팀은 공시 검색, 근거 채점, 초안 작성, 인용 검증을 연결했습니다. 저는 에이전트 흐름과 평가 지표, 심사 화면을 맡고 사람 승인 전에는 메모를 확정하지 않도록 했습니다.",
    "limitation": "23/25는 팀이 만든 동결 평가셋의 관련 25문항을 한 번 실행한 결과입니다. 같은 평가셋으로 구성을 골랐고 독립 질문 집합의 일반화 성능은 측정하지 않았습니다. 그래프 검색·목차 어휘 번역은 기본 경로에 적용하지 않았습니다.",
    "next": "다음 검증 과제는 독립 질문과 실제 심사역 검토로 인용·판정 품질을 확인하고, 외부 임베딩·리랭커 호출 시간을 분리해 지연 원인을 측정하는 것입니다.",
    "codeUrl": "https://github.com/SJeongHyeon/credit-pulse",
    "codeLabel": "공개 코드와 평가 기록",
    "contributionUrl": "https://github.com/SJeongHyeon/credit-pulse/blob/main/CONTRIBUTIONS.md",
    "showcaseUrl": "https://github.com/SJeongHyeon/credit-pulse/blob/main/docs/case-studies/term-bridge-rejected.md",
    "showcaseLabel": "미채택 실험 사례",
    "demoUrl": "https://github.com/SJeongHyeon/credit-pulse/blob/main/docs/demo/creditpulse_demo.mp4",
    "demoLabel": "시연 영상",
    "evidenceNote": "수치는 팀 실행 결과이며 개인 기여는 공개 사본의 CONTRIBUTIONS.md에 구분했습니다. 영상은 키 없는 데모 모드 녹화입니다."
  },
  {
    "id": "malhaebom",
    "title": "말해봄 Mk.2",
    "subtitle": "답변에서 근거를 찾는 면접 코칭 에이전트",
    "status": "built",
    "statusLabel": "Built",
    "group": "featured",
    "number": "02",
    "detailId": "malhaebom-detail",
    "repositoryVisibility": "public",
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
    "cardResult": "팀 자동 평가 · 당시 배포 구성(2026-10-06): 종합 57/90 통과",
    "cardCaveat": "합성 입력 30건×3회 · 출력 계약 90/90 · 현재 운영 품질 미측정",
    "resultUrl": "https://github.com/SJeongHyeon/malhaebom-mk2/blob/main/EVAL_REPORT.md",
    "evidence": [
      "당시 배포 구성(Prompt v4·Skill v6), 합성 입력 30건×3회: 출력 계약 90/90, 종합 자동 통과 57/90(2026-10-06)",
      "출력 계약은 JSON 형식 적합성이고, 종합 자동 통과는 출력 계약·판정·근거·질문·행동 대상 검사를 모두 충족한 경우입니다.",
      "프롬프트 비교·Langfuse 검증 기록과 로그인·공고 분석·코칭 E2E 테스트"
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
    "codeUrl": "https://github.com/SJeongHyeon/malhaebom-mk2",
    "codeLabel": "공개 코드·평가 기록",
    "contributionUrl": "https://github.com/SJeongHyeon/malhaebom-mk2/blob/main/CONTRIBUTIONS.md",
    "showcaseUrl": "https://nanocode00.github.io/malhaebom-showcase/",
    "showcaseLabel": "팀 프로젝트 소개",
    "demoUrl": "https://malhaebom.xyz/",
    "demoLabel": "서비스 방문",
    "evidenceNote": "위 수치는 팀의 당시 구성 자동 평가이며 현재 운영 구성의 사람 품질 점수나 실제 사용자 전체 흐름의 성공률이 아닙니다. 개인 기여는 공개용 사본의 CONTRIBUTIONS.md에서 구분했습니다."
  },
  {
    "id": "voiceguard",
    "title": "보이스가드",
    "subtitle": "통화 속 위험 징후를 확인하는 음성 분석 서비스",
    "status": "built",
    "statusLabel": "Built",
    "group": "featured",
    "number": "03",
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
    "codeUrl": "https://github.com/SJeongHyeon/voiceguard",
    "codeLabel": "GitHub 코드",
    "contributionUrl": "https://github.com/SJeongHyeon/voiceguard/blob/main/CONTRIBUTIONS.md",
    "showcaseUrl": "https://github.com/SJeongHyeon/voiceguard/blob/main/docs/specs/pytorch-classifier-runtime.md",
    "showcaseLabel": "분류기 되돌림 기록",
    "demoUrl": "https://github.com/SJeongHyeon/voiceguard/blob/main/docs/demo/voiceguard_demo.mp4",
    "demoLabel": "시연 영상",
    "evidence": [
      "FastAPI 상태·취소 API, 취소 가능한 작업 등록과 임시 분석 데이터 정리 코드",
      "6단계 진행 상태와 분석 파이프라인 E2E 시험",
      "ONNX INT8 점수 포화 관찰 후 PyTorch 경로로 되돌린 기록(개인 기여 문서)",
      "Railway 배포 설정과 팀 README의 역할·평가 기록"
    ],
    "contributions": [
      "FastAPI 기반 백엔드 API를 담당했습니다.",
      "음성 분석 요청 이후의 비동기 작업 관리, 상태·결과·취소 API와 임시 분석 데이터 정리를 구현했습니다.",
      "6단계 진행 상태를 연결하고 분석 파이프라인 E2E 시험을 작성했습니다.",
      "ONNX INT8 분류기를 도입했다가 위험 점수가 0.99 이상으로 포화되는 현상을 확인하고 PyTorch로 되돌렸습니다.",
      "Railway 배포를 담당했고, 현재 백엔드가 내려간 상태를 공개 사본에 기록했습니다."
    ],
    "problem": "음성 전사와 분류에 시간이 걸리는 동안 사용자가 분석 진행 상태를 확인하고 결과를 받아볼 수 있는 백엔드가 필요했습니다.",
    "approach": "팀의 음성 분석 파이프라인을 FastAPI 서비스와 연결하고, 분석 작업의 상태와 결과를 조회하는 흐름을 구현했습니다.",
    "limitation": "모델 결과는 참고 정보입니다. 팀 평가에서 정상 통화 오탐이 확인되어 추가 개선이 필요하며, 모델 학습·분류 성능은 제 개인 개발 성과와 구분합니다.",
    "next": "분석 작업의 실패·복구 조건과 배포 환경에서의 처리 시간을 더 체계적으로 기록하고 검증하고 싶습니다.",
    "evidenceNote": "개인 구현·되돌림 기록은 공개용 사본의 CONTRIBUTIONS.md, 분류 평가 조건은 README에서 확인할 수 있습니다. 현재 운영 백엔드는 내려가 있어 시연 영상으로 동작을 확인할 수 있습니다."
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
  const diagram = featured ? '<div class="project-visual" aria-label="서비스 흐름 개요"><div class="visual-top"><span>SERVICE FLOW</span><span>'+escapeHtml(project.number)+'</span></div><div class="flow-diagram">'+(project.flow || []).map((step,i)=>'<span class="flow-step"><small>0'+(i+1)+'</small>'+escapeHtml(step)+'</span>').join('<i aria-hidden="true">→</i>')+'</div><span class="visual-caption">'+escapeHtml(project.visualCaption || project.subtitle || '')+'</span></div>' : '';
  return '<article class="project-card '+(featured?'project-card--featured':'')+'" data-status="'+escapeHtml(project.status)+'">'+diagram+
    '<div class="project-card__body"><div class="project-card__header"><span class="status">'+escapeHtml(project.statusLabel)+'</span>'+(featured?'<span class="project-kind">팀 프로젝트</span>':'')+'</div><h3>'+escapeHtml(project.title)+'</h3><p>'+escapeHtml(project.summary)+'</p>'+
    (project.role?'<p class="project-role"><span>MY ROLE</span>'+escapeHtml(project.role)+'</p>':'')+
    (project.cardResult?'<div class="card-result"><strong>'+escapeHtml(project.cardResult)+'</strong><p>'+escapeHtml(project.cardCaveat || '')+'</p>'+link(project.resultUrl,'평가 원문 보기')+'</div>':'')+
    '<ul class="tag-list" aria-label="핵심 기술">'+project.focus.map(item=>'<li>'+escapeHtml(item)+'</li>').join('')+'</ul>'+
    '<div class="project-links">'+(project.detailId?'<a class="detail-link" href="#'+escapeHtml(project.detailId)+'">'+escapeHtml(project.title)+' 기여·검증 보기 <span aria-hidden="true">↗</span></a>':projectLinks(project))+'</div>'+
    (featured?'<div class="card-resources">'+projectLinks(project)+'</div>':'')+'</div></article>';
}

export function renderProjectDetail(project) {
  return '<article class="case-study" id="'+escapeHtml(project.detailId)+'"><div class="case-heading"><p class="eyebrow">CASE STUDY / '+escapeHtml(project.number || '')+'</p><h3>'+escapeHtml(project.title)+'</h3><p>'+escapeHtml(project.role)+'</p><a class="text-link" href="#projects">프로젝트 목록 ↑</a></div><div class="case-content">'+
    '<div class="case-intro"><div><h4>해결하려던 문제</h4><p>'+escapeHtml(project.problem)+'</p></div><div><h4>접근 방법</h4><p>'+escapeHtml(project.approach)+'</p></div></div>'+
    '<div class="contributions"><h4>내가 맡은 일</h4><ol>'+project.contributions.map(item=>'<li>'+escapeHtml(item)+'</li>').join('')+'</ol></div>'+
    '<div class="evidence-box"><h4>검증 근거</h4><ul>'+project.evidence.map(item=>'<li>'+escapeHtml(item)+'</li>').join('')+'</ul><p>'+escapeHtml(project.evidenceNote || '')+'</p><div class="project-links">'+link(project.resultUrl,'평가 원문 보기')+link(project.contributionUrl,'개인 기여 원문')+projectLinks(project)+'</div></div>'+
    '<div class="case-intro case-limits"><div><h4>한계와 해석</h4><p>'+escapeHtml(project.limitation)+'</p></div><div><h4>다음 개선</h4><p>'+escapeHtml(project.next)+'</p></div></div></div></article>';
}
