import { readFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');

const errors = [];

async function exists(relativePath) {
	try {
		await access(path.join(publicDir, relativePath), constants.F_OK);
		return true;
	} catch {
		return false;
	}
}

function toPublicPath(urlPath) {
	if (!urlPath || !urlPath.startsWith('/')) return null;
	return urlPath.replace(/^\//, '').split('?')[0];
}

async function checkPublicUrl(urlPath, label) {
	const rel = toPublicPath(urlPath);
	if (!rel) return;
	if (!(await exists(rel))) {
		errors.push(`[${label}] 檔案不存在: public/${rel} (引用: ${urlPath})`);
	}
}

async function readArticleCovers() {
	const articlesDir = path.join(root, 'src/content/articles');
	const { readdir, readFile } = await import('node:fs/promises');
	const files = await readdir(articlesDir);
	for (const file of files) {
		if (!file.endsWith('.md') || file.startsWith('_')) continue;
		const content = await readFile(path.join(articlesDir, file), 'utf8');
		const match = content.match(/^cover:\s*['"]?([^'"\n]+)['"]?/m);
		if (match) {
			await checkPublicUrl(match[1].trim(), `article:${file}`);
		}
	}
}

async function readSiteBackgrounds() {
	const content = await readFile(path.join(root, 'src/data/siteBackgrounds.ts'), 'utf8');
	const srcs = [...content.matchAll(/src:\s*'([^']+)'/g)].map((m) => m[1]);
	for (const src of srcs) {
		await checkPublicUrl(src, 'siteBackgrounds');
	}
	const iconMatch = content.match(/SITE_ICON = '([^']+)'/);
	if (iconMatch) await checkPublicUrl(iconMatch[1], 'SITE_ICON');
}

async function readDefaultOg() {
	const content = await readFile(path.join(root, 'src/utils/articles.ts'), 'utf8');
	const match = content.match(/heroPrimary\.src/);
	if (match) {
		const bg = await readFile(path.join(root, 'src/data/siteBackgrounds.ts'), 'utf8');
		const hero = bg.match(/heroPrimary:[\s\S]*?src:\s*'([^']+)'/);
		if (hero) await checkPublicUrl(hero[1], 'DEFAULT_OG_IMAGE');
	}
}

async function main() {
	console.log('檢查圖片資產…\n');

	await readArticleCovers();
	await readSiteBackgrounds();
	await readDefaultOg();

	const required = ['favicon.png', 'apple-touch-icon.png'];
	for (const file of required) {
		if (!(await exists(file))) {
			errors.push(`[favicon] 檔案不存在: public/${file}`);
		}
	}

	if (errors.length > 0) {
		console.error(`發現 ${errors.length} 個問題：\n`);
		errors.forEach((e) => console.error(`  ✗ ${e}`));
		process.exit(1);
	}

	console.log('✓ 所有檢查項目通過');
}

main();
