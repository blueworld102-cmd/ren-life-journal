import { siteBackgrounds } from './siteBackgrounds';

export type PhotoItem = {
	title: string;
	image: string;
	date: string;
	location: string;
	weather: string;
	mood: string;
	tags: string[];
	alt: string;
	relatedPost?: string;
	imagePosition?: string;
};

/** 照片牆完整清單。首頁預覽取前 6 張。 */
export const PHOTOS: PhotoItem[] = [
	{
		title: '雨天窗邊的東京鐵塔',
		image: siteBackgrounds.heroPrimary.src,
		date: '2026-06-19',
		location: '東京・澀谷',
		weather: '雨',
		mood: '緊張但有一點安心',
		tags: ['雨天', '澀谷', '窗邊'],
		alt: siteBackgrounds.heroPrimary.alt,
		relatedPost: '/articles/shibuya-ward-office-rainy-day',
		imagePosition: 'center',
	},
	{
		title: '原宿雨天的街道',
		image: '/images/photos/harajuku-rain.svg',
		date: '2025-08-03',
		location: '東京・原宿',
		weather: '雨',
		mood: '平靜',
		tags: ['原宿', '雨天', '散步'],
		alt: '原宿雨天街道，路面倒映霓虹招牌',
		relatedPost: '/articles/harajuku-rainy-walk',
	},
	{
		title: '咖啡廳窗邊',
		image: '/images/photos/cafe-corner.svg',
		date: '2025-10-12',
		location: '東京・表參道',
		weather: '晴',
		mood: '慢慢來',
		tags: ['咖啡廳', '窗邊', '午後'],
		alt: '咖啡廳窗邊座位，窗外是表參道街景',
	},
	{
		title: '超市補貨日',
		image: '/images/photos/supermarket.svg',
		date: '2025-09-08',
		location: '東京・中野',
		weather: '多雲',
		mood: '生活感',
		tags: ['超市', '自炊', '省錢'],
		alt: '超市生鮮區，購物籃裡裝著當週食材',
		relatedPost: '/articles/tokyo-monthly-expenses',
	},
	{
		title: '黃昏的電車月台',
		image: '/images/photos/station-evening.svg',
		date: '2025-10-21',
		location: '東京・新宿',
		weather: '晴',
		mood: '面試前',
		tags: ['新宿', '電車', '黃昏'],
		alt: '新宿車站黃昏月台，電車進站前的空氣',
		relatedPost: '/articles/job-interview-practice',
	},
	{
		title: '雨後的街道倒影',
		image: '/images/photos/umbrella-street.svg',
		date: '2025-11-08',
		location: '東京・神樂坂',
		weather: '雨',
		mood: '鬆了一口氣',
		tags: ['雨天', '街道', '神樂坂'],
		alt: '雨後神樂坂石板路，水窪倒映路燈',
	},
	{
		title: '週末早晨的窗邊',
		image: '/images/photos/cafe-corner.svg',
		date: '2025-07-22',
		location: '東京・谷中',
		weather: '晴',
		mood: '慢慢醒來',
		tags: ['谷中', '週末', '咖啡'],
		alt: '谷中老宅區咖啡廳，早晨陽光灑進窗邊',
	},
	{
		title: '便利店暖光',
		image: '/images/photos/harajuku-rain.svg',
		date: '2025-09-02',
		location: '東京・中野',
		weather: '雨',
		mood: '想家',
		tags: ['便利店', '夜晚', '中野'],
		alt: '雨夜便利店門口，暖黃燈光從玻璃門透出',
	},
	{
		title: '海邊的風',
		image: '/images/photos/morning-commute.svg',
		date: '2025-06-14',
		location: '鎌倉・江之島',
		weather: '晴',
		mood: '自由',
		tags: ['鎌倉', '江之島', '海邊'],
		alt: '江之島海邊步道，遠方可見湘南海岸線',
	},
];

/** 首頁 Photo Wall Preview — 使用 siteBackgrounds 正式素材 */
export const PHOTO_PREVIEW_ITEMS: PhotoItem[] = [
	{
		title: '雨窗裡的東京',
		image: siteBackgrounds.heroPrimary.src,
		date: '2026-06-19',
		location: '東京',
		weather: '雨',
		mood: '安靜地開始',
		tags: ['東京', '雨天', '視窗'],
		alt: siteBackgrounds.heroPrimary.alt,
		relatedPost: '/articles/shibuya-ward-office-rainy-day',
	},
	{
		title: '雨中的街道',
		image: siteBackgrounds.windowStreet.src,
		date: '2025-11-08',
		location: '東京・神樂坂',
		weather: '雨',
		mood: '慢慢走',
		tags: ['散步', '雨天', '街道'],
		alt: siteBackgrounds.windowStreet.alt,
		relatedPost: '/articles/harajuku-rainy-walk',
	},
	{
		title: '咖啡廳的早晨',
		image: siteBackgrounds.windowCafe.src,
		date: '2025-10-12',
		location: '東京・表參道',
		weather: '晴',
		mood: '慢慢來',
		tags: ['咖啡廳', '早晨', '筆記'],
		alt: siteBackgrounds.windowCafe.alt,
	},
	{
		title: '超市生活日',
		image: siteBackgrounds.lifestyleSupermarket.src,
		date: '2025-09-08',
		location: '東京・中野',
		weather: '多雲',
		mood: '生活感',
		tags: ['超市', '自炊', '省錢'],
		alt: siteBackgrounds.lifestyleSupermarket.alt,
		relatedPost: '/articles/tokyo-monthly-expenses',
	},
	{
		title: '旅行筆記桌',
		image: siteBackgrounds.travelDesk.src,
		date: '2025-07-22',
		location: '東京',
		weather: '晴',
		mood: '整理思緒',
		tags: ['筆記', '旅行', '書桌'],
		alt: siteBackgrounds.travelDesk.alt,
	},
	{
		title: '澳洲海岸的預告',
		image: siteBackgrounds.australiaCoast.src,
		date: '2027-01-01',
		location: '澳洲・黃金海岸',
		weather: '晴',
		mood: '下一個篇章',
		tags: ['澳洲', '海岸', '預告'],
		alt: siteBackgrounds.australiaCoast.alt,
	},
];
