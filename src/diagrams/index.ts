import type { DiagramData } from './types';
import { platform } from './platform';
import { workspaces } from './workspaces';
import { competescan } from './competescan';
import { nadihms } from './nadihms';
import { appgen } from './appgen';
import { memory } from './memory';
import { citations } from './citations';

const all: DiagramData[] = [platform, workspaces, competescan, nadihms, appgen, memory, citations];
const registry = new Map(all.map((d) => [d.id, d]));

export function getDiagram(id: string): DiagramData {
  const d = registry.get(id);
  if (!d) throw new Error(`Unknown diagram "${id}"`);
  return d;
}
