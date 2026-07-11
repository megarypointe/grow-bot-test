# Grow Bot Standalone Intercom Test Page Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Build a private, standalone Grow-branded test page that loads only the Intercom test workspace Messenger (`kxriovvt`) for anonymous visitor testing.

**Architecture:** A zero-build static site keeps the first integration easy to inspect and deploy. The page embeds Intercom's Basic JavaScript loader using the test app ID from the `[TEST]` workspace; no production Intercom ID, API token, customer identity, Airtable access, or Grow Bot backend is included yet. Deployment waits for Kenny to choose the exact test hostname.

**Tech Stack:** Static HTML/CSS/JavaScript, Intercom Messenger web loader, Node's built-in test runner, local HTTP server.

## UX plan

- **Primary flow:** Open dedicated test URL → understand this is a private Grow Bot test environment → click “Open test chat” → use Intercom Messenger.
- **Chrome:** Minimal Grow-inspired header, explicit TEST ENVIRONMENT badge, central support prompt, and one primary action.
- **States:** Messenger loading, Messenger ready, and Messenger unavailable instructions.
- **Isolation cues:** Clearly state that conversations are test data and do not enter the production website chatbot.
- **Mobile:** Single-column layout with a full-width primary action; leave clear space around Intercom's launcher.

---

### Task 1: Add structural and isolation tests

**Files:**
- Create: `test/page.test.js`

Test for the test-environment heading, primary chat action, exact test app ID, absence of the known production app ID, anonymous initialization, and loading/error affordances. Run tests and verify RED because `index.html` does not exist.

### Task 2: Build the standalone page

**Files:**
- Create: `index.html`
- Create: `README.md`

Implement the minimal page and Intercom loader. Keep the app ID in one `data-intercom-app-id` attribute, initialize anonymous visitors only, and expose an “Open test chat” action using `Intercom('show')` after readiness.

### Task 3: Verify behavior and presentation

Run `node --test`, serve locally, inspect browser console/network state, click the primary action, and visually verify desktop and mobile layouts. Do not declare the Intercom integration working until the test Messenger visibly loads from app ID `kxriovvt`.

### Task 4: Deploy only after hostname approval

Ask Kenny for the exact test hostname. Do not choose a production-facing hostname. Once approved, deploy the static page, restrict indexing, verify the real URL loads the test workspace Messenger, and confirm no production workspace traffic/data is involved.
