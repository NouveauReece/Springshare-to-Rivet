#!/usr/bin/env node
// Serves the bundled overrides at http://localhost:<port>/overrides.css (rebuilt from the source files on every request,
// so edits show up without re-running anything). Also serves dist/ (bookmarklet.html). Usage: npm run serve [-- --port 9000]
const http = require('http');
const fs = require('fs');
const path = require('path');
const { bundle } = require('./bundle');

const args = process.argv.slice(2);
const portIdx = args.indexOf('--port');
const port = portIdx > -1 ? Number(args[portIdx + 1]) : Number(process.env.PORT) || 8777;
const dist = path.join(__dirname, '..', 'dist');

http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  const headers = { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store' };
  try {
    if (url.pathname === '/overrides.css') {
      res.writeHead(200, { ...headers, 'Content-Type': 'text/css; charset=utf-8' });
      return res.end(bundle());
    }
    const name = url.pathname === '/' ? 'bookmarklet.html' : path.basename(url.pathname);
    const file = path.join(dist, name);
    const type = name.endsWith('.html') ? 'text/html' : name.endsWith('.css') ? 'text/css' : 'text/plain';
    res.writeHead(200, { ...headers, 'Content-Type': type + '; charset=utf-8' });
    res.end(fs.readFileSync(file));
  } catch (err) {
    res.writeHead(err.code === 'ENOENT' ? 404 : 500, headers);
    res.end(String(err.message));
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`Serving overrides at http://localhost:${port}/overrides.css  (bookmarklet page: http://localhost:${port}/)`);
});
