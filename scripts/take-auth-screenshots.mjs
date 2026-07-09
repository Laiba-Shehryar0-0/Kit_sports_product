/**
 * Uses Chrome DevTools Protocol (CDP) over HTTP + WebSocket
 * to inject localStorage, navigate, and screenshot — no extra packages.
 */
import { spawn }     from 'child_process';
import http          from 'http';
import { createConnection } from 'net';
import fs            from 'fs';
import path          from 'path';
import { fileURLToPath } from 'url';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT    = 'C:\\Kit_sports_product\\screenshots';
const PORT   = 9222;

function cdpGet(path) {
  return new Promise((res, rej) => {
    http.get({ host: '127.0.0.1', port: PORT, path }, (r) => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => res(JSON.parse(d)));
    }).on('error', rej);
  });
}

function cdpWS(wsUrl, cmds) {
  return new Promise((resolve, reject) => {
    const url   = new URL(wsUrl);
    const host  = url.hostname;
    const wsPath = url.pathname;

    // Minimal WebSocket handshake
    const key = Buffer.from(Math.random().toString()).toString('base64');
    const req = [
      `GET ${wsPath} HTTP/1.1`,
      `Host: ${host}:${PORT}`,
      'Upgrade: websocket',
      'Connection: Upgrade',
      `Sec-WebSocket-Key: ${key}`,
      'Sec-WebSocket-Version: 13',
      '', '',
    ].join('\r\n');

    const sock = createConnection(PORT, host, () => sock.write(req));
    let   buf  = Buffer.alloc(0);
    let   handshakeDone = false;
    let   msgId = 1;
    const pending = new Map();

    function sendFrame(payload) {
      const data   = Buffer.from(JSON.stringify(payload));
      const mask   = Buffer.from([0x9f, 0x3e, 0x1a, 0x2b]);
      const header = Buffer.alloc(data.length < 126 ? 6 : 8);
      header[0] = 0x81; // FIN + text frame
      if (data.length < 126) {
        header[1] = 0x80 | data.length;
        mask.copy(header, 2);
      } else {
        header[1] = 0x80 | 126;
        header.writeUInt16BE(data.length, 2);
        mask.copy(header, 4);
      }
      const masked = Buffer.from(data.map((b, i) => b ^ mask[i % 4]));
      sock.write(Buffer.concat([header, masked]));
    }

    function send(method, params = {}) {
      const id = msgId++;
      return new Promise((r) => {
        pending.set(id, r);
        sendFrame({ id, method, params });
      });
    }

    sock.on('data', (chunk) => {
      buf = Buffer.concat([buf, chunk]);
      if (!handshakeDone) {
        const idx = buf.indexOf('\r\n\r\n');
        if (idx === -1) return;
        handshakeDone = true;
        buf = buf.slice(idx + 4);
      }
      // Parse WebSocket frames
      while (buf.length > 2) {
        const len = buf[1] & 0x7f;
        const offset = len < 126 ? 2 : (len === 126 ? 4 : 10);
        const frameLen = offset + (len < 126 ? len : buf.readUInt16BE(2));
        if (buf.length < frameLen) break;
        const payload = buf.slice(offset, frameLen).toString();
        buf = buf.slice(frameLen);
        try {
          const msg = JSON.parse(payload);
          if (msg.id && pending.has(msg.id)) {
            pending.get(msg.id)(msg.result);
            pending.delete(msg.id);
          }
        } catch {}
      }
    });

    sock.on('error', reject);

    // Run commands sequentially
    (async () => {
      try {
        await new Promise(r => setTimeout(r, 300));
        for (const cmd of cmds) {
          const result = await send(cmd.method, cmd.params || {});
          if (cmd.callback) await cmd.callback(result, send);
          if (cmd.delay)    await new Promise(r => setTimeout(r, cmd.delay));
        }
        resolve();
      } catch (e) {
        reject(e);
      } finally {
        sock.destroy();
      }
    })();
  });
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  // 1. Launch Chrome with remote debugging
  const chrome = spawn(CHROME, [
    `--remote-debugging-port=${PORT}`,
    '--no-first-run', '--no-default-browser-check',
    '--disable-extensions', '--disable-gpu',
    '--headless=new',
    '--window-size=1440,900',
    'about:blank',
  ], { detached: false, stdio: 'ignore' });

  await sleep(2000);

  try {
    // 2. Get the open tab
    const tabs  = await cdpGet('/json');
    const wsUrl = tabs.find(t => t.type === 'page')?.webSocketDebuggerUrl;
    if (!wsUrl) throw new Error('No page tab found');

    fs.mkdirSync(OUT, { recursive: true });

    // ── SCREENSHOT 1: sign-in modal ──────────────────────────────────
    await cdpWS(wsUrl, [
      {
        method: 'Page.navigate',
        params: { url: 'http://localhost:5173/' },
        delay: 2500,
      },
      {
        // Click "Sign In" button via JS
        method: 'Runtime.evaluate',
        params: {
          expression: `
            (() => {
              const btns = [...document.querySelectorAll('button')];
              const btn  = btns.find(b => b.textContent.trim() === 'Sign In');
              if (btn) btn.click();
            })()
          `,
        },
        delay: 600,
      },
      {
        method: 'Page.captureScreenshot',
        params: { format: 'png', clip: { x:0, y:0, width:1440, height:900, scale:1 } },
        callback: async (result) => {
          fs.writeFileSync(path.join(OUT, 'signin-modal.png'),
            Buffer.from(result.data, 'base64'));
          console.log('✓ signin-modal.png');
        },
      },
    ]);

    // ── SCREENSHOT 2: logged-in navbar ──────────────────────────────
    await cdpWS(wsUrl, [
      {
        // Inject auth state
        method: 'Runtime.evaluate',
        params: {
          expression: `
            (() => {
              const users = [{id:1,name:"Ahmed Khan",email:"ahmed@example.com",password:"test123",avatar:"A"}];
              localStorage.setItem('kws_users', JSON.stringify(users));
              const safe = {id:1,name:"Ahmed Khan",email:"ahmed@example.com",avatar:"A"};
              localStorage.setItem('kws_user', JSON.stringify(safe));
            })()
          `,
        },
      },
      {
        method: 'Page.navigate',
        params: { url: 'http://localhost:5173/' },
        delay: 2500,
      },
      {
        method: 'Page.captureScreenshot',
        params: { format: 'png', clip: { x:0, y:0, width:1440, height:160, scale:1 } },
        callback: async (result) => {
          fs.writeFileSync(path.join(OUT, 'navbar-loggedin.png'),
            Buffer.from(result.data, 'base64'));
          console.log('✓ navbar-loggedin.png');
        },
      },
    ]);

    console.log('All screenshots done.');
  } finally {
    chrome.kill();
  }
}

main().catch(e => { console.error(e); process.exit(1); });
