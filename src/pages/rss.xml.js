import rss from '@astrojs/rss';
import { getWriting } from '../utils/content';
import { site } from '../data/site';
import { url } from '../utils/url';

export async function GET(context) {
  const notes = await getWriting();
  return rss({
    title: `${site.name}, writing`,
    description: 'Technical notes on building production agent systems.',
    site: context.site,
    items: notes.map((n) => ({
      title: n.data.title,
      description: n.data.summary,
      pubDate: n.data.date,
      link: url(`/writing/${n.data.slug}`),
    })),
  });
}
