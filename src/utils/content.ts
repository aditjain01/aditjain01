import { getCollection } from 'astro:content';
import { showDrafts } from './url';

export async function getWork() {
  return (await getCollection('work')).sort((a, b) => a.data.order - b.data.order);
}

export async function getWriting({ includeDrafts = showDrafts } = {}) {
  const all = await getCollection('writing');
  return all
    .filter((e) => includeDrafts || !e.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getDraftTitles() {
  return (await getCollection('writing')).filter((e) => e.data.draft).sort((a, b) => a.id.localeCompare(b.id));
}
