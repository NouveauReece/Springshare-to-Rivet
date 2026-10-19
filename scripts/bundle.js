// Resolves the @import tree of style-overrides/new-overrides.css (including Rivet's rivet.css from node_modules)
// into a single stylesheet string. Used by bookmarklet.js and serve.js. No dependencies.
const fs = require('fs');
const path = require('path');

const ENTRY = path.join(__dirname, '..', 'style-overrides', 'new-overrides.css');
const IMPORT_RE = /@import\s+(?:url\(\s*)?["']?([^"')]+?)["']?\s*\)?\s*;/g;

function bundle(file = ENTRY, seen = new Set()) {
  const abs = path.resolve(file);
  if (seen.has(abs)) return '';
  seen.add(abs);
  const css = fs.readFileSync(abs, 'utf8');
  return css.replace(IMPORT_RE, (match, target) => {
    if (/^(https?:)?\/\//.test(target)) return match; // remote imports are left for the browser
    return `/* ${path.relative(process.cwd(), path.resolve(path.dirname(abs), target))} */\n` +
      bundle(path.resolve(path.dirname(abs), target), seen) + '\n';
  });
}

// Light minifier for the inline bookmarklet: drops comments and collapses whitespace (data: URIs are left intact enough to work).
function minify(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

module.exports = { bundle, minify, ENTRY };
