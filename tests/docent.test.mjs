import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { docentContent } from "../src/docent-data.js";
import {
  normalizeQuestion,
  selectDocentResponse,
  validateQuestion,
} from "../src/docent.js";

test("normalizes surrounding and repeated whitespace", () => {
  assert.equal(
    normalizeQuestion("  GitHub   프로젝트가 궁금해요  "),
    "github 프로젝트가 궁금해요",
  );
});

test("routes every suggested question to a prepared answer", () => {
  for (const question of docentContent.suggestedQuestions) {
    const result = selectDocentResponse(question);

    assert.equal(result.fallback, false);
    assert.ok(result.answer.length > 20);
  }
});

test("routes representative questions to the intended topic", () => {
  const cases = [
    ["깃허브 프로젝트를 보여주세요", "projects"],
    ["부족한 점과 개선 방향이 궁금해요", "failure"],
    ["지금 집중해서 공부하는 기술은 무엇인가요?", "learning"],
    ["장기적인 미래 비전은 무엇인가요?", "vision"],
    ["어떤 철학을 가진 개발자인가요?", "philosophy"],
  ];

  for (const [question, expectedTopic] of cases) {
    assert.equal(selectDocentResponse(question).topic, expectedTopic);
  }
});

test("uses deterministic priority when several topics match", () => {
  assert.equal(
    selectDocentResponse("프로젝트 실패가 궁금해요").topic,
    "projects",
  );
});

test("returns fallback for an unknown question", () => {
  const result = selectDocentResponse("점심 메뉴는 무엇인가요?");

  assert.equal(result.fallback, true);
  assert.equal(result.answer, docentContent.fallback);
  assert.deepEqual(result.links, []);
});

test("rejects empty and overlong questions", () => {
  assert.deepEqual(validateQuestion("   "), {
    valid: false,
    normalized: "",
    reason: "empty",
  });
  assert.equal(validateQuestion("가".repeat(241)).reason, "too-long");
  assert.equal(validateQuestion("현재 무엇을 배우나요?").valid, true);
});

test("page exposes the accessible docent controls", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

  for (const id of [
    "docent-launcher",
    "docent-panel",
    "docent-messages",
    "docent-form",
    "docent-input",
    "docent-reset",
  ]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }

  assert.match(html, /aria-live="polite"/);
  assert.match(html, /실제 생성형 AI가 아닌/);
});

test("prepared answers and links contain no executable markup", () => {
  const result = selectDocentResponse(
    "<img src=x onerror=alert(1)> 프로젝트를 보여주세요",
  );

  assert.equal(result.topic, "projects");
  assert.doesNotMatch(result.answer, /<script|onerror=/i);
  assert.equal(
    result.links.every(({ url }) =>
      url.startsWith("https://github.com/SJeongHyeon/"),
    ),
    true,
  );
});
