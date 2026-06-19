// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @param {import('mdast').Root} tree */
function remarkRewriteImages() {
	return (tree) => {
		walk(tree);
		/** @param {import('mdast').Root | import('mdast').Content} node */
		function walk(node) {
			if (node.type === 'image' && typeof node.url === 'string') {
				if (!/^https?:\/\//.test(node.url) && !node.url.startsWith('/')) {
					const filename = node.url.split('/').pop();
					node.url = `/images/${filename}`;
				}
			}
			if ('children' in node && Array.isArray(node.children)) {
				node.children.forEach(walk);
			}
		}
	};
}

// https://astro.build/config
// TODO: Replace SITE_URL in src/consts.ts and public/robots.txt when custom domain is ready.
export default defineConfig({
	site: 'https://ren-life-journal.vercel.app',
	integrations: [
		mdx(),
		sitemap({
			filter: (page) =>
				!page.includes('/admin-help') &&
				!page.includes('/admin') &&
				!page.includes('/japan'),
		}),
	],
	redirects: {
		'/blog': '/articles',
		'/blog/[...slug]': '/articles/[...slug]',
	},
	markdown: {
		remarkPlugins: [remarkRewriteImages],
	},
	vite: {
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
