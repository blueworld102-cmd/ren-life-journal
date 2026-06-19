import type { CollectionEntry } from 'astro:content';
import { siteBackgrounds } from '@/data/siteBackgrounds';
import { resolveImagePath } from './images';

export const DEFAULT_OG_IMAGE = siteBackgrounds.heroPrimary.src;
export const FALLBACK_COVER_IMAGE = siteBackgrounds.windowCafe.src;
export const FALLBACK_COVER_ALT = siteBackgrounds.windowCafe.alt;

export function normalizeCoverPosition(position?: string) {
	return position?.trim() || 'center';
}

export function formatArticleDate(date: Date) {
	const y = date.getFullYear();
	const m = String(date.getMonth() + 1).padStart(2, '0');
	const d = String(date.getDate()).padStart(2, '0');
	return `${y}.${m}.${d}`;
}

/** OG 用：僅在 cover 為點陣圖時使用，SVG 等改 fallback */
export function resolveOgImage(cover?: string) {
	const resolved = resolveImagePath(cover);
	if (resolved && /\.(png|jpe?g|webp|gif)(\?.*)?$/i.test(resolved)) {
		return resolved;
	}
	return DEFAULT_OG_IMAGE;
}

/** 文章頁封面：有 cover 用 cover，否則用 windowCafe */
export function resolveArticleCover(cover?: string) {
	const resolved = resolveImagePath(cover);
	if (resolved) {
		return { src: resolved, alt: undefined as string | undefined, isFallback: false };
	}
	return { src: FALLBACK_COVER_IMAGE, alt: FALLBACK_COVER_ALT, isFallback: true };
}

export function parseReadTime(readingTime?: string) {
	if (!readingTime) return undefined;
	const match = readingTime.match(/\d+/);
	return match ? Number(match[0]) : undefined;
}

export function inferTopic(location?: string) {
	if (!location) return '';
	if (/澳洲|雪梨|墨爾本|Australia|Sydney|Melbourne|Brisbane|Perth/i.test(location)) {
		return 'australia';
	}
	if (/日本|東京|鎌倉|Japan|Tokyo/i.test(location)) return 'japan';
	return '';
}

export function isJapanArticle(article: CollectionEntry<'articles'>) {
	const topic = inferTopic(article.data.location);
	return topic === 'japan' || topic === '';
}

export function getJapanArticles(articles: CollectionEntry<'articles'>[]) {
	return getPublishedArticles(articles).filter(isJapanArticle);
}

export function buildSearchText(data: CollectionEntry<'articles'>['data']) {
	return [
		data.title,
		data.description,
		data.category,
		data.location,
		data.weather,
		data.mood,
		data.season,
		...(data.tags ?? []),
		...(data.usefulFor ?? []),
	]
		.filter(Boolean)
		.join(' ')
		.toLowerCase();
}

export function toArticleCardProps(article: CollectionEntry<'articles'>) {
	const { data, id } = article;
	return {
		href: `/articles/${id}/`,
		title: data.title,
		description: data.description,
		cover: resolveImagePath(data.cover),
		coverPosition: normalizeCoverPosition(data.coverPosition),
		category: data.category,
		date: data.pubDate,
		readingTime: data.readingTime,
		location: data.location,
		weather: data.weather,
		mood: data.mood,
		tags: data.tags,
		searchText: buildSearchText(data),
		filterCategory: data.category,
		filterTags: data.tags.join(','),
		filterTopic: inferTopic(data.location),
	};
}

export function getPublishedArticles(articles: CollectionEntry<'articles'>[]) {
	return articles
		.filter((article) => !article.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function getAllTags(articles: CollectionEntry<'articles'>[]) {
	const tags = new Set<string>();
	for (const article of articles) {
		for (const tag of article.data.tags) tags.add(tag);
	}
	return [...tags].sort();
}

export function getAllCategories(articles: CollectionEntry<'articles'>[]) {
	const categories = new Set<string>();
	for (const article of articles) {
		categories.add(article.data.category);
	}
	return [...categories].sort();
}

export function getAdjacentArticles(
	articles: CollectionEntry<'articles'>[],
	currentId: string,
) {
	const sorted = getPublishedArticles(articles);
	const index = sorted.findIndex((article) => article.id === currentId);
	if (index === -1) return { prev: undefined, next: undefined };

	return {
		prev: index < sorted.length - 1 ? sorted[index + 1] : undefined,
		next: index > 0 ? sorted[index - 1] : undefined,
	};
}

export function getRelatedArticles(
	articles: CollectionEntry<'articles'>[],
	current: CollectionEntry<'articles'>,
	limit = 3,
) {
	const candidates = getPublishedArticles(articles).filter(
		(article) => article.id !== current.id,
	);

	const scored = candidates
		.map((article) => {
			let score = 0;
			if (article.data.category === current.data.category) score += 10;
			const sharedTags = article.data.tags.filter((tag) =>
				current.data.tags.includes(tag),
			);
			score += sharedTags.length * 3;
			return { article, score };
		})
		.filter((item) => item.score > 0)
		.sort((a, b) => {
			if (b.score !== a.score) return b.score - a.score;
			return b.article.data.pubDate.valueOf() - a.article.data.pubDate.valueOf();
		});

	return scored.slice(0, limit).map((item) => item.article);
}
