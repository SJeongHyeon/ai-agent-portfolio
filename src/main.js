import { initDocent } from './docent.js';
import { profile, projects, renderProjectCard, renderProjectDetail } from './portfolio.js';

for (const [id, value] of [['profile-positioning',profile.positioning],['profile-statement',profile.statement],['profile-vision',profile.vision],['current-year',new Date().getFullYear()]]) {
  const element=document.getElementById(id);
  if(element) element.textContent=value;
}
for(const [id, group] of [['featured-project-grid','featured'],['learning-project-grid','learning']]) {
  const element=document.getElementById(id);
  if(element) element.innerHTML=projects.filter(p=>p.group===group).map(renderProjectCard).join('');
}
const details=document.getElementById('project-details');
if(details) details.innerHTML=projects.filter(p=>p.group==='featured').map(renderProjectDetail).join('');
try { initDocent(document); } catch(error) { console.error('Portfolio guide initialization failed.',error); }
