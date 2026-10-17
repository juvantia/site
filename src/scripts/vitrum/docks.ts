// The header comes back as a dock on the way up; on a phone the sections live in a floating dock at the bottom.
import { createEdge, updateEdge } from './edge';
import { keyPath, PANEL_RADIUS } from './geometry';

const mountRim = (dock: HTMLElement) => {
  const rim = createEdge('dock-edge', [{ width: 0.8 }]);
  dock.append(rim);
  const layout = () => {
    const width = dock.offsetWidth;
    const height = dock.offsetHeight;
    if (!width || !height) return;
    updateEdge(rim, width, height, keyPath(width, height, 0.5, PANEL_RADIUS), 0.95);
  };
  const observer = new ResizeObserver(layout);
  observer.observe(dock);
  layout();
  return observer;
};

// The desktop dock: shown when scrolling up once the header has gone, hidden on the way down.
export const mountTopDock = (dock: HTMLElement): { sync: () => void; cleanup: () => void } => {
  const observer = mountRim(dock);
  let lastY = window.scrollY;
  const sync = () => {
    const head = document.querySelector('.site-head');
    const y = window.scrollY;
    const bottom = head ? head.getBoundingClientRect().bottom + y : 0;
    const below = y > bottom + 160;
    if (!below) dock.classList.remove('is-shown');
    else if (y < lastY - 4) dock.classList.add('is-shown');
    else if (y > lastY + 4) dock.classList.remove('is-shown');
    lastY = y;
  };
  sync();
  return { sync, cleanup: () => observer.disconnect() };
};

// The phone's dock: CONTACT under a finger or a pen; a mouse has the tabs' own hover.
export const mountPhoneDock = (dock: HTMLElement): (() => void) => {
  const observer = mountRim(dock);
  const plate = dock.querySelector<HTMLElement>('.dock-plate');
  let pointer: number | null = null;
  const place = (event: PointerEvent) => {
    if (!plate) return;
    const rect = dock.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const tone = Math.max(0, Math.min(1, (x / rect.width + y / rect.height) / 2));
    const rgb = [0, 255 - 43 * tone, 136 + 119 * tone].map((channel) => Math.round(channel * 0.65 + 255 * 0.35));
    plate.style.setProperty('--cx', `${x.toFixed(1)}px`);
    plate.style.setProperty('--cy', `${y.toFixed(1)}px`);
    plate.style.setProperty('--contact-rgb', rgb.join(', '));
  };
  const down = (event: PointerEvent) => {
    if (event.pointerType === 'mouse') return;
    pointer = event.pointerId;
    place(event);
    dock.classList.add('is-contact');
  };
  const move = (event: PointerEvent) => {
    if (event.pointerId === pointer) place(event);
  };
  const end = (event: PointerEvent) => {
    if (event.pointerId !== pointer) return;
    pointer = null;
    dock.classList.remove('is-contact');
  };
  dock.addEventListener('pointerdown', down);
  dock.addEventListener('pointermove', move);
  ['pointerup', 'pointercancel', 'pointerleave'].forEach((type) => dock.addEventListener(type, end as EventListener));

  // The sections keep their size and scroll sideways; the edge where more waits fades, and a section chosen at an
  // edge comes fully into view.
  const scroller = dock.querySelector<HTMLElement>('[data-dock-scroll]');
  if (!scroller) return () => observer.disconnect();
  const EDGE = 30;
  const sync = () => {
    const max = scroller.scrollWidth - scroller.clientWidth;
    scroller.classList.toggle('has-before', scroller.scrollLeft > 2);
    scroller.classList.toggle('has-after', scroller.scrollLeft < max - 2);
  };
  const reveal = (tab: HTMLElement, smooth: boolean) => {
    const start = tab.offsetLeft;
    const end = start + tab.offsetWidth;
    let left = scroller.scrollLeft;
    if (start - left < EDGE) left = start - EDGE;
    else if (end - left > scroller.clientWidth - EDGE) left = end - scroller.clientWidth + EDGE;
    left = Math.max(0, Math.min(left, scroller.scrollWidth - scroller.clientWidth));
    if (Math.abs(left - scroller.scrollLeft) > 1) scroller.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' });
  };
  const onClick = (event: Event) => {
    const tab = (event.target as HTMLElement).closest<HTMLElement>('.nav-tab');
    if (tab) reveal(tab, true);
  };
  scroller.addEventListener('scroll', sync, { passive: true });
  scroller.addEventListener('click', onClick);
  const scrollObserver = new ResizeObserver(sync);
  scrollObserver.observe(scroller);
  const open = scroller.querySelector<HTMLElement>('[aria-current="page"]');
  if (open) reveal(open, false);
  sync();
  if (document.fonts) document.fonts.ready.then(sync);
  return () => {
    observer.disconnect();
    scrollObserver.disconnect();
  };
};
