// The site's sections, in the order of its main menu.
export const SECTIONS = [
  { path: '/robulus', label: 'Robulus' },
  { path: '/domus', label: 'Domus' },
  { path: '/rnd', label: 'R&D' },
  { path: '/entertainment', label: 'Entertainment' },
  { path: '/economics', label: 'Economics' },
] as const;

export const currentPath = (url: URL): string => url.pathname.replace(/\/$/, '') || '/';
