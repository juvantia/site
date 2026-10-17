// The world behind every page: the land drifts a little slower than the page (Juvantia Auth's World.tsx).
// The canvas persists between pages (transition:persist), so the land is drawn once per window size.
import { paintRelief, type Plain } from './relief';

const cache = new Map<string, HTMLCanvasElement>();
let relief: HTMLCanvasElement | null = null;
let extra = 0;
let drawn = { key: '', width: 0, height: 0 };

const plainNow = (): Plain | null => {
  const node = document.querySelector('[data-plain]');
  const rect = node?.getBoundingClientRect();
  if (!rect || !rect.width) return null;
  return {
    x: Math.round(rect.left + rect.width / 2),
    y: Math.round(rect.top + rect.height / 2 + window.scrollY),
    rx: Math.round(rect.width / 2 + 70),
    ry: 70,
  };
};

export const parallax = (): void => {
  if (!relief) return;
  const range = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const shift = Math.min(extra, (window.scrollY / range) * extra * 0.6);
  relief.style.transform = `translate3d(0, ${(-shift).toFixed(1)}px, 0)`;
};

const drawWorld = (): void => {
  relief = document.querySelector<HTMLCanvasElement>('.vt-relief');
  if (!relief) return;
  const width = document.documentElement.clientWidth;
  const height = window.innerHeight;
  if (!width || !height) return;
  const plain = plainNow();
  // A phone's bars come and go while it scrolls: within that range the land keeps its drawing.
  const sameWindow = width === drawn.width && height <= drawn.height + extra && height >= drawn.height * 0.85;
  const drawHeight = sameWindow ? drawn.height : height;
  const key = `${width}x${drawHeight}:${plain ? `${plain.x},${plain.y}` : 'none'}`;
  if (key !== drawn.key) {
    extra = Math.round(drawHeight * 0.32);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let layer = cache.get(key);
    if (!layer) {
      layer = paintRelief(width, drawHeight, extra, plain, dpr);
      cache.set(key, layer);
    }
    drawn = { key, width, height: drawHeight };
    relief.width = layer.width;
    relief.height = layer.height;
    relief.style.width = `${width}px`;
    relief.style.height = `${drawHeight + extra}px`;
    const ctx = relief.getContext('2d');
    ctx?.clearRect(0, 0, layer.width, layer.height);
    ctx?.drawImage(layer, 0, 0);
  }
  relief.classList.add('is-ready');
  parallax();
};

export const redrawWorld = (): void => {
  requestAnimationFrame(drawWorld);
};
