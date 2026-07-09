import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT    = 'C:\\Kit_sports_product\\screenshots';
const DBG    = 9224;
const sleep  = ms => new Promise(r => setTimeout(r, ms));

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
  return { ready, send, close: () => ws.close() };
}

async function screenshot(send, file, clip) {
  const params = { format: 'png' };
  if (clip) params.clip = { ...clip, scale: 1 };
  const r = await send('Page.captureScreenshot', params);
  fs.writeFileSync(`${OUT}\\${file}`, Buffer.from(r.data, 'base64'));
  console.log(`✓  ${file}`);
}

async function main() {
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
    if (!wsUrl) throw new Error('No CDP page');

    const { ready, send, close } = cdpSession(wsUrl);
    await ready;

    // ── Hero with buttons ─────────────────────────────────────
    await send('Page.navigate', { url: 'http://localhost:5173/' });
    await sleep(2000);
    await screenshot(send, 'buttons-hero.png', { x:0, y:0, width:1440, height:680 });

    // ── Sports Categories (pill tabs) ─────────────────────────
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: document.querySelector('.categories')?.offsetTop - 80 || 1500, behavior: 'instant' })`,
    });
    await sleep(600);
    await screenshot(send, 'buttons-categories.png', { x:0, y:0, width:1440, height:520 });

    // ── Gallery filters ───────────────────────────────────────
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: document.querySelector('.gallery')?.offsetTop - 80 || 3800, behavior: 'instant' })`,
    });
    await sleep(600);
    await screenshot(send, 'buttons-gallery.png', { x:0, y:0, width:1440, height:520 });

    // ── Customizer panel buttons ──────────────────────────────
    await send('Page.navigate', { url: 'http://localhost:5173/customize' });
    await sleep(2000);
    await screenshot(send, 'buttons-customizer.png', { x:0, y:0, width:340, height:900 });

    close();
    console.log('\nDone!');
  } finally {
    chrome.kill();
  }
}

main().catch(e => { console.error(e.message); process.exit(1); });
