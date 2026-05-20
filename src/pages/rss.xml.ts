import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return rss({
    title: 'Blog ConstruHomesCR',
    description:
      'Guías sobre construcción residencial, costos, permisos e inversión turística en La Fortuna y zona norte de Costa Rica.',
    site: context.site!,
    items: posts
      .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/blog/${post.id.replace(/\.mdx$/, '')}/`,
        categories: [post.data.category, ...post.data.tags],
      })),
    customData: '<language>es-CR</language>',
  });
}
