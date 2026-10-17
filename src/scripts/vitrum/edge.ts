// A hairline rim drawn around a measured surface: the gradient catches the corners, green top left, cyan bottom right.
const SVGNS = 'http://www.w3.org/2000/svg';
const EDGE_BLEED = 16;
const EDGE_STOPS: [offset: number, color: string, opacity: number][] = [
  [0, '#00ff88', 0.42],
  [0.24, '#d2e6de', 0.17],
  [0.5, '#ffffff', 0.13],
  [0.76, '#d0e2e8', 0.17],
  [1, '#00d4ff', 0.46],
];

export interface EdgeLayer {
  width: number;
  color?: string;
  opacity?: number;
  normalized?: boolean;
}

interface EdgeParts {
  gradient: SVGLinearGradientElement;
  paths: SVGPathElement[];
}

const parts = new WeakMap<SVGSVGElement, EdgeParts>();
let uid = 0;

export const createEdge = (className: string, layers: EdgeLayer[]): SVGSVGElement => {
  const svg = document.createElementNS(SVGNS, 'svg');
  svg.setAttribute('class', className);
  svg.setAttribute('aria-hidden', 'true');
  const defs = document.createElementNS(SVGNS, 'defs');
  const gradient = document.createElementNS(SVGNS, 'linearGradient');
  gradient.id = `vt-edge-${++uid}`;
  gradient.setAttribute('gradientUnits', 'userSpaceOnUse');
  gradient.setAttribute('x1', '0');
  gradient.setAttribute('y1', '0');
  defs.append(gradient);
  svg.append(defs);
  const paths = layers.map((layer) => {
    const path = document.createElementNS(SVGNS, 'path');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-width', String(layer.width));
    path.setAttribute('stroke', layer.color ?? `url(#${gradient.id})`);
    if (layer.normalized) path.setAttribute('pathLength', '1');
    if (layer.opacity) path.setAttribute('stroke-opacity', String(layer.opacity));
    svg.append(path);
    return path;
  });
  parts.set(svg, { gradient, paths });
  return svg;
};

export const updateEdge = (svg: SVGSVGElement, width: number, height: number, d: string, gain: number): void => {
  const edge = parts.get(svg);
  if (!edge) return;
  const w = width + EDGE_BLEED * 2;
  const h = height + EDGE_BLEED * 2;
  svg.setAttribute('width', String(w));
  svg.setAttribute('height', String(h));
  svg.setAttribute('viewBox', `${-EDGE_BLEED} ${-EDGE_BLEED} ${w} ${h}`);
  svg.style.top = `${-EDGE_BLEED}px`;
  svg.style.left = `${-EDGE_BLEED}px`;
  edge.gradient.setAttribute('x2', String(width));
  edge.gradient.setAttribute('y2', String(height));
  edge.gradient.replaceChildren(...EDGE_STOPS.map(([offset, color, opacity]) => {
    const stop = document.createElementNS(SVGNS, 'stop');
    stop.setAttribute('offset', String(offset));
    stop.setAttribute('stop-color', color);
    stop.setAttribute('stop-opacity', Math.min(1, opacity * gain).toFixed(3));
    return stop;
  }));
  edge.paths.forEach((path) => path.setAttribute('d', d));
};
