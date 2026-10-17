// The Deck's glass key (GlassButton): a chamfered plate, its rim glow, the sheen and the spark under a mouse.
// A finger has no hover: under it the glass answers with CONTACT, light gathering where it is touched.
import { createEdge, updateEdge } from './edge';
import { chamferedPath } from './geometry';

export const mountDeckKey = (key: HTMLElement): (() => void) => {
  const plate = key.querySelector<HTMLElement>('.deck-key-plate');
  if (!plate) return () => {};
  const glow = createEdge('deck-key-glow', [{ width: 3 }]);
  const edge = createEdge('deck-key-edge', [{ width: 0.8 }]);
  const spark = createEdge('deck-key-spark', [{ width: 1.1, color: '#eafff6' }]);
  key.prepend(glow);
  key.append(edge, spark);

  const layout = () => {
    const width = plate.offsetWidth;
    const height = plate.offsetHeight;
    if (!width || !height) return;
    plate.style.clipPath = `path('${chamferedPath(width, height, 0)}')`;
    const d = chamferedPath(width, height, 0.5);
    updateEdge(glow, width, height, d, 1);
    updateEdge(edge, width, height, d, 1.2);
    updateEdge(spark, width, height, d, 1);
  };
  const observer = new ResizeObserver(layout);
  observer.observe(plate);
  layout();

  if (key.getAttribute('aria-disabled') === 'true') {
    return () => observer.disconnect();
  }

  let pointer: number | null = null;
  let settle = 0;
  const setContact = (x: number, y: number) => {
    const width = key.offsetWidth;
    const height = key.offsetHeight;
    const tone = Math.max(0, Math.min(1, (x / width + y / height) / 2));
    const rgb = [0, 255 - 43 * tone, 136 + 119 * tone].map((channel) => Math.round(channel * 0.65 + 255 * 0.35));
    const spot = Math.round(Math.max(120, Math.min(200, Math.min(width, height) * 1.5 + 40)));
    key.style.setProperty('--contact-size', `${spot}px`);
    key.style.setProperty('--cx', `${x.toFixed(1)}px`);
    key.style.setProperty('--cy', `${y.toFixed(1)}px`);
    key.style.setProperty('--contact-rgb', rgb.join(', '));
  };
  const release = (commit: boolean) => {
    key.classList.remove('is-contact');
    key.classList.add(commit ? 'is-commit' : 'is-cancel');
    settle = window.setTimeout(() => key.classList.remove('is-commit', 'is-cancel'), 400);
  };
  const down = (event: PointerEvent) => {
    if (event.pointerType === 'mouse') return;
    pointer = event.pointerId;
    window.clearTimeout(settle);
    key.classList.remove('is-commit', 'is-cancel');
    const rect = key.getBoundingClientRect();
    setContact(event.clientX - rect.left, event.clientY - rect.top);
    void key.offsetWidth;
    key.classList.add('is-contact');
  };
  const move = (event: PointerEvent) => {
    if (event.pointerId !== pointer) return;
    const rect = key.getBoundingClientRect();
    const margin = 14;
    if (event.clientX < rect.left - margin || event.clientX > rect.right + margin || event.clientY < rect.top - margin || event.clientY > rect.bottom + margin) {
      pointer = null;
      release(false);
      return;
    }
    setContact(event.clientX - rect.left, event.clientY - rect.top);
  };
  const up = (event: PointerEvent) => {
    if (event.pointerId !== pointer) return;
    pointer = null;
    release(true);
  };
  const cancel = (event: PointerEvent) => {
    if (event.pointerId !== pointer) return;
    pointer = null;
    release(false);
  };
  key.addEventListener('pointerdown', down);
  key.addEventListener('pointermove', move);
  key.addEventListener('pointerup', up);
  key.addEventListener('pointercancel', cancel);
  return () => {
    observer.disconnect();
    window.clearTimeout(settle);
  };
};
