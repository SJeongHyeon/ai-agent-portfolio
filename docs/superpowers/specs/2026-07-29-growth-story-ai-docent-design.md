# Growth Story Copy and AI Docent Design

## Goal

Revise the portfolio so it combines the earlier Vercel site's warm, purpose-driven
growth narrative with the current site's evidence-first honesty. Add a keyword-based
AI docent that helps recruiters explore the portfolio without an external AI API.

The production Vercel site must remain unchanged until the revised experience has
been implemented and verified locally.

## Positioning

The portfolio presents Seo Jeong-hyeon as a junior AI agent developer who is learning
in public and turning study into small, verifiable implementations.

The site must distinguish:

- `Built`: public code or a working artifact exists.
- `Building`: the implementation is currently in progress.
- `Exploring`: the topic is part of the learning roadmap.

The writing may express ambition, but it must not claim expert-level experience,
production readiness, scale, or measured performance without public evidence.

## Narrative Direction

The revised writing uses approximately 60 percent growth story and 40 percent
verifiable evidence. It keeps the earlier portfolio's sense of purpose while reducing
claims that run ahead of the public repositories.

### Hero

Primary message:

> 배우기 위해 만들고, 신뢰를 얻기 위해 검증합니다.

Supporting introduction:

> AI 에이전트 개발을 배우며 작은 모델 실습부터 도구 호출과 멀티모달
> 인터페이스까지 직접 구현하고 있습니다. 완벽한 결과보다 왜 이 방법을
> 선택했고, 어디서 실패했으며, 다음에는 무엇을 개선할지를 기록합니다.

Vision:

> 장기적으로는 실패를 설명하고 안전하게 도구를 사용하며, 음성과 멀티모달
> 환경에서도 사람이 통제권을 가질 수 있는 AI 에이전트를 만들고 싶습니다.

### Section Labels

- `Why this portfolio exists` becomes `배움을 결과물로 바꾸는 과정`.
- `대표 프로젝트` becomes `배우고, 만들고, 검증한 기록`.
- `Growth map` becomes `AI 에이전트 개발자로 가는 여정`.
- The closing message becomes `완벽한 개발자보다, 계속 검증하며 성장하는 개발자가 되겠습니다.`

The existing project evidence and `Built · Building · Exploring` status labels remain
visible.

## AI Docent Experience

### Entry Point

A fixed `AI 도슨트에게 질문하기` button appears at the lower-right edge of the
page. Activating it opens a compact dialog on desktop and a bottom panel on mobile.

Initial message:

> 안녕하세요. 서정현의 학습 과정과 프로젝트를 안내하는 AI 도슨트입니다.
> 현재 공개된 포트폴리오 정보를 바탕으로 답변해 드립니다.

### Suggested Questions

- 어떤 개발자가 되고 싶나요?
- 현재 확인할 수 있는 프로젝트는 무엇인가요?
- 실패를 어떻게 다루나요?
- 지금 가장 집중해서 배우는 것은 무엇인가요?

Suggested questions and free-form questions use the same answer-selection path.

### Keyword Routing

The docent normalizes the question to lowercase text and matches keyword groups in
priority order:

1. `프로젝트`, `만든 것`, `코드`, `깃허브` → public Built projects and repository links.
2. `실패`, `한계`, `부족`, `개선` → current limitations and improvement practice.
3. `학습`, `공부`, `기술`, `집중` → agent loops, tool calling, STT, and TTS learning.
4. `목표`, `비전`, `미래`, `되고 싶` → reliable voice and multimodal agent vision.
5. `철학`, `개발자`, `가치관`, `신뢰` → learning, verification, and truthful reporting.

If several groups match, the first group in this ordered list wins. If no group
matches, the docent returns the fallback response and shows the suggested questions
again.

Fallback response:

> 아직 그 질문에 맞는 안내가 준비되지 않았습니다. 프로젝트, 실패 경험,
> 현재 학습, 개발 철학 또는 미래 목표에 대해 질문해 주세요.

### Disclosure and Privacy

The panel always includes:

> 실제 생성형 AI가 아닌 포트폴리오 안내 도슨트이며, 사전에 검증된 답변만 제공합니다.

Questions remain in browser memory only. The site does not persist, transmit, or
analyze conversation data. No API key, analytics service, model endpoint, or backend
is introduced.

## Architecture

### `index.html`

Adds the docent launcher, dialog, message list, suggested-question controls, text
input, submit button, reset control, disclosure, and accessible labels. The existing
portfolio remains readable when JavaScript is unavailable.

### `src/docent-data.js`

Exports immutable topic definitions, keyword groups, answers, suggested questions,
the initial message, the fallback response, and disclosure copy.

### `src/docent.js`

Exports pure helpers for normalization and response selection. It also initializes
the dialog, renders user and docent messages with text-only DOM APIs, handles open,
close, submit, suggested questions, reset, and focus restoration.

### `src/portfolio.js`

Updates the profile and project-adjacent narrative copy while preserving public
evidence, status labels, and repository links.

### `src/main.js`

Initializes the portfolio and docent independently. A docent initialization failure
must not prevent portfolio content from rendering.

### `styles.css`

Adds the launcher, desktop dialog, mobile bottom panel, message bubbles, suggested
questions, input area, focus states, reduced-motion behavior, and small disclosure
text. The docent must not introduce horizontal overflow at 390 px.

## Interaction and Error Handling

- Empty or whitespace-only questions are not submitted.
- Input is capped at 240 characters.
- User input and docent responses are inserted using text-only DOM operations.
- Pressing Enter submits; Shift+Enter is not required because the input is single-line.
- Escape closes the panel.
- Closing restores focus to the launcher.
- Reset removes the current transcript and restores the initial message.
- Unknown questions receive the fallback response.
- Suggested questions remain usable after a fallback.
- JavaScript errors in the docent do not remove or hide portfolio content.

## Accessibility

- The launcher exposes whether the dialog is expanded.
- The dialog has an accessible title and description.
- New messages use a polite live region.
- Every icon-only control has an accessible name.
- All controls are keyboard reachable with visible focus.
- Desktop and mobile layouts preserve readable type sizes and touch targets.
- Reduced-motion preferences disable nonessential transitions.

## Testing

### Content and Portfolio Tests

Existing tests continue to verify truthful junior positioning, project status,
evidence, safe external links, required sections, and the live Vercel URL.

New assertions verify the revised hero, section labels, and vision wording.

### Docent Unit Tests

`tests/docent.test.mjs` verifies:

- Every suggested question returns a non-empty answer.
- Each keyword group routes to the intended topic.
- Priority is deterministic when multiple groups match.
- Unknown questions return the fallback response.
- Empty input is rejected.
- Input longer than 240 characters is rejected.
- Rendered text cannot become executable HTML.

### Browser Verification

- Open, close, reset, suggested questions, typed questions, Enter, and Escape work.
- Desktop layout is checked at 1440 × 900.
- Mobile layout is checked at 390 × 844.
- The page has no horizontal overflow.
- GitHub and project links remain correct.
- The portfolio domain produces no console errors.

## Release Process

1. Implement and verify locally without changing the production site.
2. Present the locally verified result to the user.
3. After user approval, publish the source changes to GitHub `main`.
4. Confirm Vercel automatically creates a production deployment from the GitHub commit.
5. Verify the public URL on desktop and mobile.
6. Leave the earlier `reliable-ai-engineer-portfolio` Vercel project unchanged.

