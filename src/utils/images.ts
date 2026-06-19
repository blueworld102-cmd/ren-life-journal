export function resolveImagePath(src?: string) {
	if (!src) return undefined;
	if (src.startsWith('/') || /^https?:\/\//.test(src)) return src;
	const filename = src.split('/').pop();
	return filename ? `/images/${filename}` : undefined;
}
