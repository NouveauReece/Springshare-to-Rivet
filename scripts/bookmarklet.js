#!/usr/bin/env node
// Writes dist/bookmarklet.txt (the javascript: URL), dist/bookmarklet.html (a page with a draggable link) and
// dist/overrides.bundle.css. Usage:
//   npm run bookmarklet                 -> fetches the CSS from the published file on GitHub (REMOTE_URL); push dist/overrides.bundle.css to update it
//   npm run bookmarklet -- --local      -> loads the CSS from the local dev server (npm run serve); edits show up on refresh
//   npm run bookmarklet -- --inline     -> embeds the CSS in the bookmarklet itself (no server; ~200KB+, may be too big for some browsers)
//   npm run bookmarklet -- --port 9000  -> use a different port for the dev server
const fs = require('fs');
const path = require('path');
const { bundle, minify } = require('./bundle');

const args = process.argv.slice(2);
const inline = args.includes('--inline');
const local = args.includes('--local');
const REMOTE_URL = 'https://raw.githubusercontent.com/NouveauReece/Springshare-to-Rivet/refs/heads/main/dist/overrides.bundle.css';
const portIdx = args.indexOf('--port');
const port = portIdx > -1 ? Number(args[portIdx + 1]) : Number(process.env.PORT) || 8777;
const ID = 'springshare-to-rivet-overrides';

const dist = path.join(__dirname, '..', 'dist');
fs.mkdirSync(dist, { recursive: true });
const css = bundle();
fs.writeFileSync(path.join(dist, 'overrides.bundle.css'), css);

// Click once to add the overrides, click again to remove them.
const code = inline
  ? `(function(){var id=${JSON.stringify(ID)},e=document.getElementById(id);if(e){e.remove();return}` +
    `var s=document.createElement('style');s.id=id;s.textContent=${JSON.stringify(minify(css))};document.head.appendChild(s)})();`
  : !local
  ? // raw.githubusercontent.com serves CSS as text/plain + nosniff, so a <link> would be rejected; fetch it and inject a <style>.
    `(function(){var id=${JSON.stringify(ID)},e=document.getElementById(id);if(e){e.remove();return}` +
    `fetch(${JSON.stringify(REMOTE_URL)}+'?'+Date.now()).then(function(r){if(!r.ok)throw 0;return r.text()}).then(function(t){` +
    `var s=document.createElement('style');s.id=id;s.textContent=t;document.head.appendChild(s)}).catch(function(){` +
    `alert('Could not load overrides from GitHub. (Pages with a strict Content-Security-Policy may block it.)')})})();`
  : `(function(){var id=${JSON.stringify(ID)},e=document.getElementById(id);if(e){e.remove();return}` +
    `var l=document.createElement('link');l.id=id;l.rel='stylesheet';` +
    `l.href='http://localhost:${port}/overrides.css?'+Date.now();` +
    `l.onerror=function(){l.remove();alert('Could not load overrides from localhost:${port}. Is "npm run serve" running? (Pages with a strict CSP may also block it.)')};` +
    `document.head.appendChild(l)})();`;

const url = 'javascript:' + encodeURIComponent(code);
fs.writeFileSync(path.join(dist, 'bookmarklet.txt'), url + '\n');
fs.writeFileSync(path.join(dist, 'bookmarklet.html'), `<!doctype html>
<meta charset="utf-8"><title>Rivet overrides bookmarklet</title>
<style>body{font:16px/1.5 system-ui,sans-serif;max-width:40rem;margin:3rem auto;padding:0 1rem}a.bm{display:inline-block;background:#900;color:#fff;padding:.5rem 1rem;border-radius:4px;text-decoration:none;font-weight:600}</style>
<h1>Rivet overrides bookmarklet</h1>
<p>Drag this link to your bookmarks bar:</p>
<p><a class="bm" href="${url.replace(/"/g, '&quot;')}">Rivet overrides</a></p>
<ol>
${inline || !local ? '' : `<li>Run <code>npm run serve</code> (serves the CSS at <code>http://localhost:${port}/overrides.css</code>, rebuilt on every request).</li>`}
<li>Open any page and click the bookmark to apply the overrides; click again to remove them.</li>
${inline ? '' : local ? '<li>After editing a CSS file, click twice (off, on) to reload the latest version.</li>' : '<li>The CSS comes from the pushed copy of <code>dist/overrides.bundle.css</code> on GitHub (main); after changes, rebuild, commit and push, then click twice (off, on). GitHub may cache for a few minutes.</li>'}
</ol>
<p>Mode: <strong>${inline ? 'inline (CSS embedded, ' + Math.round(url.length / 1024) + ' KB)' : (local ? 'server (localhost:' + port + ')' : 'GitHub (' + REMOTE_URL + ')')}</strong>. Pages with a strict Content-Security-Policy can block injected styles.</p>
`);

console.log(`Mode: ${inline ? 'inline' : local ? 'server (localhost:' + port + ')' : 'GitHub (' + REMOTE_URL + ')'}`);
console.log(`Wrote ${path.relative(process.cwd(), path.join(dist, 'bookmarklet.html'))}  (open it and drag the link to your bookmarks bar)`);
console.log(`Wrote ${path.relative(process.cwd(), path.join(dist, 'bookmarklet.txt'))}   (${Math.round(url.length / 1024)} KB javascript: URL, if you prefer to paste it as a bookmark)`);
console.log(`Wrote ${path.relative(process.cwd(), path.join(dist, 'overrides.bundle.css'))}`);
if (!inline && local) console.log(`Next: npm run serve`);
if (!inline && !local) console.log(`Next: commit and push dist/overrides.bundle.css so the bookmarklet picks up changes`);
