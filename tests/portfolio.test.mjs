import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  getProjectsByStatus,
  profile,
  projects,
  renderProjectCard,
} from "../src/portfolio.js";

test("profile uses a truthful junior positioning", () => {
  assert.equal(profile.name, "서정현");
  assert.match(profile.role, /Junior AI Agent Developer/);
  assert.match(profile.positioning, /AI 에이전트 개발을 배우며/);
  assert.doesNotMatch(
    `${profile.role} ${profile.positioning}`,
    /expert|production-ready|전문가/i,
  );
});

test("profile describes an honest growth story and multimodal vision", () => {
  assert.match(profile.positioning, /AI 에이전트 개발을 배우며/);
  assert.match(profile.statement, /왜 이 방법을 선택했고/);
  assert.match(profile.vision, /사람이 통제권/);
});

test("projects distinguish built, building, and exploring work", () => {
  assert.ok(getProjectsByStatus("built").length >= 2);
  assert.ok(getProjectsByStatus("building").length >= 1);
  assert.ok(getProjectsByStatus("exploring").length >= 1);
  assert.equal(
    getProjectsByStatus("built").every((project) => project.evidence.length > 0),
    true,
  );
});

test("project cards expose status, evidence, and safe links", () => {
  const card = renderProjectCard(projects[0]);

  assert.match(card, /data-status="built"/);
  assert.match(card, /검증 가능한 증거/);
  assert.match(card, /target="_blank"/);
  assert.match(card, /rel="noreferrer"/);
});

test("page provides recruiter-focused navigation and sections", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

  for (const id of ["evidence", "projects", "growth", "contact"]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }

  assert.match(html, /프로젝트/);
  assert.match(html, /Built · Building · Exploring/);
});

test("page uses the approved growth narrative", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

  for (const message of [
    "배우기 위해 만들고",
    "신뢰를 얻기 위해 검증합니다",
    "배움을 결과물로 바꾸는 과정",
    "프로젝트",
    "AI 에이전트 개발자로 가는 여정",
    "계속 검증하며 성장하는 개발자",
  ]) {
    assert.match(html, new RegExp(message));
  }
});

test("README documents evidence, local verification, and deployment", async () => {
  const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");

  for (const heading of [
    "포트폴리오 목표",
    "검증 가능한 증거",
    "로컬 실행",
    "Vercel 배포",
    "알려진 한계",
  ]) {
    assert.match(readme, new RegExp(heading));
  }

  assert.match(
    readme,
    /https:\/\/ai-agent-portfolio-theta\.vercel\.app/,
  );
});

test("README documents the docent privacy and deployment boundary", async () => {
  const readme = await readFile(
    new URL("../README.md", import.meta.url),
    "utf8",
  );

  assert.match(readme, /키워드 기반 AI 도슨트/);
  assert.match(readme, /외부 AI API를 사용하지 않습니다/);
  assert.match(readme, /대화 내용을 저장하거나 전송하지 않습니다/);
  assert.match(readme, /reliable-ai-engineer-portfolio/);
});


