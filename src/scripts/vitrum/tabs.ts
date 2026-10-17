// A plate whose sections are its own tabs changes them by the glass itself: SINK & RISE.
// The open tab sinks into the plate over 180 ms, then the chosen one rises over 280 ms; the labels follow in CSS.
import { plateState, tabRange } from './plate';

const SINK_MS = 180;
const RISE_MS = 280;
const easeIn = (t: number) => t * t * t;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export const mountTabs = (plate: HTMLElement, reduced: MediaQueryList): (() => void) => {
  const tabs = [...plate.querySelectorAll<HTMLButtonElement>('.plate-tab')];
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls') ?? ''));
  let frame = 0;

  const showPanel = (next: HTMLButtonElement) => {
    panels.forEach((panel, index) => {
      if (!panel) return;
      const open = tabs[index] === next;
      panel.hidden = !open;
      panel.classList.remove('is-entering');
      if (open) {
        void panel.offsetWidth;
        panel.classList.add('is-entering');
      }
    });
  };

  const animate = (duration: number, ease: (t: number) => number, step: (k: number) => void, done: () => void) => {
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      step(ease(t));
      if (t < 1) frame = requestAnimationFrame(tick);
      else done();
    };
    frame = requestAnimationFrame(tick);
  };

  const select = (next: HTMLButtonElement, focus: boolean) => {
    const current = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true');
    if (focus) next.focus();
    if (!current || current === next) return;
    tabs.forEach((tab) => {
      const on = tab === next;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
    });
    const state = plateState(plate);
    cancelAnimationFrame(frame);
    if (!state || reduced.matches) {
      showPanel(next);
      if (state) state.shape = null;
      state?.layout();
      return;
    }
    const sinking = tabRange(plate, current);
    animate(SINK_MS, easeIn, (k) => {
      state.shape = { ...sinking, rise: 1 - k };
      state.layout();
    }, () => {
      showPanel(next);
      animate(RISE_MS, easeOut, (k) => {
        state.shape = { ...tabRange(plate, next), rise: k };
        state.layout();
      }, () => {
        state.shape = null;
        state.layout();
      });
    });
  };

  const onClick = (event: Event) => {
    const tab = (event.target as HTMLElement).closest<HTMLButtonElement>('.plate-tab');
    if (tab) select(tab, false);
  };

  const onKey = (event: KeyboardEvent) => {
    const index = tabs.indexOf(event.target as HTMLButtonElement);
    if (index < 0) return;
    const moves: Record<string, number> = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: tabs.length - 1 };
    if (!(event.key in moves)) return;
    event.preventDefault();
    select(tabs[(moves[event.key] + tabs.length) % tabs.length], true);
  };

  const list = plate.querySelector('[role="tablist"]');
  list?.addEventListener('click', onClick);
  list?.addEventListener('keydown', onKey as EventListener);
  return () => {
    cancelAnimationFrame(frame);
    list?.removeEventListener('click', onClick);
    list?.removeEventListener('keydown', onKey as EventListener);
  };
};
