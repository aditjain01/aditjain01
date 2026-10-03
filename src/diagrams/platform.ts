import type { DiagramData } from './types';

// Four layers, top to bottom. Core platform callouts: runtime, semantic layer and
// warehouse, streaming layer, eval harness.
const x3 = (i: number) => 32 + i * 238; // w 220, gap 18
const x4 = (i: number) => 32 + i * 177; // w 165, gap 12

export const platform: DiagramData = {
  id: 'platform',
  width: 760,
  height: 484,
  title: 'Platform architecture in four layers inside a private network boundary',
  caption:
    'Four layers. Product surfaces sit on orchestration, which sits on domain context, which sits on a shared core. Everything runs inside a private network with masked data.',
  groups: [
    { x: 2, y: 2, w: 756, h: 480, label: 'Private network boundary, masked data', kind: 'boundary', labelBottom: true },
    { x: 14, y: 14, w: 732, h: 82, label: 'Product surface' },
    { x: 14, y: 106, w: 732, h: 82, label: 'Product orchestration' },
    { x: 14, y: 198, w: 732, h: 82, label: 'Domain' },
    { x: 14, y: 290, w: 732, h: 160, label: 'Core platform' },
  ],
  nodes: [
    { id: 's1', x: x3(0), y: 42, w: 220, h: 44, title: 'Conversational BI', sub: 'the core product', ramp: 'teal',
      note: 'Natural-language questions over governed data. Every other surface reuses what this one forces the platform to get right.' },
    { id: 's2', x: x3(1), y: 42, w: 220, h: 44, title: 'Other product surfaces', sub: 'thin UIs, same platform',
      note: 'Additional products are mostly orchestration and UI. They inherit runtime, data access, evals and analytics.' },
    { id: 's3', x: x3(2), y: 42, w: 220, h: 44, title: 'Streaming client', sub: 'resumes from last event',
      note: 'Clients subscribe to run events and can reconnect and replay without losing the answer in flight.' },

    { id: 'o1', x: x3(0), y: 134, w: 220, h: 44, title: 'Product agent graphs', sub: 'one graph per product',
      note: 'Each product composes its own agent graph from shared nodes and tools.' },
    { id: 'o2', x: x3(1), y: 134, w: 220, h: 44, title: 'NL-to-SQL flow', sub: 'semantic layer first',
      note: 'The model plans against the semantic layer, not raw tables. SQL is generated, checked and run through governed access.' },
    { id: 'o3', x: x3(2), y: 134, w: 220, h: 44, title: 'Run API client', sub: 'threads, runs, assistants',
      note: 'Products talk to a self-hosted run, thread and assistant API rather than a vendor service.' },

    { id: 'd1', x: x3(0), y: 226, w: 220, h: 44, title: 'Domain prompts and tools', sub: 'per-domain context',
      note: 'Domain knowledge is configuration on top of the core, so a new domain does not fork the runtime.' },
    { id: 'd2', x: x3(1), y: 226, w: 220, h: 44, title: 'Semantic models', sub: 'metrics, entities, joins',
      note: 'Business definitions live once, in the semantic layer, and every product reads the same numbers.' },
    { id: 'd3', x: x3(2), y: 226, w: 220, h: 44, title: 'Golden SQL datasets', sub: 'domain evaluation sets',
      note: 'Questions paired with reference SQL, owned by the domain and used by the eval harness.' },

    { id: 'c1', x: x4(0), y: 320, w: 165, h: 60, title: 'Streaming layer', sub: 'pub/sub, replayable events', ramp: 'teal',
      note: 'Run events are published to a fan-out layer and stored, so any client can attach late or replay.' },
    { id: 'c2', x: x4(1), y: 320, w: 165, h: 60, title: 'Agent runtime', sub: 'DB-backed checkpointer', ramp: 'teal',
      note: 'LangGraph with a custom database-backed checkpointer, exposed through a self-hosted run, thread and assistant API.' },
    { id: 'c3', x: x4(2), y: 320, w: 165, h: 60, title: 'Semantic layer', sub: 'and masked warehouse', ramp: 'teal',
      note: 'Governed definitions over a warehouse with masked data. The model never needs raw access.' },
    { id: 'c4', x: x4(3), y: 320, w: 165, h: 60, title: 'Eval harness', sub: 'golden SQL, LLM judge', ramp: 'teal',
      note: 'Execution-based comparison against golden SQL plus an LLM judge for answers. Gates changes to prompts, tools and models.' },

    { id: 'x1', x: x3(0), y: 392, w: 220, h: 44, title: 'Observability', sub: 'OpenTelemetry traces',
      note: 'Traces across the run, tool calls and model calls, so a bad answer can be explained.' },
    { id: 'x2', x: x3(1), y: 392, w: 220, h: 44, title: 'Agent memory', sub: 'five types, vector search',
      note: 'Five memory types backed by vector search on the relational store.' },
    { id: 'x3', x: x3(2), y: 392, w: 220, h: 44, title: 'Tools and MCP', sub: 'delegated OAuth',
      note: 'Remote tools over MCP, authorized with delegated OAuth so tools act with the user’s own permissions.' },
  ],
  edges: [
    { from: 's1', to: 'o1', fromAt: 0.85, toAt: 0.85 },
    { from: 's3', to: 'o3' },
    { from: 'o1', to: 'd1', fromAt: 0.85, toAt: 0.85 },
    { from: 'o2', to: 'd2' },
    { from: 'd1', to: 'c2', fromAt: 0.85 },
    { from: 'd2', to: 'c3' },
    { from: 'd3', to: 'c4' },
    { from: 'c2', to: 'c1' },
    { from: 'c2', to: 'c3' },
  ],
};
