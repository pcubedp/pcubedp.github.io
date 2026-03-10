/* ── Theme ── */
const root = document.documentElement;
const saved = localStorage.getItem('theme') || 'light';
root.setAttribute('data-theme', saved);

document.getElementById('theme-btn').addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ══════════════════════════════════════════
   OVERFLOW SHATTER BUTTON
   idle:  slow drift, one faint hex fragment at a time
   hover: violent burst — slices + overflow hex strings
══════════════════════════════════════════ */
const wrap   = document.getElementById('ovf-wrap');
const canvas = document.getElementById('ovf-canvas');
if (wrap && canvas) {
  const ctx = canvas.getContext('2d');
  const lbl = document.getElementById('ovf-label');

  const BW = 100, BH = 28;
  const CW = BW + 80, CH = BH + 60;
  canvas.width  = CW;
  canvas.height = CH;
  canvas.style.width   = CW + 'px';
  canvas.style.height  = CH + 'px';
  canvas.style.left    = -40 + 'px';
  canvas.style.top     = -20 + 'px';

  let hovering = false, frameT = 0, frags = [], lastSpawn = 0;

  function getC() {
    const dark = root.getAttribute('data-theme') === 'dark';
    return {
      fg:  dark ? '#e4e4f0' : '#111118',
      cy1: dark ? '#48b4e8' : '#1a7ec8',
      cy2: dark ? '#2a9ad4' : '#0f9fc8',
      dim: dark ? '#54546a' : '#6a6a78',
    };
  }

  function hexStr(len) {
    const h = '0123456789abcdef';
    let s = '';
    for (let i = 0; i < len; i++) s += h[Math.floor(Math.random()*16)];
    return s;
  }

  const TEXTS = ['0x000000...','0xdeadbeef','0xff4400','0x0000','null','0xc0ffee','0x41414141','>>>'];

  function spawnFrag(aggressive) {
    const c = getC();
    const colors = [c.cy1, c.cy1, c.cy2, c.fg, c.dim, c.cy1];

    if (aggressive) {
      const sliceCount = 3 + Math.floor(Math.random() * 5);
      for (let i = 0; i < sliceCount; i++) {
        const sh = BH / sliceCount;
        frags.push({
          type: 'slice', sliceY: 20 + i * sh, sliceH: sh + 1,
          x: 40, y: 0,
          vx: (Math.random() - 0.3) * 5, vy: (Math.random() - 0.5) * 3,
          alpha: 0.8 + Math.random() * 0.2, decay: 0.018 + Math.random() * 0.025,
          color: colors[Math.floor(Math.random() * colors.length)],
          text: '0x000000...', size: 9,
        });
      }
      const ovfCount = 4 + Math.floor(Math.random() * 6);
      for (let i = 0; i < ovfCount; i++) {
        frags.push({
          type: 'free',
          x: 20 + Math.random() * 60, y: 20 + Math.random() * BH,
          vx: (Math.random() - 0.2) * 6, vy: (Math.random() - 0.5) * 4,
          alpha: 0.6 + Math.random() * 0.4, decay: 0.02 + Math.random() * 0.03,
          color: colors[Math.floor(Math.random() * colors.length)],
          text: (Math.random() > 0.4 ? '0x' : '') + hexStr(2 + Math.floor(Math.random()*5)),
          size: 7 + Math.random() * 5,
        });
      }
    } else {
      const c2 = getC();
      frags.push({
        type: 'free',
        x: 15 + Math.random() * 70, y: 20 + Math.random() * BH,
        vx: (Math.random() - 0.3) * 0.6, vy: (Math.random() - 0.5) * 0.5,
        alpha: 0.25 + Math.random() * 0.25, decay: 0.004 + Math.random() * 0.005,
        color: Math.random() > 0.5 ? c2.cy1 : c2.cy2,
        text: TEXTS[Math.floor(Math.random() * TEXTS.length)],
        size: 7 + Math.random() * 3,
      });
    }
  }

  function draw() {
    frameT++;
    ctx.clearRect(0, 0, CW, CH);
    if (frameT - lastSpawn > (hovering ? 4 : 40)) {
      spawnFrag(hovering);
      lastSpawn = frameT;
    }
    frags = frags.filter(f => f.alpha > 0.01);
    frags.forEach(f => {
      f.x += f.vx; f.y += f.vy; f.alpha -= f.decay;
      ctx.save();
      ctx.globalAlpha = Math.max(0, f.alpha);
      ctx.fillStyle   = f.color;
      ctx.font = `400 ${f.size}px "IBM Plex Mono",monospace`;
      if (f.type === 'slice') {
        ctx.beginPath(); ctx.rect(0, f.sliceY, CW, f.sliceH); ctx.clip();
      }
      ctx.fillText(f.text, f.x, f.y);
      ctx.restore();
    });
    requestAnimationFrame(draw);
  }

  wrap.addEventListener('mouseenter', () => {
    hovering = true;
    lbl.style.opacity = '0';
    for (let i = 0; i < 3; i++) spawnFrag(true);
  });
  wrap.addEventListener('mouseleave', () => {
    hovering = false;
    lbl.style.opacity = '1';
  });

  draw();
}
