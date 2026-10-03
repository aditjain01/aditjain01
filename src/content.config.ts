import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const stage = z.enum(['In production', 'Partly built', 'Design study']);

const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    stage,
    role: z.string(),
    stack: z.array(z.string()),
    order: z.number(),
    diagram: z.string(),
    builtOn: z.string().optional(),
    demo: z.string().optional(),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(true),
    diagram: z.string().optional(),
  }),
});

export const collections = { work, writing };
