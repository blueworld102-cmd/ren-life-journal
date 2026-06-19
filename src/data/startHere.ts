import { siteBackgrounds } from './siteBackgrounds';

export type StartHereItem = {
	title: string;
	description: string;
	href: string;
	linkLabel: string;
	image: string;
	imageAlt: string;
};

export const startHereItems: StartHereItem[] = [
	{
		title: '第一次來日本',
		description:
			'從區役所、健保、年金到生活手續，把剛抵達日本時最容易慌張的事情慢慢整理起來。',
		href: '/articles?category=日本生活手續',
		linkLabel: '讀生活手續',
		image: siteBackgrounds.travelDesk.src,
		imageAlt: siteBackgrounds.travelDesk.alt,
	},
	{
		title: '正在找工作',
		description:
			'打工度假的履歷、面試、排班、職場日文，以及那些在異鄉找工作時的不安。',
		href: '/articles?category=打工度假',
		linkLabel: '讀打工筆記',
		image: siteBackgrounds.windowTrain.src,
		imageAlt: siteBackgrounds.windowTrain.alt,
	},
	{
		title: '在東京慢慢生活',
		description:
			'雨天散步、咖啡廳、超市、自炊與一個人的休假日。不是攻略，是生活本身。',
		href: '/articles?category=東京散步',
		linkLabel: '讀東京日常',
		image: siteBackgrounds.windowCafe.src,
		imageAlt: siteBackgrounds.windowCafe.alt,
	},
];
