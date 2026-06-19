import { siteCopy } from './data/siteCopy';
import { siteProfile } from './data/siteProfile';

export { siteCopy } from './data/siteCopy';
export { siteProfile } from './data/siteProfile';

export const SITE_TITLE = siteProfile.siteTitle;
export const SITE_SUBTITLE = siteProfile.siteSubtitle;
export const SITE_DESCRIPTION = siteProfile.siteDescription;

/** 與 astro.config.mjs 的 `site` 保持同步。TODO: 正式 domain 確定後請一併更新。 */
export const SITE_URL = 'https://ren-life-journal.vercel.app';

export const JAPAN_TOPIC_LABEL = siteProfile.currentChapter;
export const JAPAN_TOPIC_LABEL_ZH = siteProfile.currentChapterZh;

export const HERO_TITLE = siteCopy.heroTitle;
export const HERO_SUBTITLE = siteCopy.heroSubtitle;
export const HERO_CTA_LABEL = siteCopy.heroCtaLabel;

export const INDEX_LEAD = siteCopy.indexLead;

export const FEATURED_CATEGORIES = [
	{
		title: '日本生活手續',
		description: '區役所、健保、年金、銀行、手機',
		link: '/articles?category=日本生活手續',
	},
	{
		title: '打工度假',
		description: '簽證、履歷、面試、工作、收入',
		link: '/articles?category=打工度假',
	},
	{
		title: '東京散步',
		description: '原宿、澀谷、新宿、神社、咖啡廳',
		link: '/articles?category=東京散步',
	},
	{
		title: '省錢生活',
		description: '超市、自炊、交通費、生活成本',
		link: '/articles?category=省錢生活',
	},
	{
		title: '心情筆記',
		description: '一個人生活、焦慮、自由、重新開始',
		link: '/articles?category=心情筆記',
	},
] as const;
