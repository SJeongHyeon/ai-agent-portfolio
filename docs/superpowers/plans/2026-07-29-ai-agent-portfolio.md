# AI Agent Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a recruiter-facing portfolio that presents Seo Jeong-hyeon as a junior AI agent developer focused on reliable systems and growing toward voice and multimodal interaction.

**Architecture:** Use a dependency-free static site so the portfolio remains easy to understand, test, and deploy. Keep structured portfolio content and rendering logic in small JavaScript modules, serve the generated interface from `index.html`, and deploy the dedicated repository to Vercel without mixing it with Python/Streamlit projects.

**Tech Stack:** Semantic HTML5, modern CSS, browser JavaScript modules, Node.js built-in test runner, GitHub, Vercel

## Global Constraints

- Preserve the existing `Streamlit`, `MINI-TEST`, and Vercel projects until the new deployment is verified.
- Describe only work supported by the current public repositories or label it `Building` or `Exploring`.
- Do not claim expert, production-ready, scalable, or performance improvements without evidence.
- Default language is Korean with standard English technical terms retained.
- The primary public GitHub identity is `https://github.com/SJeongHyeon`.
- The site must remain usable without API keys, authentication, or client-side frameworks.

---

### Task 1: Portfolio content model and rendering

**Files:**
- Create: `package.json`
- Create: `tests/portfolio.test.mjs`
- Create: `src/portfolio.js`

**Interfaces:**
- Produces: `profile`, `projects`, `getProjectsByStatus(status)`, and `renderProjectCard(project)`

- [ ] **Step 1: Write tests for truthful positioning, status filtering, and project-card links**
- [ ] **Step 2: Run `npm test` and confirm failure because `src/portfolio.js` does not exist**
- [ ] **Step 3: Implement the minimum exported content and functions**
- [ ] **Step 4: Run `npm test` and confirm all tests pass**
- [ ] **Step 5: Review all claims against the public GitHub repositories**

### Task 2: Recruiter-facing single-page interface

**Files:**
- Create: `index.html`
- Create: `src/main.js`
- Create: `styles.css`
- Modify: `tests/portfolio.test.mjs`

**Interfaces:**
- Consumes: `profile`, `projects`, and `renderProjectCard(project)` from `src/portfolio.js`
- Produces: semantic sections for hero, evidence, projects, learning path, and contact

- [ ] **Step 1: Add a failing test for required navigation and portfolio sections**
- [ ] **Step 2: Run `npm test` and confirm the required markup is missing**
- [ ] **Step 3: Add the minimum semantic HTML and browser entrypoint**
- [ ] **Step 4: Add responsive visual styling with strong focus states and reduced-motion support**
- [ ] **Step 5: Run `npm test` and confirm all tests pass**

### Task 3: Repository documentation and working agreements

**Files:**
- Create: `README.md`
- Create: `AGENTS.md`
- Create: `.gitignore`
- Modify: `tests/portfolio.test.mjs`

**Interfaces:**
- README documents purpose, local run commands, truthful project status, structure, and Vercel deployment.
- AGENTS.md preserves the learning, surgical-change, verification, and portfolio-evidence rules.

- [ ] **Step 1: Add a failing test for required README evidence sections**
- [ ] **Step 2: Run `npm test` and confirm README is missing**
- [ ] **Step 3: Write README and project-scoped AGENTS.md**
- [ ] **Step 4: Run `npm test` and confirm documentation checks pass**

### Task 4: Local browser verification

**Files:**
- Verify: `index.html`
- Verify: `styles.css`
- Verify: `src/main.js`

**Interfaces:**
- Consumes the completed static site.
- Produces browser evidence for desktop layout, narrow viewport behavior, links, and console cleanliness.

- [ ] **Step 1: Run `npm test`**
- [ ] **Step 2: Start a local static server**
- [ ] **Step 3: Inspect the page in a browser at desktop width**
- [ ] **Step 4: Inspect the page at a mobile breakpoint**
- [ ] **Step 5: Verify GitHub/project links and check browser console errors**

### Task 5: GitHub publication

**Files:**
- Track: all site, source, test, and documentation files

**Interfaces:**
- Produces: public repository `SJeongHyeon/ai-agent-portfolio`

- [ ] **Step 1: Initialize the local Git repository on `main`**
- [ ] **Step 2: Verify `gh --version` and `gh auth status`**
- [ ] **Step 3: Review `git status` and exclude local-only files**
- [ ] **Step 4: Create the public GitHub repository and add `origin`**
- [ ] **Step 5: Commit the verified initial portfolio**
- [ ] **Step 6: Push `main` and confirm the public repository contents**

### Task 6: Safe Vercel migration

**Files:**
- External configuration only after GitHub publication succeeds

**Interfaces:**
- Consumes: public `SJeongHyeon/ai-agent-portfolio` repository
- Produces: a new verified Vercel deployment before any old deployment is retired

- [ ] **Step 1: Import `SJeongHyeon/ai-agent-portfolio` as a separate Vercel project**
- [ ] **Step 2: Verify the preview deployment without authentication**
- [ ] **Step 3: Verify navigation, project links, and mobile layout on Vercel**
- [ ] **Step 4: Confirm GitHub pushes trigger automatic deployments**
- [ ] **Step 5: Only after approval, decide whether to move the existing portfolio domain**

