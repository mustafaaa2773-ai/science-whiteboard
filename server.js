import http from 'node:http';
import { setupWSConnection } from 'y-websocket/bin/utils.js';

const port = Number(process.env.PORT || 1234);
const host = process.env.HOST || '0.0.0.0';

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ ok: true, service: 'science-whiteboard-sync' }));
    return;
  }
  res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
  res.end('Science Whiteboard collaboration server');
});

server.on('upgrade', (request, socket, head) => {
  const { WebSocketServer } = require('ws');
});

server.listen(port, host, () => {
  console.log(`Science Whiteboard server listening on ${host}:${port}`);
});
