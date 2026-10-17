// Entrances below the first screen, and the night scene drifting slower than the page.

// Plates below the fold wait, then rise as they come into view, 120 ms apart.
export const mountEntrances = (reduced: MediaQueryList): (() => void) => {
  if (reduced.matches || !('IntersectionObserver' in window)) return () => {};
  const plates = [...document.querySelectorAll<HTMLElement>('.vt-plate')];
  const fold = window.innerHeight * 0.94;
  const waiting = plates.filter((plate) => plate.getBoundingClientRect().top > fold);
  waiting.forEach((plate) => {
    plate.dataset.enter = 'pending';
  });
  const observer = new IntersectionObserver((entries) => {
    let order = 0;
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const plate = entry.target as HTMLElement;
      plate.style.setProperty('--enter-delay', `${order * 120}ms`);
      order += 1;
      plate.dataset.enter = 'run';
      observer.unobserve(plate);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  waiting.forEach((plate) => observer.observe(plate));
  return () => observer.disconnect();
};

export const heroParallax = (stage: HTMLElement, reduced: MediaQueryList) => (): void => {
  if (reduced.matches) return;
  const y = Math.min(window.scrollY, stage.offsetHeight);
  stage.style.setProperty('--hero-shift', `${(y * 0.32 - 60).toFixed(1)}px`);
};
