import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT    = 'C:\\Kit_sports_product\\screenshots';
const DBG    = 9223;

const sleep = ms => new Promise(r => setTimeout(r, ms));

function cdpGet(path) {
  return new Promise((res, rej) => {
    http.get({ host: '127.0.0.1', port: DBG, path }, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => res(JSON.parse(d)));
    }).on('error', rej);
  });
}

function cdpSession(wsUrl) {
  let id = 1;
  const pending = new Map();
  const ws = new WebSocket(wsUrl);

  const ready = new Promise((res, rej) => {
    ws.addEventListener('open', res);
    ws.addEventListener('error', rej);
  });

  ws.addEventListener('message', ({ data }) => {
    const msg = JSON.parse(data);
    if (msg.id && pending.has(msg.id)) {
      const { res, rej } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? rej(new Error(msg.error.message)) : res(msg.result);
    }
  });

  const send = (method, params = {}) => new Promise((res, rej) => {
    const i = id++;
    pending.set(i, { res, rej });
    ws.send(JSON.stringify({ id: i, method, params }));
  });

  const close = () => ws.close();

  return { ready, send, close };
}

async function main() {
  // Make sure dev server is up
  fs.mkdirSync(OUT, { recursive: true });

  const chrome = spawn(CHROME, [
    `--remote-debugging-port=${DBG}`,
    '--no-first-run', '--no-default-browser-check',
    '--disable-extensions', '--disable-gpu',
    '--headless=new', '--window-size=1440,900',
    'about:blank',
  ], { stdio: 'ignore' });

  await sleep(2500);

  try {
    const tabs  = await cdpGet('/json');
    const wsUrl = tabs.find(t => t.type === 'page')?.webSocketDebuggerUrl;
    if (!wsUrl) throw new Error('No CDP page found');

    const { ready, send, close } = cdpSession(wsUrl);
    await ready;

    // ── 1. Sign-in modal screenshot ──────────────────────────
    await send('Page.navigate', { url: 'http://localhost:5173/' });
    await sleep(2000);

    // Click the "Sign In" button
    await send('Runtime.evaluate', {
      expression: `
        const btns = [...document.querySelectorAll('button')];
        const btn  = btns.find(b => b.textContent.trim() === 'Sign In');
        if (btn) btn.click();
      `,
    });
    await sleep(500);

    const shot1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${OUT}\\signin-modal.png`, Buffer.from(shot1.data, 'base64'));
    console.log('✓  signin-modal.png');

    // ── 2. Inject user → reload → logged-in navbar ───────────
    await send('Runtime.evaluate', {
      expression: `
        const users = [{id:1,name:"Ahmed Khan",email:"ahmed@example.com",password:"test123",avatar:"A"}];
        localStorage.setItem('kws_users', JSON.stringify(users));
        const safe = {id:1,name:"Ahmed Khan",email:"ahmed@example.com",avatar:"A"};
        localStorage.setItem('kws_user', JSON.stringify(safe));
      `,
    });

    await send('Page.navigate', { url: 'http://localhost:5173/' });
    await sleep(2000);

    const shot2 = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: 1440, height: 160, scale: 1 },
    });
    fs.writeFileSync(`${OUT}\\navbar-loggedin.png`, Buffer.from(shot2.data, 'base64'));
    console.log('✓  navbar-loggedin.png');

    // ── 3. Open user dropdown ────────────────────────────────
    await send('Runtime.evaluate', {
      expression: `
        const btn = document.querySelector('.navbar__avatar');
        if (btn) btn.click();
      `,
    });
    await sleep(400);

    const shot3 = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: 1440, height: 400, scale: 1 },
    });
    fs.writeFileSync(`${OUT}\\navbar-dropdown.png`, Buffer.from(shot3.data, 'base64'));
    console.log('✓  navbar-dropdown.png');

    close();
    console.log('\nAll done!');
  } finally {
    chrome.kill();
  }
}

main().catch(e => { console.error(e.message); process.exit(1); });
