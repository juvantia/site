// Plates: smoked glass in the Civitas silhouette, measured from the title. A plate whose sections are its own tabs
// raises the open one; SINK & RISE (tabs.ts) moves that tab.
import { createEdge, updateEdge } from './edge';
import { offsetWithin, panelPath, TAB_AFTER_TITLE, type TabShape } from './geometry';

const TAB_BEFORE_LABEL = 22;

interface PlateState {
  layout: () => void;
  // The tab being drawn, while SINK & RISE moves it; otherwise the open tab, fully raised.
  shape: TabShape | null;
}

const plates = new WeakMap<HTMLElement, PlateState>();

// The title's own words, as wide as their longest line, measured from the glass's left edge.
const titleEdge = (title: HTMLElement, glass: HTMLElement): number => {
  const range = document.createRange();
  range.selectNodeContents(title);
  return range.getBoundingClientRect().right - glass.getBoundingClientRect().left;
};

export const tabRange = (plate: HTMLElement, label: HTMLElement): { from: number; to: number } => {
  const glass = plate.querySelector<HTMLElement>('.vt-plate-glass');
  if (!glass) return { from: 0, to: 0 };
  const left = offsetWithin(label, glass);
  const first = label.parentElement?.firstElementChild === label;
  return {
    from: first ? 0 : Math.round(left - TAB_BEFORE_LABEL),
    to: Math.round(left + label.offsetWidth + TAB_AFTER_TITLE),
  };
};

export const plateState = (plate: HTMLElement): PlateState | undefined => plates.get(plate);

export const mountPlate = (plate: HTMLElement): (() => void) => {
  const stage = plate.querySelector<HTMLElement>('.vt-plate-stage');
  const glass = plate.querySelector<HTMLElement>('.vt-plate-glass');
  if (!stage || !glass) return () => {};
  const title = plate.querySelector<HTMLElement>('.vt-plate-title');
  const glow = createEdge('vt-plate-glow', [{ width: 3 }]);
  const frame = createEdge('vt-plate-frame', [{ width: 0.8, normalized: true }]);
  stage.prepend(glow);
  stage.append(frame);

  const state: PlateState = { layout: () => {}, shape: null };
  let drawn = '';

  const openTab = (): TabShape | null => {
    const label = plate.querySelector<HTMLElement>('.plate-tab[aria-selected="true"]');
    return label ? { ...tabRange(plate, label), rise: 1 } : null;
  };

  state.layout = () => {
    const width = glass.offsetWidth;
    const height = glass.offsetHeight;
    if (!width || !height) return;
    let tab = state.shape ?? openTab();
    if (!tab) {
      const edge = title ? titleEdge(title, glass) : width * 0.3;
      tab = { from: 0, to: Math.min(width * 0.82, edge + TAB_AFTER_TITLE), rise: 1 };
    }
    tab = { from: tab.from, to: Math.round(Math.min(width - 40, tab.to)), rise: tab.rise };
    const foot = Math.round(width * 0.42);
    const key = `${width}x${height}:${tab.from},${tab.to},${tab.rise.toFixed(3)}`;
    if (key === drawn) return;
    drawn = key;
    glass.style.clipPath = `path('${panelPath(width, height, tab, foot, 0)}')`;
    const d = panelPath(width, height, tab, foot, 0.5);
    updateEdge(glow, width, height, d, 1);
    updateEdge(frame, width, height, d, 0.55);
  };

  plates.set(plate, state);
  const observer = new ResizeObserver(() => state.layout());
  observer.observe(glass);
  if (title) observer.observe(title);
  plate.querySelectorAll('.plate-tab').forEach((label) => observer.observe(label));
  state.layout();
  if (document.fonts) document.fonts.ready.then(() => state.layout());

  return () => {
    observer.disconnect();
    plates.delete(plate);
  };
};
