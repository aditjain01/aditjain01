import type { DEdge, DNode, Side } from './types';

type Pt = [number, number];

const anchor = (n: DNode, side: Side, at = 0.5): Pt => {
  switch (side) {
    case 't':
      return [n.x + n.w * at, n.y];
    case 'b':
      return [n.x + n.w * at, n.y + n.h];
    case 'l':
      return [n.x, n.y + n.h * at];
    case 'r':
      return [n.x + n.w, n.y + n.h * at];
  }
};

const vertical = (s: Side) => s === 't' || s === 'b';

function pickSides(a: DNode, b: DNode): [Side, Side] {
  if (b.y >= a.y + a.h) return ['b', 't'];
  if (b.y + b.h <= a.y) return ['t', 'b'];
  return b.x >= a.x + a.w ? ['r', 'l'] : ['l', 'r'];
}

/** Orthogonal polyline for an edge, with sharp corners. */
export function routeEdge(e: DEdge, a: DNode, b: DNode): Pt[] {
  const [autoFrom, autoTo] = e.under !== undefined ? (['b', 'b'] as Side[]) : pickSides(a, b);
  const fs = e.fromSide ?? autoFrom;
  const ts = e.toSide ?? autoTo;
  const p1 = anchor(a, fs, e.fromAt);
  const p2 = anchor(b, ts, e.toAt);

  if (e.under !== undefined) return [p1, [p1[0], e.under], [p2[0], e.under], p2];

  if (vertical(fs) && vertical(ts)) {
    if (Math.abs(p1[0] - p2[0]) < 0.5) return [p1, p2];
    const my = e.mid ?? (p1[1] + p2[1]) / 2;
    return [p1, [p1[0], my], [p2[0], my], p2];
  }
  if (!vertical(fs) && !vertical(ts)) {
    if (Math.abs(p1[1] - p2[1]) < 0.5) return [p1, p2];
    const mx = e.mid ?? (p1[0] + p2[0]) / 2;
    return [p1, [mx, p1[1]], [mx, p2[1]], p2];
  }
  return vertical(fs) ? [p1, [p1[0], p2[1]], p2] : [p1, [p2[0], p1[1]], p2];
}

export const toPath = (pts: Pt[]) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ');

/** Midpoint of the longest segment, for placing a label. */
export function labelPoint(pts: Pt[]): Pt {
  let best = 0;
  let bestLen = -1;
  for (let i = 0; i < pts.length - 1; i++) {
    const len = Math.abs(pts[i + 1][0] - pts[i][0]) + Math.abs(pts[i + 1][1] - pts[i][1]);
    if (len > bestLen) {
      bestLen = len;
      best = i;
    }
  }
  return [(pts[best][0] + pts[best + 1][0]) / 2, (pts[best][1] + pts[best + 1][1]) / 2];
}

/** Direction (unit) of the last segment, to orient arrowheads. */
export function endAngle(pts: Pt[], atStart = false): number {
  const [p, q] = atStart ? [pts[1], pts[0]] : [pts[pts.length - 2], pts[pts.length - 1]];
  return (Math.atan2(q[1] - p[1], q[0] - p[0]) * 180) / Math.PI;
}
