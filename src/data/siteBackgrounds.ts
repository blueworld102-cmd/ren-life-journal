export type SiteBackground = {
	src: string;
	alt: string;
	usage: string;
	tone: string;
};

export const siteBackgrounds = {
	heroPrimary: {
		src: '/images/site/backgrounds/hero/tokyo-rain-window-tower.png',
		alt: '柔和雨天東京街景，窗外可見東京鐵塔與櫻花，窗台上有咖啡杯',
		usage: 'featured article / photo wall / OG fallback',
		tone: 'soft, pastel, quiet',
	},
	heroChapterCard: {
		src: '/images/site/backgrounds/hero/tokyo-rain-window-tower.png',
		alt: "Soft journal chapter card background for Ren's Life Journal",
		usage: 'homepage hero chapter card',
		tone: 'soft, quiet, journal',
	},
	heroSecondary: {
		src: '/images/site/backgrounds/hero/waiting-luggage-window.png',
		alt: '行李箱與粉色帽子靠在大窗前，窗外是雨中的機場與飛機',
		usage: 'hero alternate / journey / working holiday theme',
		tone: 'anticipation, soft pink, departure',
	},
	windowTrain: {
		src: '/images/site/backgrounds/windows/train-window-rain-coffee.png',
		alt: '電車窗邊的咖啡杯與筆記本，窗外是雨天中的城市橋樑',
		usage: 'commute / daily life / work section background',
		tone: 'commute, rainy, introspective',
	},
	windowCafe: {
		src: '/images/site/backgrounds/windows/cafe-window-morning-notes.png',
		alt: '早晨咖啡廳窗邊，木桌上有筆記本、水杯與粉色小花',
		usage: 'journal / mood notes / about preview background',
		tone: 'literary, morning, calm',
	},
	windowStreet: {
		src: '/images/site/backgrounds/windows/rainy-city-street-blur.png',
		alt: '雨天城市街道，行人撐傘走過濕潤路面，視角如隔著玻璃窗',
		usage: 'photo wall header / tokyo walk category transition',
		tone: 'urban walk, rainy, blurred',
	},
	lifestyleSupermarket: {
		src: '/images/site/backgrounds/lifestyle/soft-supermarket-diary.png',
		alt: '超市走道與購物籃，柔和霧面光線下的日常補貨場景',
		usage: 'budget life / supermarket / solo living section',
		tone: 'everyday, practical, gentle',
	},
	travelDesk: {
		src: '/images/site/backgrounds/travel/travel-journal-desk-soft.png',
		alt: '書桌上有旅行筆記、地球儀、咖啡與小飛機模型的柔和場景',
		usage: 'about / start here / writing brand visual',
		tone: 'planning, journal, brand anchor',
	},
	australiaCoast: {
		src: '/images/site/backgrounds/australia/australia-coast-dreamy-morning.png',
		alt: '清晨海灘望向遠方城市天際線，粉橘色天空與柔和海浪',
		usage: 'future australia chapter / australia nav preview',
		tone: 'dreamy, coastal, new chapter',
	},
} as const satisfies Record<string, SiteBackground>;

export const SITE_ICON = '/images/site/icons/ren-life-journal-icon.png';

/** 依 key 取得背景圖路徑的簡便方法 */
export function getBackgroundSrc(key: keyof typeof siteBackgrounds) {
	return siteBackgrounds[key].src;
}
