export type ExternalLinkType = 'social' | 'music' | 'other';

export type ExternalLink = {
	label: string;
	href: string;
	type: ExternalLinkType;
	isActive: boolean;
};

export const externalLinks: ExternalLink[] = [
	{
		label: 'Instagram',
		href: '',
		type: 'social',
		isActive: false,
	},
	{
		label: 'Threads',
		href: '',
		type: 'social',
		isActive: false,
	},
	{
		label: 'YouTube',
		href: '',
		type: 'social',
		isActive: false,
	},
	{
		label: 'StreetVoice',
		href: '',
		type: 'music',
		isActive: false,
	},
];
