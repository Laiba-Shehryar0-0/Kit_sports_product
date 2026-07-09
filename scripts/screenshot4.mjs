import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT    = 'C:\\Kit_sports_product\\screenshots';
const DBG    = 9225;
const sleep  = ms => new Promise(r => setTimeout(r, ms));

function cdpGet(path) {
  return new Promise((res, rej) => {
    http.get({ host: '127.0.0.1', port: DBG, path }, r => {
      let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d)));
    }).on('error', rej);
  });
}

function cdpSession(wsUrl) {
  let id = 1; const pending = new Map();
  const ws = new WebSocket(wsUrl);
  const ready = new Promise((res, rej) => { ws.addEventListener('open', res); ws.addEventListener('error', rej); });
  ws.addEventListener('message', ({ data }) => {
    const msg = JSON.parse(data);
    if (msg.id && pending.has(msg.id)) {
      const { res, rej } = pending.get(msg.id); pending.delete(msg.id);
      msg.error ? rej(new Error(msg.error.message)) : res(msg.result);
    }
  });
  const send = (method, params = {}) => new Promise((res, rej) => {
    const i = id++; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params }));
  });
  return { ready, send, close: () => ws.close() };
}

async function fullshot(send, file) {
  const { contentSize } = await send('Page.getLayoutMetrics');
  const r = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true,
    clip: { x:0, y:0, width: contentSize.width, height: Math.min(contentSize.height, 20000), scale:1 } });
  fs.writeFileSync(`${OUT}\\${file}`, Buffer.from(r.data, 'base64'));
  console.log(`✓  ${file}`);
}

async function clip(send, file, x, y, w, h) {
  const r = await send('Page.captureScreenshot', { format:'png', captureBeyondViewport:true, clip:{x,y,width:w,height:h,scale:1} });
  fs.writeFileSync(`${OUT}\\${file}`, Buffer.from(r.data, 'base64'));
  console.log(`✓  ${file}`);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const chrome = spawn(CHROME, [
    `--remote-debugging-port=${DBG}`, '--no-first-run', '--no-default-browser-check',
    '--disable-extensions', '--disable-gpu', '--headless=new', '--window-size=1440,900',
    'about:blank',
  ], { stdio: 'ignore' });
  await sleep(2500);

  try {
    const tabs  = await cdpGet('/json');
    const wsUrl = tabs.find(t => t.type === 'page')?.webSocketDebuggerUrl;
    if (!wsUrl) throw new Error('No CDP page');
    const { ready, send, close } = cdpSession(wsUrl);
    await ready;

    // Load page and wait for full render
    await send('Page.navigate', { url: 'http://localhost:5173/' });
    await sleep(3000);

    // Get element positions via JS
    const positions = await send('Runtime.evaluate', {
      expression: `JSON.stringify({
        categories: document.querySelector('.categories')?.getBoundingClientRect().top + window.scrollY,
        gallery:    document.querySelector('.gallery')?.getBoundingClientRect().top    + window.scrollY,
        cta:        document.querySelector('.cta-banner')?.getBoundingClientRect().top + window.scrollY,
        hero:       0
      })`,
      returnByValue: true,
    });
    const pos = JSON.parse(positions.result.value);
    console.log('Section positions:', pos);

    // Sports Categories section
    await clip(send, 'buttons-categories.png', 0, pos.categories - 60, 1440, 560);

    // Gallery filters section
    await clip(send, 'buttons-gallery.png', 0, pos.gallery - 60, 1440, 460);

    // CTA Banner
    await clip(send, 'buttons-cta.png', 0, pos.cta - 40, 1440, 200);

    // Kits page
    await send('Page.navigate', { url: 'http://localhost:5173/kits' });
    await sleep(2000);
    await clip(send, 'buttons-kits.png', 0, 80, 1440, 460);

    // Customizer sidebar
    await send('Page.navigate', { url: 'http://localhost:5173/customize' });
    await sleep(2000);
    await clip(send, 'buttons-customizer-panel.png', 0, 72, 330, 820);

    close();
    console.log('\nAll done!');
  } finally {
    chrome.kill();
  }
}

main().catch(e => { console.error(e.message); process.exit(1); });
