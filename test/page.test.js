const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const pagePath = path.join(__dirname, '..', 'index.html');

function page() {
  return fs.readFileSync(pagePath, 'utf8');
}

test('centers the laboratory title above the chat button without a top bar or page avatar', () => {
  const html = page();
  const body = html.match(/<body>([\s\S]*?)<script>/i)?.[1] || '';
  assert.equal((body.match(/<button\b/gi) || []).length, 1);
  assert.match(body, /<main[^>]*>[\s\S]*class="launch-panel"[\s\S]*<h1[^>]+id="page-title"[^>]*>GrowBot Test Laboratory<\/h1>[\s\S]*id="open-chat"/i);
  assert.doesNotMatch(body, /<header|class="growbot-avatar"|growbot-profile\.webp/);
  assert.match(body, /<button[^>]+id="open-chat"[^>]*>Loading chat…<\/button>/i);
  assert.doesNotMatch(body, /<p\b|<aside|Separate from|production/i);
  assert.match(html, /noindex/i);
});

test('uses a polished friendly robot-dinosaur space landscape', () => {
  const html = page();
  assert.match(html, /class="space-backdrop"/);
  assert.match(html, /assets\/growbot-robot-dinosaurs-space\.webp/);
  assert.match(html, /background-position:\s*center center/);
  assert.match(html, /\.space-backdrop::after/);
});

test('keeps the foreground still with subtle fluid deep-space motion', () => {
  const html = page();
  assert.ok(fs.existsSync(path.join(__dirname, '..', 'assets', 'growbot-dinosaur-jungle.webp')));
  assert.match(html, /class="space-backdrop"/);
  assert.match(html, /assets\/growbot-robot-dinosaurs-space\.webp/);
  assert.match(html, /class="deep-space-flow"/);
  assert.match(html, /class="distant-galaxy galaxy-one"/);
  assert.match(html, /class="distant-galaxy galaxy-two"/);
  assert.match(html, /class="cosmic-dust"/);
  assert.match(html, /@keyframes\s+water-flow/);
  assert.match(html, /@keyframes\s+galaxy-turn/);
  assert.doesNotMatch(html, /--pointer-x|pointermove|requestAnimationFrame|translate3d\(calc\(var\(--pointer/);
  assert.doesNotMatch(html, /class="space-stars|background-size:\s*83px|background-size:\s*127px|class="space-comet"|class="cosmic-drift/);
  assert.match(html, /background-position:\s*center center/);
  assert.match(html, /\.space-backdrop::after/);
  assert.doesNotMatch(html, /class="dinosaur-backdrop"/);
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
  assert.equal(fs.readFileSync(cnamePath, 'utf8').trim(), 'growbot.chat');
});

test('uses accessible and responsive page foundations', () => {
  const html = page();
  assert.match(html, /<main/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /@media\s*\(max-width:/);
  assert.match(html, /prefers-reduced-motion/);
});
