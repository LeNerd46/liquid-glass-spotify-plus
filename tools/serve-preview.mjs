import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const page = fileURLToPath(new URL('../dist/preview/index.html', import.meta.url));
http.createServer(async (_request, response) => {
    try { response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); response.end(await readFile(page)); }
    catch { response.writeHead(404); response.end('Run npm run preview:build first.'); }
}).listen(4178, '127.0.0.1', () => console.log('Liquid Glass preview: http://127.0.0.1:4178'));
