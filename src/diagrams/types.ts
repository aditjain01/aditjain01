export type Side = 't' | 'b' | 'l' | 'r';

export interface DNode {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  /** At most five words. */
  sub?: string;
  ramp?: 'teal' | 'gray';
  /** Short note revealed on hover, focus or click. */
  note?: string;
}

export interface DEdge {
  from: string;
  to: string;
  fromSide?: Side;
  toSide?: Side;
  /** Position along the side, 0 to 1. Default 0.5. */
  fromAt?: number;
  toAt?: number;
  label?: string;
  dashed?: boolean;
  bidir?: boolean;
  /** Override the elbow midpoint (y for vertical routes, x for horizontal). */
  mid?: number;
  /** Route b -> b underneath both nodes at this y. */
  under?: number;
}

export interface DGroup {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  kind?: 'layer' | 'boundary';
  /** Put the label at the bottom-left (used for boundaries). */
  labelBottom?: boolean;
}

export interface DiagramData {
  id: string;
  width: number;
  height: number;
  title: string;
  caption: string;
  groups?: DGroup[];
  nodes: DNode[];
  edges?: DEdge[];
}
