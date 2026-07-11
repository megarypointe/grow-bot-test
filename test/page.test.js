const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const pagePath = path.join(__dirname, '..', 'index.html');

function page() {
  return fs.readFileSync(pagePath, 'utf8');
}

test('identifies the page as an isolated Grow Bot test environment', () => {
  const html = page();
  assert.match(html, /Grow Bot/i);
  assert.match(html, /Test environment/i);
  assert.match(html, /separate from (the )?live|not.*production/i);
  assert.match(html, /noindex/i);
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
  assert.match(html, /Open test chat/i);
  assert.match(html, /id="messenger-status"/);
  assert.match(html, /Intercom\(['"]onShow['"],\s*markOpened\)/);
  assert.match(html, /Intercom\(['"]show['"]\)/);
  assert.match(html, /openingTimer/);
  assert.match(html, /Unable to load|couldn.t (load|open)/i);
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
