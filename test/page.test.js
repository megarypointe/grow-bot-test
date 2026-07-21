const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const pagePath = path.join(__dirname, '..', 'index.html');

function page() {
  return fs.readFileSync(pagePath, 'utf8');
}

test('shows only the background and a mobile chat fallback with no page copy', () => {
  const html = page();
  const body = html.match(/<body>([\s\S]*?)<script>/i)?.[1] || '';
  assert.doesNotMatch(body, /<main|<header|<h1|<p\b|<aside|GrowBot Test Laboratory|Open chat/i);
  assert.match(body, /<button[^>]+id="mobile-chat-launcher"[^>]+aria-label="Open Grow Bot chat"/i);
  assert.match(html, /noindex/i);
});

test('uses the user-provided GrowBot background image', () => {
  const html = page();
  assert.match(html, /class="space-backdrop"/);
  assert.match(html, /assets\/growbot-background\.png/);
  assert.ok(fs.existsSync(path.join(__dirname, '..', 'assets', 'growbot-background.png')));
  assert.match(html, /background-position:\s*center center/);
  assert.match(html, /\.space-backdrop::after/);
});

test('uses the GrowBot dinosaur favicon', () => {
  const html = page();
  assert.match(html, /<link\s+rel="icon"\s+type="image\/png"\s+sizes="32x32"\s+href="assets\/favicon-32\.png">/i);
  assert.match(html, /<link\s+rel="apple-touch-icon"\s+href="assets\/apple-touch-icon\.png">/i);

  assert.ok(fs.existsSync(path.join(__dirname, '..', 'assets', 'favicon-32.png')));
  assert.ok(fs.existsSync(path.join(__dirname, '..', 'assets', 'apple-touch-icon.png')));
});

test('keeps the foreground still with subtle fluid deep-space motion', () => {
  const html = page();
  assert.ok(fs.existsSync(path.join(__dirname, '..', 'assets', 'growbot-dinosaur-jungle.webp')));
  assert.match(html, /class="space-backdrop"/);
  assert.match(html, /assets\/growbot-background\.png/);
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

test('uses the default desktop launcher and a guaranteed mobile launcher', () => {
  const html = page();
  assert.match(html, /const\s+isMobile\s*=\s*window\.matchMedia\(['"]\(max-width:\s*600px\)['"]\)\.matches/);
  assert.match(html, /hide_default_launcher:\s*isMobile/);
  assert.match(html, /mobileLauncher\.addEventListener\(['"]click['"],\s*\(\)\s*=>\s*window\.Intercom\(['"]show['"]\)\)/);
  assert.match(html, /Intercom\(['"]onShow['"],/);
  assert.match(html, /Intercom\(['"]onHide['"],/);
  assert.match(html, /#mobile-chat-launcher\s*\{[\s\S]*display:\s*none/);
  assert.match(html, /@media\s*\(max-width:\s*600px\)[\s\S]*#mobile-chat-launcher\s*\{[\s\S]*display:\s*(?:grid|flex|block)/);
  assert.ok(html.indexOf("window.Intercom('boot', intercomSettings)") < html.indexOf("script.src = `https://widget.intercom.io/widget/"));
});

test('configures the approved standalone hostname', () => {
  const cnamePath = path.join(__dirname, '..', 'CNAME');
  assert.equal(fs.readFileSync(cnamePath, 'utf8').trim(), 'growbot.chat');
});

test('uses responsive page foundations', () => {
  const html = page();
  assert.match(html, /@media\s*\(max-width:/);
  assert.match(html, /prefers-reduced-motion/);
});
