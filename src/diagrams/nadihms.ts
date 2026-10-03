import type { DiagramData } from './types';

export const nadihms: DiagramData = {
  id: 'nadihms',
  width: 760,
  height: 322,
  title: 'NadiHMS design: offline-first PWA, voice extraction pipeline with manual fallback, sync, FHIR-aligned model',
  caption:
    'Design study. The clinic device works without a connection. Voice becomes a structured encounter, with manual entry always available. Sync feeds a FHIR-aligned model.',
  groups: [
    { x: 14, y: 14, w: 380, h: 292, label: 'Clinic device, offline-first PWA' },
    { x: 434, y: 14, w: 312, h: 292, label: 'Cloud' },
  ],
  nodes: [
    { id: 'voice', x: 34, y: 48, w: 160, h: 52, title: 'Voice capture', sub: 'doctor speaks naturally',
      note: 'The consultation is the interface. Nothing is typed during the conversation.' },
    { id: 'asr', x: 214, y: 48, w: 160, h: 52, title: 'Transcription', sub: 'speech to text',
      note: 'Speech to text tuned for the languages and accents of the clinic.' },
    { id: 'manual', x: 34, y: 140, w: 160, h: 52, title: 'Manual entry', sub: 'always-available fallback',
      note: 'If transcription or extraction fails or confidence is low, a plain form takes over. The doctor is never blocked.' },
    { id: 'extract', x: 214, y: 140, w: 160, h: 52, title: 'Extraction', sub: 'structured fields', ramp: 'teal',
      note: 'Turns the transcript into encounter fields for the doctor to confirm, not silently accept.' },
    { id: 'local', x: 34, y: 232, w: 340, h: 56, title: 'Local store', sub: 'works with no connection', ramp: 'teal',
      note: 'Everything is written locally first. Connectivity is an optimization, not a dependency.' },

    { id: 'std', x: 454, y: 48, w: 272, h: 52, title: 'Standards', sub: 'FHIR R4, national health mission',
      note: 'Aligned to FHIR R4 and India’s national digital health mission so records can move between systems.' },
    { id: 'fhir', x: 454, y: 140, w: 272, h: 52, title: 'FHIR-aligned data model', sub: 'seven domains, encounter at center', ramp: 'teal',
      note: 'Seven domains with the encounter as the center. Every other record relates to a visit.' },
    { id: 'sync', x: 454, y: 232, w: 272, h: 56, title: 'Sync layer', sub: 'queue, retry, merge', ramp: 'teal',
      note: 'Reconciles local writes with the cloud when a connection exists, without losing edits made offline.' },
  ],
  edges: [
    { from: 'voice', to: 'asr' },
    { from: 'asr', to: 'extract' },
    { from: 'extract', to: 'manual', fromSide: 'l', toSide: 'r', dashed: true },
    { from: 'extract', to: 'local', fromSide: 'b', toSide: 't', fromAt: 0.5, toAt: 0.82 },
    { from: 'manual', to: 'local', fromSide: 'b', toSide: 't', fromAt: 0.5, toAt: 0.18 },
    { from: 'local', to: 'sync', fromSide: 'r', toSide: 'l', bidir: true },
    { from: 'sync', to: 'fhir' },
    { from: 'std', to: 'fhir' },
  ],
};
