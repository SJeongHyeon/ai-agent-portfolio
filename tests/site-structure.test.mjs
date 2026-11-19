import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('portfolio introduces projects, then connects technologies to their case studies', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  for (const id of ['projects', 'technology', 'creditpulse-detail']) {
    assert.match(html, new RegExp(id));
  }
  assert.ok(html.indexOf('id="projects"') < html.indexOf('id="technology"'));
  assert.ok(html.indexOf('id="technology"') < html.indexOf('id="project-details"'));
  assert.match(html, /CreditPulse/);
  assert.match(html, /href="#creditpulse-detail"/);
  assert.match(html, /href="#malhaebom-detail"/);
  assert.match(html, /href="#voiceguard-detail"/);
});

test('hero leads with personal work and gives all three projects a route', async () => {
 const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
 const hero=html.slice(html.indexOf('<section class="hero"'),html.indexOf('<section class="section" id="projects"'));
 assert.match(hero,/에이전트 흐름과 서비스 백엔드를 구현해 왔습니다/);
 assert.match(hero,/실패·회귀의 원인을 추적/);
 assert.match(hero,/결과의 측정 조건과 한계를 함께 밝힙니다/);
 assert.match(hero,/>AI Agent Developer<\/p>/);
 assert.doesNotMatch(hero,/Junior AI Agent Developer/);
 assert.match(hero,/href="#projects">세 프로젝트 보기/);
 assert.match(hero,/href="#technology">기술과 근거 보기/);
 for (const id of ['creditpulse-detail','malhaebom-detail','voiceguard-detail']) {
   assert.match(hero,new RegExp('href="#'+id+'"'));
 }
 assert.doesNotMatch(hero,/hero-index-feature|FEATURED PROJECT/);
 const tech=html.slice(html.indexOf('id="technology"'),html.indexOf('id="project-details"'));
 assert.match(tech,/credit-pulse\/blob\/main\/EVAL_REPORT.md/);
 assert.match(tech,/malhaebom-mk2\/blob\/main\/EVAL_REPORT.md/);
});

test('header shows English and Korean names without the former monogram and dot', async () => {
 const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
 const header=html.slice(html.indexOf('<header class="site-header"'),html.indexOf('</header>'));
 assert.match(header,/<span class="brand-english">SEOJEONGHYEON<\/span>/);
 assert.match(header,/<span class="brand-korean">서정현<\/span>/);
 assert.doesNotMatch(header,/brand-dot|brand-name|>SJH/);
});

test('technology section names LangGraph and RAG with scoped personal evidence', async () => {
 const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
 const tech=html.slice(html.indexOf('id="technology"'),html.indexOf('id="project-details"'));
 assert.match(tech,/<h3>LangGraph 에이전트 흐름<\/h3>/);
 assert.match(tech,/초기 그래프 라우팅과 단일 에이전트, 사람 승인 후 재개/);
 assert.match(tech,/<h3>RAG 검색·검증<\/h3>/);
 assert.match(tech,/팀 하이브리드 검색을 대상으로/);
 assert.match(tech,/품질 회귀나 지연 증가/);
 assert.match(tech,/term-bridge-rejected.md/);
});

test('deployment copy separates implemented APIs from verified account isolation', async () => {
 const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
 assert.match(html,/심사 API를 구현하고 두 계정의 심사 건·규칙 분리를 확인했습니다/);
 assert.doesNotMatch(html,/심사 API·계정 분리와/);
 assert.match(html,/GitHub 프로필에서 연락처 보기/);
});

test('section headings do not end with a period', async () => {
 const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
 const headings=[...html.matchAll(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/g)].map(([,content])=>content.replace(/<[^>]*>/g,'').trim());
 assert.ok(headings.length>=5);
 for (const heading of headings) assert.doesNotMatch(heading,/\.$/,heading);
});
