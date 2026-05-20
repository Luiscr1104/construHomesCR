import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(10).max(70),
      description: z.string().min(120).max(170),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image(),
      heroImageAlt: z.string(),
      author: z.string().default('ConstruHomesCR'),
      category: z.enum(['costos', 'permisos', 'inversion', 'modelos', 'zona', 'guias']),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      keyword: z.string(),
      faqJsonLd: z
        .array(z.object({ q: z.string(), a: z.string() }))
        .optional(),
    }),
});

export const collections = { blog };
