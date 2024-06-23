// astro.config.mjs
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  buildOptions: {
    site: 'https://your-astro-site.com',
  },
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  },
  integrations: [],
});
