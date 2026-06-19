import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_SUBTITLE, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = (await getCollection('articles'))
		.filter((post) => !post.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

	return rss({
		title: SITE_TITLE,
		description: `${SITE_SUBTITLE} — ${SITE_DESCRIPTION}`,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/articles/${post.id}/`,
			categories: [post.data.category, ...post.data.tags],
		})),
	});
}
