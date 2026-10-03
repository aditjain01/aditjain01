import type { DiagramData } from './types';

export const competescan: DiagramData = {
  id: 'competescan',
  width: 760,
  height: 336,
  title: 'CompeteScan pipeline: capture, score, analyze, with a citation path back to sources',
  caption:
    'Signals are captured and tagged, deduplicated in three tiers, scored with organizational context, and stored as cited insights. Chat answers tie back to the original sources.',
  groups: [
    { x: 14, y: 14, w: 224, h: 312, label: 'Capture' },
    { x: 262, y: 14, w: 224, h: 312, label: 'Score' },
    { x: 510, y: 14, w: 236, h: 312, label: 'Analyze' },
  ],
  nodes: [
    { id: 'news', x: 34, y: 44, w: 56, h: 40, title: 'News', note: 'Public news about competitors and the market.' },
    { id: 'feeds', x: 98, y: 44, w: 56, h: 40, title: 'Feeds', note: 'Subscribed feeds and monitored pages.' },
    { id: 'docs', x: 162, y: 44, w: 56, h: 40, title: 'Uploads', note: 'Documents users upload, such as decks and reports.' },
    { id: 'tag', x: 34, y: 112, w: 184, h: 46, title: 'Tag at capture', sub: 'time, market, competitor',
      note: 'Each signal is tagged by time, market, competitor and audience scope when it arrives, so later filtering is cheap and exact.' },
    { id: 'raw', x: 34, y: 188, w: 184, h: 56, title: 'Raw store', sub: 'content-hash dedup', ramp: 'teal',
      note: 'Tier one of dedup: identical content is dropped by hash. The original is kept so every claim can be traced back.' },

    { id: 'emb', x: 282, y: 48, w: 184, h: 52, title: 'Embedding dedup', sub: 'tier two, near-duplicates',
      note: 'Tier two: near-duplicate stories are grouped by embedding similarity so one event is analyzed once.' },
    { id: 'score', x: 282, y: 130, w: 184, h: 52, title: 'Scoring', sub: 'weighted formula', ramp: 'teal',
      note: 'A transparent formula ranks signals, so an analyst can see why something surfaced.' },
    { id: 'org', x: 282, y: 212, w: 184, h: 52, title: 'Organizational context', sub: 'enriches before scoring',
      note: 'Context about the organization changes what matters: the same news scores differently for different audiences.' },

    { id: 'nar', x: 530, y: 48, w: 196, h: 52, title: 'LLM narration', sub: 'tier three, fixed topics',
      note: 'Tier three: the model narrates what is new against what is known, using a controlled topic vocabulary so diffs stay stable.' },
    { id: 'ins', x: 530, y: 130, w: 196, h: 52, title: 'Insight store', sub: 'cited, queryable', ramp: 'teal',
      note: 'Insights carry structured citations to source records. Volume lands near fifteen to twenty a day.' },
    { id: 'chat', x: 530, y: 212, w: 196, h: 52, title: 'Chat deep-dive', sub: 'scoped per message', ramp: 'teal',
      note: 'Questions are answered over the original sources, with the allowed source set fixed for each message.' },
  ],
  edges: [
    { from: 'news', to: 'tag', fromAt: 0.5, toAt: 0.15 },
    { from: 'feeds', to: 'tag' },
    { from: 'docs', to: 'tag', fromAt: 0.5, toAt: 0.85 },
    { from: 'tag', to: 'raw' },
    { from: 'raw', to: 'emb', fromSide: 'r', toSide: 'l', fromAt: 0.5, toAt: 0.5, mid: 250 },
    { from: 'emb', to: 'score' },
    { from: 'org', to: 'score' },
    { from: 'score', to: 'nar', fromSide: 'r', toSide: 'l', fromAt: 0.5, toAt: 0.5, mid: 498 },
    { from: 'nar', to: 'ins' },
    { from: 'ins', to: 'chat' },
    { from: 'chat', to: 'raw', under: 296, dashed: true, label: 'citations tie back to sources' },
  ],
};
