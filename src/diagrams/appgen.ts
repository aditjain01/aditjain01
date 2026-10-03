import type { DiagramData } from './types';

const x5 = (i: number) => 22 + i * 148; // w 124

export const appgen: DiagramData = {
  id: 'appgen',
  width: 760,
  height: 342,
  title: 'Internal app generator: prompt to hosted app, with a constrained scaffold and a semantic-layer proxy',
  caption:
    'Design study. Generation is bounded by an approved scaffold. A human review gate sits before hosting. Every query goes through a proxy that carries the viewer’s identity.',
  groups: [{ x: 14, y: 136, w: 374, h: 92, label: 'Constrained scaffold' }],
  nodes: [
    { id: 'prompt', x: x5(0), y: 48, w: 124, h: 56, title: 'Prompt', sub: 'the app request',
      note: 'A person describes the internal app they need, in plain language.' },
    { id: 'gen', x: x5(1), y: 48, w: 124, h: 56, title: 'Codegen', sub: 'spec, then code', ramp: 'teal',
      note: 'The model produces a rigid declarative spec first, then code against the scaffold. The spec is what gets reviewed.' },
    { id: 'prev', x: x5(2), y: 48, w: 124, h: 56, title: 'Preview', sub: 'sandboxed runtime',
      note: 'The generated app runs in isolation so the author can try it before anyone else sees it.' },
    { id: 'gate', x: x5(3), y: 48, w: 124, h: 56, title: 'Review gate', sub: 'human sign-off', ramp: 'teal',
      note: 'Nothing is hosted until a reviewer approves the spec, queries and any custom code.' },
    { id: 'host', x: x5(4), y: 48, w: 124, h: 56, title: 'Hosting', sub: 'central ownership',
      note: 'Approved apps are hosted centrally and owned by the platform team after launch, not left with the author.' },

    { id: 'lib', x: 28, y: 170, w: 170, h: 48, title: 'Component library', sub: 'approved parts only',
      note: 'Generated apps may only compose approved components, which keeps look, accessibility and behavior consistent.' },
    { id: 'sdk', x: 214, y: 170, w: 160, h: 48, title: 'Data-access SDK', sub: 'the only data path',
      note: 'Apps get data through one SDK. There are no direct connections and no credentials in app code.' },
    { id: 'hatch', x: 408, y: 170, w: 170, h: 48, title: 'Custom code', sub: 'sandboxed escape hatch',
      note: 'For what the components cannot express. Runs in a sandbox and gets extra scrutiny at the review gate.' },

    { id: 'proxy', x: 394, y: 262, w: 344, h: 56, title: 'Semantic-layer proxy', sub: 'viewer identity passthrough', ramp: 'teal',
      note: 'All queries go through the semantic layer as the viewer, so an app can never show someone data they could not query themselves.' },
    { id: 'wh', x: 22, y: 262, w: 200, h: 56, title: 'Governed warehouse', sub: 'masked data',
      note: 'The same governed data the rest of the platform uses.' },
  ],
  edges: [
    { from: 'prompt', to: 'gen' },
    { from: 'gen', to: 'prev' },
    { from: 'prev', to: 'gate' },
    { from: 'gate', to: 'host' },
    { from: 'lib', to: 'gen', fromSide: 't', toSide: 'b', fromAt: 0.9, toAt: 0.3 },
    { from: 'sdk', to: 'gen', fromSide: 't', toSide: 'b', fromAt: 0.4, toAt: 0.7 },
    { from: 'hatch', to: 'prev', fromSide: 't', toSide: 'b', fromAt: 0.5, toAt: 0.75 },
    { from: 'host', to: 'proxy', fromSide: 'b', toSide: 't', toAt: 0.82 },
    { from: 'proxy', to: 'wh', fromSide: 'l', toSide: 'r' },
  ],
};
