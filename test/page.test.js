const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const pagePath = path.join(__dirname, '..', 'index.html');

function page() {
  return fs.readFileSync(pagePath, 'utf8');
}

test('shows a minimal GrowBot science laboratory header above the chat button', () => {
  const html = page();
  const body = html.match(/<body>([\s\S]*?)<script>/i)?.[1] || '';
  assert.equal((body.match(/<button\b/gi) || []).length, 1);
  assert.match(body, /<header[^>]+class="lab-header"/i);
  assert.match(body, /GrowBot Test Laboratory/);
  assert.match(body, /class="lab-flask"/);
  assert.match(body, /class="lab-bubble/);
  assert.match(body, /<button[^>]+id="open-chat"[^>]*>Loading chat…<\/button>/i);
  assert.doesNotMatch(body, /<h1|<p\b|<aside|Separate from|production/i);
  assert.match(html, /noindex/i);
});

test('renders a lush illustrated dinosaur jungle background', () => {
  const html = page();
  assert.match(html, /class="dinosaur-backdrop"/);
  assert.match(html, /assets\/growbot-dinosaur-jungle\.webp/);
  assert.match(html, /background-position:\s*center center/);
  assert.match(html, /\.dinosaur-backdrop::after/);
  assert.doesNotMatch(html, /class="lab-backdrop"|class="molecule|class="experiment-glow"/);
});

test('loads only the Intercom test workspace for anonymous visitors', () => {
  const html = page();
  assert.match(html, /data-intercom-app-id="kxriovvt"/);
  assert.match(html, /app_id:\s*appId/);
  assert.doesNotMatch(html, /nriv7aer/);
  assert.doesNotMatch(html, /user_id|user_hash|email\s*:/i);
});

test('offers a clear chat action and verifies Messenger visibility', () => {
  const html = page();
  assert.match(html, /id="open-chat"/);
  assert.match(html, /Open chat/i);
  assert.match(html, /id="messenger-status"/);
  assert.match(html, /Intercom\(['"]onShow['"],\s*markOpened\)/);
  assert.match(html, /Intercom\(['"]show['"]\)/);
  assert.match(html, /openingTimer/);
  assert.match(html, /could not (load|open)/i);
  assert.doesNotMatch(html, /Test Messenger is ready/i);
});

test('configures the approved standalone hostname', () => {
  const cnamePath = path.join(__dirname, '..', 'CNAME');
  assert.equal(fs.readFileSync(cnamePath, 'utf8').trim(), 'chat.growpage.org');
});

test('uses accessible and responsive page foundations', () => {
  const html = page();
  assert.match(html, /<main/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /@media\s*\(max-width:/);
  assert.match(html, /prefers-reduced-motion/);
});
