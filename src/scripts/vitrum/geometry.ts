// Neon Vitrum geometry: the Deck's roundedPath.ts and Juvantia Auth's geometry.ts.
export const PANEL_RADIUS = 14;
export const TAB_STEP = 9;
export const TAB_AFTER_TITLE = 22;

export type Vertex = [x: number, y: number, radius: number];

export const roundedPath = (vertices: Vertex[]): string => {
  const count = vertices.length;
  const segments = vertices.map(([x, y, radius], index) => {
    const [px, py] = vertices[(index - 1 + count) % count];
    const [nx, ny] = vertices[(index + 1) % count];
    const inLength = Math.hypot(x - px, y - py) || 1;
    const outLength = Math.hypot(nx - x, ny - y) || 1;
    const inRadius = Math.min(radius, inLength / 2);
    const outRadius = Math.min(radius, outLength / 2);
    const sx = x - ((x - px) / inLength) * inRadius;
    const sy = y - ((y - py) / inLength) * inRadius;
    const ex = x + ((nx - x) / outLength) * outRadius;
    const ey = y + ((ny - y) / outLength) * outRadius;
    return `${index === 0 ? 'M' : 'L'}${sx.toFixed(2)} ${sy.toFixed(2)}Q${x.toFixed(2)} ${y.toFixed(2)} ${ex.toFixed(2)} ${ey.toFixed(2)}`;
  });
  return `${segments.join('')}Z`;
};

export const keyPath = (width: number, height: number, inset: number, radius: number): string => roundedPath([
  [inset, inset, radius],
  [width - inset, inset, radius],
  [width - inset, height - inset, radius],
  [inset, height - inset, radius],
]);

// The Deck's control: two chamfered facets, top left and bottom right. On taller keys the facet grows with them.
export const chamferedPath = (width: number, height: number, inset: number): string => {
  const facet = Math.max(12, Math.min(20, Math.round(height * 0.18)));
  const radius = 6;
  const facetRadius = 1.5;
  return roundedPath([
    [inset, inset + facet, facetRadius],
    [inset + facet, inset, facetRadius],
    [width - inset, inset, radius],
    [width - inset, height - inset - facet, facetRadius],
    [width - inset - facet, height - inset, facetRadius],
    [inset, height - inset, radius],
  ]);
};

export interface TabShape {
  // The raised tab's run along the top edge, measured from the plate's left edge; a first tab starts at 0.
  from: number;
  to: number;
  // 1 is a raised tab, 0 has sunk into the plate (SINK & RISE).
  rise: number;
}

// The Civitas silhouette: a raised tab holds the title, the foot drops at 42 % of the width.
export const panelPath = (width: number, height: number, tab: TabShape, foot: number, inset: number): string => {
  const i = inset;
  const s = TAB_STEP;
  const r = Math.max(0, Math.min(1, tab.rise));
  const low = i + s;
  const top = i + s * (1 - r);
  const head: Vertex[] = [];
  if (r < 0.001) {
    head.push([i, low, PANEL_RADIUS]);
  } else if (tab.from <= 0) {
    head.push([i, top, PANEL_RADIUS], [tab.to, top, 6], [tab.to + s * r, low, 6]);
  } else {
    head.push([i, low, PANEL_RADIUS], [tab.from - s * r, low, 6], [tab.from, top, 6], [tab.to, top, 6], [tab.to + s * r, low, 6]);
  }
  return roundedPath([
    ...head,
    [width - i, low, PANEL_RADIUS],
    [width - i, height - i, PANEL_RADIUS],
    [foot, height - i, 6],
    [foot - s, height - i - s, 6],
    [i, height - i - s, PANEL_RADIUS],
  ]);
};

// How far an element's box sits from an ancestor's left edge, ignoring transforms (an entrance's lift).
export const offsetWithin = (node: HTMLElement, ancestor: HTMLElement): number => {
  let left = 0;
  for (let at: HTMLElement | null = node; at && at !== ancestor; at = at.offsetParent as HTMLElement | null) {
    left += at.offsetLeft;
  }
  return left;
};
