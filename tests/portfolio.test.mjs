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
 const featured=portfolio.projects.filter(p=>p.group==='featured'); assert.equal(featured.length,2); assert.equal(new Set(featured.map(p=>p.detailId)).size,2);
 assert.equal(typeof portfolio.renderProjectDetail,'function');
 for(const p of featured){assert.ok(portfolio.renderProjectCard(p).includes(`href="#${p.detailId}"`));assert.ok(portfolio.renderProjectDetail(p).includes(`id="${p.detailId}"`));}
});
test('status filtering excludes other statuses',()=>{assert.ok(portfolio.getProjectsByStatus('built').length>=2);assert.ok(portfolio.getProjectsByStatus('built').every(p=>p.status==='built'));assert.deepEqual(portfolio.getProjectsByStatus('not-a-status'),[]);});
