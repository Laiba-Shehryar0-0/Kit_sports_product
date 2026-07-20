import { useRef, useState, useEffect, useCallback } from 'react';
import {
  colorPickerCls, colorPickerSvCls, colorPickerSvHandleCls, colorPickerHueCls,
  colorPickerHueHandleCls, colorPickerHexRowCls, colorPickerSwatchCls,
  inputCls, inputHexCls,
} from './customizerClasses';

function hexToRgb(hex) {
  const raw = hex.replace('#', '');
  const full = raw.length === 3 ? raw.split('').map(c => c + c).join('') : raw.padEnd(6, '0').slice(0, 6);
  const num = parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(v => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')).join('');
}

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  const s = max === 0 ? 0 : d / max;
  return { h, s, v: max };
}

function hsvToRgb(h, s, v) {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;
  if (h < 60)       [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else              [r, g, b] = [c, 0, x];
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
}

function hexToHsv(hex) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHsv(r, g, b);
}

function hsvToHex(h, s, v) {
  const { r, g, b } = hsvToRgb(h, s, v);
  return rgbToHex(r, g, b);
}

/** Full-spectrum saturation/value square + hue strip color picker, with a hex readout. */
export default function ColorPicker({ value, onChange }) {
  const [hsv, setHsv] = useState(() => hexToHsv(value || '#CC0000'));
  const svRef = useRef(null);
  const hueRef = useRef(null);
  const draggingRef = useRef(null);

  useEffect(() => {
    if (draggingRef.current) return;
    if (!value) return;
    const current = hsvToHex(hsv.h, hsv.s, hsv.v).toLowerCase();
    if (value.toLowerCase() !== current) setHsv(hexToHsv(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const updateFromSV = useCallback((clientX, clientY) => {
    const rect = svRef.current.getBoundingClientRect();
    const s = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const v = 1 - Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
    setHsv(prev => {
      const next = { h: prev.h, s, v };
      onChange(hsvToHex(next.h, next.s, next.v));
      return next;
    });
  }, [onChange]);

  const updateFromHue = useCallback((clientX) => {
    const rect = hueRef.current.getBoundingClientRect();
    const h = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)) * 360;
    setHsv(prev => {
      const next = { h, s: prev.s, v: prev.v };
      onChange(hsvToHex(next.h, next.s, next.v));
      return next;
    });
  }, [onChange]);

  const drag = (onMove) => (e) => {
    e.preventDefault();
    draggingRef.current = true;
    onMove(e.clientX, e.clientY);
    const move = (ev) => onMove(ev.clientX, ev.clientY);
    const up = () => {
      draggingRef.current = false;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const pureHueHex = hsvToHex(hsv.h, 1, 1);

  return (
    <div className={colorPickerCls}>
      <div
        ref={svRef}
        className={colorPickerSvCls}
        style={{ background: `linear-gradient(to top, var(--color-black), transparent), linear-gradient(to right, var(--color-light-100), transparent), ${pureHueHex}` }}
        onPointerDown={drag(updateFromSV)}
      >
        <div
          className={colorPickerSvHandleCls}
          style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%`, background: value }}
        />
      </div>
      <div ref={hueRef} className={colorPickerHueCls} onPointerDown={drag((x) => updateFromHue(x))}>
        <div className={colorPickerHueHandleCls} style={{ left: `${(hsv.h / 360) * 100}%`, background: pureHueHex }} />
      </div>
      <div className={colorPickerHexRowCls}>
        <span className={colorPickerSwatchCls} style={{ background: value }} />
        <input
          type="text"
          className={`${inputCls} ${inputHexCls}`}
          value={value}
          onChange={e => /^#[0-9a-fA-F]{0,6}$/.test(e.target.value) && onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
