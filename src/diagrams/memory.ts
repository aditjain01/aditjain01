import type { DiagramData } from './types';

export const memory: DiagramData = {
  id: 'memory',
  width: 760,
  height: 300,
  title: 'Agent memory: write path and read path over one relational store with vector search',
  caption: 'One store, two paths. Writes extract and classify. Reads filter by type and scope, then rank by similarity.',
  groups: [
    { x: 14, y: 14, w: 232, h: 272, label: 'Write path' },
    { x: 274, y: 14, w: 212, h: 272, label: 'One relational store' },
    { x: 514, y: 14, w: 232, h: 272, label: 'Read path' },
  ],
  nodes: [
    { id: 'conv', x: 34, y: 48, w: 192, h: 48, title: 'Conversation turn', sub: 'what just happened', note: 'Memory is written from what happened in a run, not from a separate form.' },
    { id: 'ext', x: 34, y: 124, w: 192, h: 48, title: 'Extract and classify', sub: 'pick a type, or skip', ramp: 'teal', note: 'Most turns write nothing. Writing everything is how memory turns into noise.' },
    { id: 'emb', x: 34, y: 200, w: 192, h: 48, title: 'Embed', sub: 'one vector per memory', note: 'Each memory is embedded once at write time.' },

    { id: 'tbl', x: 294, y: 48, w: 172, h: 76, title: 'Memories table', sub: 'text, type, scope, vector', ramp: 'teal', note: 'Structured columns for type, owner and scope sit next to the vector, so one query can filter and rank.' },
    { id: 'idx', x: 294, y: 160, w: 172, h: 60, title: 'Vector index', sub: 'in the same database', note: 'A vector index on the relational store. No second system to keep consistent.' },

    { id: 'q', x: 534, y: 48, w: 192, h: 48, title: 'Query and embed', sub: 'current turn', note: 'The current request is embedded with the same model.' },
    { id: 'flt', x: 534, y: 124, w: 192, h: 48, title: 'Filter, then rank', sub: 'type, scope, similarity', ramp: 'teal', note: 'Relational filters first, vector similarity second, so scope rules are enforced by the database.' },
    { id: 'ctx', x: 534, y: 200, w: 192, h: 48, title: 'Prompt context', sub: 'small, typed, cited', note: 'A small, labeled set goes into the prompt, with the memory type visible to the model.' },
  ],
  edges: [
    { from: 'conv', to: 'ext' },
    { from: 'ext', to: 'emb' },
    { from: 'emb', to: 'tbl', fromSide: 'r', toSide: 'l', mid: 260 },
    { from: 'tbl', to: 'idx' },
    { from: 'q', to: 'flt' },
    { from: 'flt', to: 'ctx' },
    { from: 'flt', to: 'idx', fromSide: 'l', toSide: 'r' },
  ],
};
