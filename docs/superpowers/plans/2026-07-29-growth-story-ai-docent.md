# Growth Story and AI Docent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Revise the recruiter-facing portfolio with an honest growth narrative and add a private, keyword-based AI docent that uses only verified local answers.

**Architecture:** Keep the dependency-free static site. Put immutable docent content in `src/docent-data.js`, pure question routing and DOM initialization in `src/docent.js`, and call docent initialization independently from `src/main.js` so a docent failure cannot block portfolio rendering.

**Tech Stack:** Semantic HTML5, modern CSS, browser JavaScript modules, Node.js built-in test runner, GitHub, Vercel

## Global Constraints

- Preserve the existing `Built`, `Building`, and `Exploring` truthfulness labels.
- Do not claim expert, production-ready, scalable, or measured performance without public evidence.
- Use no external AI API, backend, analytics service, API key, storage, or production dependency.
- Keep questions in browser memory only and never transmit or persist them.
- Reject blank input and input longer than 240 characters.
- Insert user questions and answers with text-only DOM operations.
- Preserve keyboard use, visible focus, polite message announcements, and reduced-motion behavior.
- Introduce no horizontal overflow at a 390 px viewport.
- Leave `https://reliable-ai-engineer-portfolio.vercel.app/` unchanged.
- Do not publish production changes before local implementation and verification are complete.

---

### Task 1: Docent Content and Pure Routing

**Files:**
- Create: `src/docent-data.js`
- Create: `src/docent.js`
- Create: `tests/docent.test.mjs`

**Interfaces:**
- Produces: `docentContent`, an immutable object with `initialMessage`, `disclosure`, `fallback`, `suggestedQuestions`, and ordered `topics`.
- Produces: `normalizeQuestion(question: unknown): string`.
- Produces: `validateQuestion(question: unknown): { valid: boolean, normalized: string, reason: "empty" | "too-long" | null }`.
- Produces: `selectDocentResponse(question: unknown): { topic: string, answer: string, links: Array<{ label: string, url: string }>, fallback: boolean }`.

- [ ] **Step 1: Write failing routing tests**

```js
import assert from "node:assert/strict";
import test from "node:test";

import { docentContent } from "../src/docent-data.js";
import {
  normalizeQuestion,
  selectDocentResponse,
  validateQuestion,
} from "../src/docent.js";

test("normalizes Korean and English questions", () => {
  assert.equal(normalizeQuestion("  GitHub 프로젝트가 궁금해요  "), "github 프로젝트가 궁금해요");
});

test("routes every suggested question to a prepared answer", () => {
  for (const question of docentContent.suggestedQuestions) {
    const result = selectDocentResponse(question);
    assert.equal(result.fallback, false);
    assert.ok(result.answer.length > 20);
  }
});

test("uses deterministic priority when several topics match", () => {
  assert.equal(selectDocentResponse("프로젝트 실패가 궁금해요").topic, "projects");
});

test("returns fallback for an unknown question", () => {
  const result = selectDocentResponse("점심 메뉴는 무엇인가요?");
  assert.equal(result.fallback, true);
  assert.equal(result.answer, docentContent.fallback);
});

test("rejects empty and overlong questions", () => {
  assert.equal(validateQuestion("   ").reason, "empty");
  assert.equal(validateQuestion("가".repeat(241)).reason, "too-long");
  assert.equal(validateQuestion("현재 무엇을 배우나요?").valid, true);
});
```

- [ ] **Step 2: Run tests and verify the modules are missing**

Run: `node --test tests/docent.test.mjs`

Expected: FAIL because `src/docent-data.js` does not exist.

- [ ] **Step 3: Add immutable docent data**

Create ordered topics for `projects`, `failure`, `learning`, `vision`, and `philosophy`. Include only the public `Streamlit` and `MINI-TEST` links in prepared answers. Freeze nested arrays and topic objects before exporting `docentContent`.

- [ ] **Step 4: Implement normalization, validation, and selection**

```js
export const MAX_QUESTION_LENGTH = 240;

export function normalizeQuestion(question) {
  return String(question ?? "").trim().replace(/\s+/g, " ").toLowerCase();
}

export function validateQuestion(question) {
  const normalized = normalizeQuestion(question);
  if (!normalized) return { valid: false, normalized, reason: "empty" };
  if (normalized.length > MAX_QUESTION_LENGTH) {
    return { valid: false, normalized, reason: "too-long" };
  }
  return { valid: true, normalized, reason: null };
}

export function selectDocentResponse(question) {
  const validation = validateQuestion(question);
  if (!validation.valid) {
    return { topic: "fallback", answer: docentContent.fallback, links: [], fallback: true };
  }

  const topic = docentContent.topics.find((item) =>
    item.keywords.some((keyword) => validation.normalized.includes(keyword)),
  );

  return topic
    ? { topic: topic.id, answer: topic.answer, links: topic.links, fallback: false }
    : { topic: "fallback", answer: docentContent.fallback, links: [], fallback: true };
}
```

- [ ] **Step 5: Run routing tests**

Run: `node --test tests/docent.test.mjs`

Expected: all docent routing tests PASS.

- [ ] **Step 6: Commit the pure routing layer**

```bash
git add src/docent-data.js src/docent.js tests/docent.test.mjs
git commit -m "feat: add verified AI docent routing"
```

---

### Task 2: Growth Narrative Copy

**Files:**
- Modify: `index.html`
- Modify: `src/portfolio.js`
- Modify: `tests/portfolio.test.mjs`

**Interfaces:**
- Consumes: existing `profile`, `projects`, and `renderProjectCard(project)`.
- Produces: revised hero, vision, section labels, and closing copy while retaining project evidence and URLs.

- [ ] **Step 1: Add failing copy assertions**

```js
test("page uses the approved growth narrative and vision", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /배우기 위해 만들고/);
  assert.match(html, /신뢰를 얻기 위해 검증합니다/);
  assert.match(html, /배움을 결과물로 바꾸는 과정/);
  assert.match(html, /배우고, 만들고, 검증한 기록/);
  assert.match(html, /AI 에이전트 개발자로 가는 여정/);
  assert.match(html, /계속 검증하며 성장하는 개발자/);
});

test("profile includes a truthful multimodal agent vision", () => {
  assert.match(profile.positioning, /AI 에이전트 개발을 배우며/);
  assert.match(profile.statement, /왜 이 방법을 선택했고/);
  assert.match(profile.vision, /사람이 통제권/);
});
```

- [ ] **Step 2: Run tests and verify the approved copy is absent**

Run: `npm test`

Expected: FAIL in the new growth-narrative assertions.

- [ ] **Step 3: Update profile data**

Add `profile.vision` and replace the current positioning and statement with the approved introduction. Keep the role `Junior AI Agent Developer`.

- [ ] **Step 4: Update semantic page copy**

Replace the hero headline, evidence eyebrow and heading, project heading, growth heading, and closing message. Add an element with `id="profile-vision"` for the vision and preserve all existing section IDs and navigation anchors.

- [ ] **Step 5: Render the vision**

In `src/main.js`, select `#profile-vision` and set its `textContent` from `profile.vision`, using the same null-safe pattern as positioning and statement.

- [ ] **Step 6: Run the full suite**

Run: `npm test`

Expected: all portfolio and docent tests PASS.

- [ ] **Step 7: Commit the narrative revision**

```bash
git add index.html src/main.js src/portfolio.js tests/portfolio.test.mjs
git commit -m "feat: revise portfolio growth narrative"
```

---

### Task 3: Accessible Docent Interface

**Files:**
- Modify: `index.html`
- Modify: `src/docent.js`
- Modify: `src/main.js`
- Modify: `styles.css`
- Modify: `tests/docent.test.mjs`

**Interfaces:**
- Consumes: `docentContent`, `validateQuestion`, and `selectDocentResponse`.
- Produces: `initDocent(root: Document = document): { destroy(): void } | null`.
- Produces DOM hooks: `#docent-launcher`, `#docent-panel`, `#docent-messages`, `#docent-form`, `#docent-input`, `#docent-reset`, and `[data-docent-question]`.

- [ ] **Step 1: Add failing markup and safety tests**

```js
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

test("docent answers are plain text values", () => {
  const result = selectDocentResponse("<img src=x onerror=alert(1)> 프로젝트");
  assert.equal(result.topic, "projects");
  assert.doesNotMatch(result.answer, /<script|onerror=/i);
});
```

- [ ] **Step 2: Run tests and verify docent markup is absent**

Run: `npm test`

Expected: FAIL in the accessible docent controls test.

- [ ] **Step 3: Add semantic docent markup**

Add a launcher with `aria-expanded="false"` and `aria-controls="docent-panel"`. Add a hidden dialog with an accessible heading, polite message region, four suggested-question buttons, reset and close controls, a single-line input with `maxlength="240"`, and the disclosure text.

- [ ] **Step 4: Implement DOM initialization**

`initDocent` must:

- Return `null` when required controls are absent.
- Render messages with `document.createElement` and `textContent`.
- Render prepared external links with fixed `https://github.com/SJeongHyeon/` URLs, `target="_blank"`, and `rel="noreferrer"`.
- Open and close the panel while synchronizing `hidden` and `aria-expanded`.
- Restore launcher focus after close.
- Route suggested questions through the same `submitQuestion` function as typed input.
- Show an inline validation message for blank or overlong input.
- Reset to the initial message and suggested questions.
- Close on Escape.
- Return a `destroy` method that removes registered listeners.

- [ ] **Step 5: Initialize independently**

```js
try {
  initDocent(document);
} catch (error) {
  console.error("AI docent initialization failed.", error);
}
```

Place this after the existing portfolio rendering so a docent error cannot block the page.

- [ ] **Step 6: Add responsive styling**

Desktop: fixed launcher and a panel no wider than `25rem`.

Mobile (`max-width: 800px`): panel spans the viewport bottom with `max-height: min(80vh, 44rem)`, scrollable messages, and at least 44 px control heights. Add visible focus styles and disable nonessential transitions inside the existing reduced-motion media query.

- [ ] **Step 7: Run the full suite**

Run: `npm test`

Expected: all tests PASS.

- [ ] **Step 8: Commit the interface**

```bash
git add index.html src/docent.js src/main.js styles.css tests/docent.test.mjs
git commit -m "feat: add accessible portfolio AI docent"
```

---

### Task 4: Documentation and Local Release Verification

**Files:**
- Modify: `README.md`
- Modify: `tests/portfolio.test.mjs`
- Verify: `index.html`
- Verify: `styles.css`
- Verify: `src/main.js`
- Verify: `src/docent.js`

**Interfaces:**
- Produces: documented docent behavior, privacy boundary, local verification steps, and preserved deployment separation.

- [ ] **Step 1: Add a failing README assertion**

```js
test("README documents the keyword docent and privacy boundary", async () => {
  const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");
  assert.match(readme, /키워드 기반 AI 도슨트/);
  assert.match(readme, /외부 AI API를 사용하지 않습니다/);
  assert.match(readme, /대화 내용을 저장하거나 전송하지 않습니다/);
  assert.match(readme, /reliable-ai-engineer-portfolio/);
});
```

- [ ] **Step 2: Run tests and verify documentation is missing**

Run: `npm test`

Expected: FAIL in the new README assertion.

- [ ] **Step 3: Document the feature and deployment boundary**

Explain the five docent topics, verified-answer behavior, 240-character limit, browser-memory-only transcript, no external API, and that the earlier Vercel project remains unchanged.

- [ ] **Step 4: Run automated verification**

Run: `npm test`

Expected: all tests PASS with zero failures.

Run: `git diff --check`

Expected: exit code 0 with no whitespace errors.

- [ ] **Step 5: Run local browser verification**

Start: `python -m http.server 4173`

Verify at desktop 1440 × 900 and mobile 390 × 844:

- Revised hero and vision are visible.
- Launcher, open, close, reset, suggested questions, typed questions, Enter, and Escape work.
- Blank and overlong input do not create a user message.
- Unknown input returns the fallback and preserves suggested questions.
- Project and GitHub links remain correct.
- `document.documentElement.scrollWidth === document.documentElement.clientWidth`.
- No console errors originate from the portfolio.

- [ ] **Step 6: Confirm production remains unchanged**

Open `https://ai-agent-portfolio-theta.vercel.app/` and confirm it still shows the pre-docent production copy.

Open `https://reliable-ai-engineer-portfolio.vercel.app/` and confirm it remains available and unchanged.

- [ ] **Step 7: Commit verified documentation**

```bash
git add README.md tests/portfolio.test.mjs
git commit -m "docs: explain AI docent privacy and verification"
```

- [ ] **Step 8: Stop before publication**

Report the local verification evidence and request explicit user approval before updating GitHub `main` or the production Vercel deployment.

