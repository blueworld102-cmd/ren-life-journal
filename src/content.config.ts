import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
	loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),

		category: z.enum([
			'日本生活',
			'日本生活手續',
			'打工度假',
			'東京散步',
			'旅遊紀錄',
			'省錢生活',
			'工作與職涯',
			'心情筆記',
		]),

		tags: z.array(z.string()),

		location: z.string().optional(),
		weather: z.string().optional(),
		mood: z.string().optional(),
		season: z.string().optional(),

		cover: z.string().optional(),
		coverPosition: z.string().optional(),
		readingTime: z.string().optional(),

		cost: z.number().optional(),
		difficulty: z.enum(['低', '中', '高']).optional(),

		usefulFor: z.array(z.string()).optional(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { articles };
