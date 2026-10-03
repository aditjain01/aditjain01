import type { APIRoute, GetStaticPaths } from 'astro';
import sharp from 'sharp';
import { getWork, getWriting } from '../../utils/content';
import { site } from '../../data/site';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function wrap(text: string, max: number, lines: number): string[] {
  const out: string[] = [];
  let cur = '';
  for (const word of text.split(/\s+/)) {
    if ((cur + ' ' + word).trim().length > max) {
      out.push(cur);
      cur = word;
    } else {
      cur = (cur + ' ' + word).trim();
    }
  }
  if (cur) out.push(cur);
  return out.slice(0, lines);
}

export const getStaticPaths = (async () => {
  const work = await getWork();
  const writing = await getWriting();
  return [
    { params: { route: 'default' }, props: { title: 'I build production agent systems and the infrastructure under them.', kicker: site.name } },
    ...work.map((e) => ({ params: { route: `work/${e.data.slug}` }, props: { title: e.data.title, kicker: `${e.data.stage} · case study` } })),
    ...writing.map((e) => ({ params: { route: `writing/${e.data.slug}` }, props: { title: e.data.title, kicker: 'Writing' } })),
  ];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { title, kicker } = props as { title: string; kicker: string };
  const lines = wrap(title, 28, 4);
  const tspans = lines.map((l, i) => `<tspan x="80" dy="${i === 0 ? 0 : 76}">${esc(l)}</tspan>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#faf7f2"/>
  <rect x="80" y="80" width="64" height="6" fill="#0f766e"/>
  <text x="80" y="140" font-family="monospace" font-size="26" fill="#5c5a53">${esc(kicker)}</text>
  <text x="80" y="260" font-family="serif" font-weight="bold" font-size="64" fill="#1b1a17">${tspans}</text>
  <text x="80" y="570" font-family="monospace" font-size="26" fill="#5c5a53">${esc(site.name)}</text>
</svg>`;
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
