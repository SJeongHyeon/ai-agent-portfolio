import assert from 'node:assert/strict';
import test from 'node:test';
import * as portfolio from '../src/portfolio.js';
const fixture = {id:'sample', title:'Sample', status:'built', statusLabel:'Built', group:'featured', summary:'Summary', role:'Backend', focus:['API'], evidence:['Report'], contributions:['Built API'], detailId:'sample-detail', repositoryVisibility:'public', codeUrl:'https://github.com/example/repo', problem:'Problem', approach:'Approach', limitation:'Limit', next:'Next'};
test('private projects suppress code links even when a code URL is present', () => {
 const html = portfolio.renderProjectCard({...fixture, repositoryVisibility:'private'});
 assert.match(html,/비공개/); assert.doesNotMatch(html,/href="https:\/\/github.com\/example\/repo"/); assert.match(html,/href="#sample-detail"/);
});
test('cards expose personal role and a detail target', () => {
 const html = portfolio.renderProjectCard(fixture); assert.match(html,/Backend/); assert.match(html,/href="#sample-detail"/); assert.match(html,/rel="noreferrer"/);
});
test('renderers escape text and attributes', () => {
 const hostile = {...fixture,title:'<script>alert(1)</script>',role:'<img src=x onerror=alert(1)>',detailId:'x" onclick="evil',contributions:['<script>evil</script>']};
 const card=portfolio.renderProjectCard(hostile); assert.doesNotMatch(card,/<script>|<img/); assert.match(card,/&lt;script&gt;/);
 assert.equal(typeof portfolio.renderProjectDetail,'function'); assert.doesNotMatch(portfolio.renderProjectDetail(hostile),/<script>|<img|id="x" onclick=/);
});
test('missing URLs never create empty or undefined links', () => {
 assert.doesNotMatch(portfolio.renderProjectCard({...fixture,codeUrl:undefined}),/href="(?:undefined|null|)"/);
});
test('featured cards resolve to unique detail sections', () => {
 const featured=portfolio.projects.filter(p=>p.group==='featured'); assert.equal(featured.length,3); assert.deepEqual(featured.map(p=>p.id),['creditpulse','malhaebom','voiceguard']); assert.equal(new Set(featured.map(p=>p.detailId)).size,3);
 assert.equal(typeof portfolio.renderProjectDetail,'function');
 for(const p of featured){assert.ok(portfolio.renderProjectCard(p).includes(`href="#${p.detailId}"`));assert.ok(portfolio.renderProjectDetail(p).includes(`id="${p.detailId}"`));}
});
test('status filtering excludes other statuses',()=>{assert.ok(portfolio.getProjectsByStatus('built').length>=2);assert.ok(portfolio.getProjectsByStatus('built').every(p=>p.status==='built'));assert.deepEqual(portfolio.getProjectsByStatus('not-a-status'),[]);});

test('CreditPulse gives verifiable project evidence and a public route', () => {
 const project = portfolio.projects.find(p=>p.id==='creditpulse');
 assert.equal(project?.group,'featured');
 assert.equal(project?.repositoryVisibility,'public');
 assert.match(project.summary,/사업보고서/);
 assert.match(project.role,/LangGraph/);
 assert.match(project.limitation,/평가셋/);
 const detail=portfolio.renderProjectDetail(project);
 assert.match(detail,/23\/25/);
 assert.match(detail,/github.com\/SJeongHyeon\/credit-pulse/);
});

test('featured evidence keeps its conditions and source together', () => {
 const credit=portfolio.projects.find(p=>p.id==='creditpulse');
 const card=portfolio.renderProjectCard(credit);
 assert.match(card,/관련 25문항 1회/);
 assert.match(card,/독립 질문 미검증/);
 assert.match(card,/w145_new_r3_multi_d3-55_v9_v2.summary.json/);
 assert.match(card,/설명용 도식/);
 for(const id of ['malhaebom','voiceguard']){
   assert.match(portfolio.renderProjectCard(portfolio.projects.find(p=>p.id===id)),/SERVICE FLOW/);
 }
});

test('other featured cases show dated evidence and personal implementation', () => {
 const malhaebom=portfolio.projects.find(p=>p.id==='malhaebom');
 const malhaebomCard=portfolio.renderProjectCard(malhaebom);
 assert.match(malhaebomCard,/품질 회귀/);
 assert.match(malhaebomCard,/22\/30 → 20\/30/);
 assert.match(malhaebomCard,/EVAL_REPORT.md/);
 assert.match(portfolio.renderProjectDetail(malhaebom),/57\/90/);
 assert.match(portfolio.renderProjectDetail(malhaebom),/교체를 보류/);
 assert.match(portfolio.renderProjectDetail(malhaebom),/현재 운영 구성의 사람 품질 점수/);
 assert.match(portfolio.renderProjectDetail(malhaebom),/EVAL_REPORT.md/);
 const voiceguard=portfolio.renderProjectDetail(portfolio.projects.find(p=>p.id==='voiceguard'));
 assert.match(voiceguard,/상태·결과·취소 API/);
 assert.match(voiceguard,/실패·취소 시 임시 분석 데이터/);
 assert.match(voiceguard,/app\/jobs\/runner.py/);
 assert.doesNotMatch(voiceguard,/ONNX|PyTorch|pytorch-classifier-runtime/);
 assert.match(voiceguard,/CONTRIBUTIONS.md/);
});

test('CreditPulse explains injection defenses and their measured limits', () => {
 const credit=portfolio.projects.find(p=>p.id==='creditpulse');
 const detail=portfolio.renderProjectDetail(credit);
 assert.match(detail,/질문·저장 규칙·응답/);
 assert.match(detail,/프롬프트 인젝션/);
 assert.match(detail,/프롬프트 인젝션 방어 3겹\(질문·규칙·응답\)을 구현해 키 없는 오프라인 시험으로 검증했습니다\. 실제 모델 레드팀 재측정\(51건\)은 팀 작업이며, 저는 그중 일부에 참여했습니다\./);
 assert.doesNotMatch(detail,/참고 뉴스를 선별/);
});

test('case studies prioritize engineering contributions over peripheral activities', () => {
 const malhaebom=portfolio.renderProjectDetail(portfolio.projects.find(p=>p.id==='malhaebom'));
 assert.doesNotMatch(malhaebom,/PPT|테마를 개선/);
 const voiceguard=portfolio.renderProjectDetail(portfolio.projects.find(p=>p.id==='voiceguard'));
 assert.doesNotMatch(voiceguard,/FastAPI 기반 백엔드 API를 담당했습니다/);
});

test('featured project links name their own destinations', () => {
 for (const project of portfolio.projects.filter(p=>p.group==='featured')) {
   const card=portfolio.renderProjectCard(project);
   assert.match(card,new RegExp(project.title.replaceAll('.', '\\.')+' 기여·검증 보기'));
 }
});

test('CreditPulse and Voiceguard link to their services as well as demo videos', () => {
 for (const id of ['creditpulse','voiceguard']) {
  const project=portfolio.projects.find(item=>item.id===id);
  assert.ok(project.serviceUrl?.startsWith('https://'));
  assert.notEqual(project.serviceUrl,project.demoUrl);
  const card=portfolio.renderProjectCard(project);
  const detail=portfolio.renderProjectDetail(project);
  for (const html of [card,detail]) {
   assert.ok(html.includes(project.serviceLabel));
   assert.ok(html.includes(`href="${project.serviceUrl}"`));
   assert.ok(html.includes(`href="${project.demoUrl}"`));
  }
 }
 const voiceguard=portfolio.projects.find(item=>item.id==='voiceguard');
 assert.equal(voiceguard.showcaseLabel,'비동기 분석 작업 코드');
});
