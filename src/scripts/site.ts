// juvantia.org in Neon Vitrum: the world is drawn once and stays between pages; everything else mounts on each page
// (astro:page-load) and lets go before the next one replaces it (astro:before-swap).
import { parallax, redrawWorld } from './vitrum/world';
import { mountPlate } from './vitrum/plate';
import { mountTabs } from './vitrum/tabs';
import { mountDeckKey } from './vitrum/key';
import { mountPane, mountSwitch } from './vitrum/media';
import { mountPhoneDock, mountTopDock } from './vitrum/docks';
import { heroParallax, mountEntrances } from './vitrum/motion';
import { mountFaq } from './vitrum/faq';
import { mountDownloadMenu } from './vitrum/download-menu';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const cleanups: (() => void)[] = [];
const onScroll = new Set<() => void>();

const each = (selector: string, mount: (node: HTMLElement) => () => void) => {
  document.querySelectorAll<HTMLElement>(selector).forEach((node) => cleanups.push(mount(node)));
};

const writeMail = () => {
  const user = 'info';
  const domain = 'juvantia.org';
  window.location.href = `mailto:${user}@${domain}`;
};

const start = () => {
  each('[data-plate]', mountPlate);
  each('[data-tabs]', (plate) => mountTabs(plate, reduced));
  each('[data-pane]', mountPane);
  each('[data-deck-key]', mountDeckKey);
  each('[data-download-menu]', mountDownloadMenu);
  each('[data-switch]', mountSwitch);
  each('[data-faq]', mountFaq);
  each('[data-mail]', (button) => {
    button.addEventListener('click', writeMail);
    return () => button.removeEventListener('click', writeMail);
  });

  const topDock = document.querySelector<HTMLElement>('[data-dock]');
  if (topDock) {
    const dock = mountTopDock(topDock);
    onScroll.add(dock.sync);
    cleanups.push(dock.cleanup);
  }
  const phoneDock = document.querySelector<HTMLElement>('[data-phone-dock]');
  if (phoneDock) cleanups.push(mountPhoneDock(phoneDock));

  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (hero) {
    const drift = heroParallax(hero, reduced);
    drift();
    onScroll.add(drift);
  }

  cleanups.push(mountEntrances(reduced));
  redrawWorld();
};

const stop = () => {
  cleanups.splice(0).forEach((cleanup) => cleanup());
  onScroll.clear();
};

let scrollFrame = 0;
window.addEventListener('scroll', () => {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0;
    parallax();
    onScroll.forEach((sync) => sync());
  });
}, { passive: true });

let resizeTimer = 0;
window.addEventListener('resize', () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(redrawWorld, 140);
});

if (document.fonts) document.fonts.ready.then(redrawWorld);
document.addEventListener('astro:page-load', start);
document.addEventListener('astro:before-swap', stop);
