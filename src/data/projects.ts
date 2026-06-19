export type ProjectStatus = '開發中' | '創作中' | '準備中';

export type ProjectLink = {
	label: string;
	href: string;
	isActive: boolean;
};

export type Project = {
	id: string;
	title: string;
	description: string;
	status: ProjectStatus;
	previewButtonLabel: string;
	previewHref: string;
	links: ProjectLink[];
};

export const projectsPageMeta = {
	kicker: 'Projects',
	title: 'Projects',
	subtitle: '生活、巡禮與創作計畫',
	description:
		'Ren 的個人專案與長期計畫：御朱印小旅帳、創作實驗與澳洲篇章準備筆記。',
};

export const projects: Project[] = [
	{
		id: 'goshuin',
		title: '御朱印小旅帳',
		description: '神社巡禮、御朱印收集與願望紀錄的小旅帳。',
		status: '開發中',
		previewButtonLabel: '查看專案',
		previewHref: '/projects#goshuin',
		links: [
			{
				label: '專案頁面',
				href: '/projects#goshuin',
				isActive: true,
			},
		],
	},
	{
		id: 'shanvi',
		title: 'Ren 361 / ShanVI',
		description: 'AI 音樂、Vtuber 與日系創作實驗。',
		status: '創作中',
		previewButtonLabel: '查看創作',
		previewHref: '/projects#shanvi',
		links: [
			{
				label: 'YouTube',
				href: '',
				isActive: false,
			},
			{
				label: '專案說明',
				href: '/projects#shanvi',
				isActive: true,
			},
		],
	},
	{
		id: 'australia',
		title: 'Australia Next Chapter',
		description: '從日本之後，前往澳洲打工度假的準備筆記。',
		status: '準備中',
		previewButtonLabel: '準備中',
		previewHref: '/projects#australia',
		links: [
			{
				label: '準備筆記（Journal）',
				href: '/articles',
				isActive: true,
			},
		],
	},
];

export function getActiveProjectLinks(project: Project) {
	return project.links.filter((link) => link.isActive && link.href.trim().length > 0);
}
