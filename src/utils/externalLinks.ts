import { externalLinks, type ExternalLink } from '@/data/externalLinks';

export function getActiveExternalLinks(): ExternalLink[] {
	return externalLinks.filter((link) => link.isActive && link.href.trim().length > 0);
}
