import type { DiagramData } from './types';

export const citations: DiagramData = {
  id: 'citations',
  width: 760,
  height: 252,
  title: 'Citation architecture: sources, per-message scope, schema-constrained output, validator, tie-back',
  caption: 'The model can only cite what is in scope, and the schema makes a citation a data field instead of prose.',
  nodes: [
    { id: 'src', x: 20, y: 40, w: 124, h: 56, title: 'Sources', sub: 'stable ids', note: 'Every source record has a stable id that outlives the conversation.' },
    { id: 'scope', x: 164, y: 40, w: 124, h: 56, title: 'Message scope', sub: 'allowed ids only', ramp: 'teal', note: 'Scope is decided for each message before the model runs. It is the allow-list.' },
    { id: 'llm', x: 308, y: 40, w: 124, h: 56, title: 'Model', sub: 'schema-constrained', ramp: 'teal', note: 'Structured output with a schema in which each claim carries source ids as a field.' },
    { id: 'val', x: 452, y: 40, w: 124, h: 56, title: 'Validator', sub: 'ids must be in scope', note: 'A plain check, no model involved. Unknown or out-of-scope ids fail and trigger a retry.' },
    { id: 'ui', x: 596, y: 40, w: 124, h: 56, title: 'Answer', sub: 'citations as links', note: 'The interface renders citation markers from fields, not by parsing prose.' },
    { id: 'orig', x: 596, y: 156, w: 124, h: 56, title: 'Original source', sub: 'one click away', ramp: 'teal', note: 'A citation resolves deterministically to the exact stored source record.' },
  ],
  edges: [
    { from: 'src', to: 'scope' },
    { from: 'scope', to: 'llm' },
    { from: 'llm', to: 'val' },
    { from: 'val', to: 'ui' },
    { from: 'val', to: 'llm', under: 128, dashed: true, label: 'retry on invalid id' },
    { from: 'ui', to: 'orig' },
  ],
};
