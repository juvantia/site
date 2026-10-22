// Forum's button menu, positioned in the top layer so the plate cannot clip it.
export const mountDownloadMenu = (root: HTMLElement): (() => void) => {
  const trigger = root.querySelector<HTMLButtonElement>('[popovertarget]');
  const menu = root.querySelector<HTMLElement>('[popover]');
  if (!trigger || !menu) return () => {};

  const items = Array.from(menu.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]'));
  const isOpen = () => menu.matches(':popover-open');
  let focusLast = false;

  const position = () => {
    const rect = trigger.getBoundingClientRect();
    const inset = 16;
    const gap = 10;
    const width = Math.min(rect.width, document.documentElement.clientWidth - inset * 2);
    menu.style.width = `${width}px`;
    const height = menu.scrollHeight + menu.offsetHeight - menu.clientHeight || 108;
    const below = window.innerHeight - rect.bottom - gap - inset;
    const above = rect.top - gap - inset;
    const upwards = below < height && above > below;
    const room = Math.max(0, upwards ? above : below);
    menu.style.maxHeight = `${room}px`;
    menu.style.left = `${Math.max(inset, Math.min(rect.left, window.innerWidth - width - inset))}px`;
    menu.style.top = `${Math.max(inset, upwards ? rect.top - gap - Math.min(height, room) : rect.bottom + gap)}px`;
  };

  const prepare = (event: Event) => {
    if ((event as ToggleEvent).newState === 'open') position();
  };
  const sync = () => {
    const open = isOpen();
    trigger.setAttribute('aria-expanded', String(open));
    if (open) {
      position();
      items[focusLast ? items.length - 1 : 0]?.focus({ preventScroll: true });
    }
    focusLast = false;
  };
  const follow = () => {
    if (!isOpen()) return;
    const rect = trigger.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) menu.hidePopover();
    else position();
  };
  const triggerKeys = (event: KeyboardEvent) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    focusLast = event.key === 'ArrowUp';
    if (!isOpen()) menu.showPopover();
    else {
      items[focusLast ? items.length - 1 : 0]?.focus({ preventScroll: true });
      focusLast = false;
    }
  };
  const menuKeys = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      menu.hidePopover();
      trigger.focus({ preventScroll: true });
      return;
    }
    const index = items.indexOf(document.activeElement as HTMLAnchorElement);
    let next: number;
    if (event.key === 'ArrowDown') next = (index + 1) % items.length;
    else if (event.key === 'ArrowUp') next = (index - 1 + items.length) % items.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = items.length - 1;
    else return;
    event.preventDefault();
    items[next]?.focus({ preventScroll: true });
  };
  const choose = (event: MouseEvent) => {
    if (event.target instanceof Element && event.target.closest('[role="menuitem"]')) menu.hidePopover();
  };

  menu.addEventListener('beforetoggle', prepare);
  menu.addEventListener('toggle', sync);
  menu.addEventListener('keydown', menuKeys);
  menu.addEventListener('click', choose);
  trigger.addEventListener('keydown', triggerKeys);
  window.addEventListener('resize', follow);
  document.addEventListener('scroll', follow, { capture: true, passive: true });
  trigger.setAttribute('aria-expanded', String(isOpen()));

  return () => {
    if (isOpen()) menu.hidePopover();
    trigger.setAttribute('aria-expanded', 'false');
    menu.removeEventListener('beforetoggle', prepare);
    menu.removeEventListener('toggle', sync);
    menu.removeEventListener('keydown', menuKeys);
    menu.removeEventListener('click', choose);
    trigger.removeEventListener('keydown', triggerKeys);
    window.removeEventListener('resize', follow);
    document.removeEventListener('scroll', follow, true);
  };
};
