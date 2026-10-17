// FAQ: every answer is in the page; a question opens on a click or from its own link (#id), and its link can be copied
// with the key beside it (outside the summary, so copying never folds the answer).
export const mountFaq = (list: HTMLElement): (() => void) => {
  const items = [...list.querySelectorAll<HTMLDetailsElement>('details.faq-item')];
  const timers: number[] = [];

  const openFromHash = () => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const item = items.find((entry) => entry.id === id);
    if (!item) return;
    item.open = true;
    timers.push(window.setTimeout(() => item.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120));
  };

  const onCopy = async (event: Event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-copy-link]');
    if (!button) return;
    const item = items.find((entry) => entry.id === button.dataset.copyLink);
    if (!item) return;
    const url = `${window.location.origin}${window.location.pathname}#${item.id}`;
    window.history.replaceState(null, '', `#${item.id}`);
    item.open = true;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // The address bar already holds the link.
    }
    button.classList.add('is-copied');
    button.setAttribute('aria-label', 'Link copied');
    timers.push(window.setTimeout(() => {
      button.classList.remove('is-copied');
      button.setAttribute('aria-label', 'Copy link');
    }, 1800));
  };

  openFromHash();
  list.addEventListener('click', onCopy);
  window.addEventListener('hashchange', openFromHash);
  return () => {
    timers.forEach((timer) => window.clearTimeout(timer));
    list.removeEventListener('click', onCopy);
    window.removeEventListener('hashchange', openFromHash);
  };
};
