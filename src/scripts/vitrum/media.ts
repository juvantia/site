// Photos: a pane takes the plates' rim; two photos of one subject cross-fade behind flat controls and a count.
import { createEdge, updateEdge } from './edge';
import { keyPath, PANEL_RADIUS } from './geometry';

export const mountPane = (pane: HTMLElement): (() => void) => {
  const rim = createEdge('pane-edge', [{ width: 0.8 }]);
  pane.append(rim);
  const radius = Number(pane.dataset.radius) || PANEL_RADIUS;
  const layout = () => {
    const width = pane.offsetWidth;
    const height = pane.offsetHeight;
    if (!width || !height) return;
    updateEdge(rim, width, height, keyPath(width, height, 0.5, radius), 0.9);
  };
  const observer = new ResizeObserver(layout);
  observer.observe(pane);
  layout();
  return () => observer.disconnect();
};

export const mountSwitch = (figure: HTMLElement): (() => void) => {
  const images = [...figure.querySelectorAll<HTMLElement>('.switch-img')];
  const count = figure.querySelector<HTMLElement>('[data-count]');
  let index = 0;
  const show = (next: number) => {
    index = (next + images.length) % images.length;
    images.forEach((image, at) => image.classList.toggle('is-on', at === index));
    if (count) count.textContent = String(index + 1).padStart(2, '0');
  };
  const prev = figure.querySelector('[data-prev]');
  const next = figure.querySelector('[data-next]');
  const onPrev = () => show(index - 1);
  const onNext = () => show(index + 1);
  prev?.addEventListener('click', onPrev);
  next?.addEventListener('click', onNext);
  return () => {
    prev?.removeEventListener('click', onPrev);
    next?.removeEventListener('click', onNext);
  };
};
