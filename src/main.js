import { profile, projects, renderProjectCard } from "./portfolio.js";

const positioning = document.querySelector("#profile-positioning");
const statement = document.querySelector("#profile-statement");
const vision = document.querySelector("#profile-vision");
const projectGrid = document.querySelector("#project-grid");
const currentYear = document.querySelector("#current-year");

if (positioning) {
  positioning.textContent = profile.positioning;
}

if (statement) {
  statement.textContent = profile.statement;
}

if (vision) {
  vision.textContent = profile.vision;
}

if (projectGrid) {
  projectGrid.innerHTML = projects.map(renderProjectCard).join("");
}

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}
