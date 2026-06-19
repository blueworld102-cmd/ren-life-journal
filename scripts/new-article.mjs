import { mkdir, writeFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const title = process.argv.slice(2).join(' ').trim();

if (!title) {
	console.error('請提供文章標題，例如：');
	console.error('  npm run new:article -- "文章標題"');
	console.error('  node scripts/new-article.mjs "文章標題"');
	process.exit(1);
}

function slugify(input) {
	const slug = input
		.normalize('NFKD')
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_]+/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '');

	if (slug.length > 0) return slug;

	const now = new Date();
	const date = now.toISOString().slice(0, 10);
	const time = String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0');
	return `draft-${date}-${time}`;
}

function todayDate() {
	return new Date().toISOString().slice(0, 10);
}

function buildFrontmatter({ title, slug, pubDate }) {
	const cover = `/images/posts/${slug}/cover.png`;
	return `---
title: '${title.replace(/'/g, "''")}'
description: ""
pubDate: '${pubDate}'
category: "心情筆記"
tags: []
location: ""
weather: ""
mood: ""
cover: "${cover}"
coverPosition: "center"
readingTime: ""
draft: true
---

在這裡撰寫文章內文。建議用短段落，像生活筆記一樣慢慢寫。

## 小標題範例

正文可以插入圖片：

![圖片說明文字](/images/posts/${slug}/01.png)

圖片檔請放在 \`public/images/posts/${slug}/\`，詳見 CONTENT_GUIDE「如何替文章新增照片」。

寫完後記得把 \`draft\` 改為 \`false\` 再發布。
`;
}

async function exists(filePath) {
	try {
		await access(filePath, constants.F_OK);
		return true;
	} catch {
		return false;
	}
}

const slug = slugify(title);
const articlePath = path.join(root, 'src/content/articles', `${slug}.md`);
const imageDir = path.join(root, 'public/images/posts', slug);

if (await exists(articlePath)) {
	console.error(`錯誤：文章已存在，不會覆蓋：${articlePath}`);
	process.exit(1);
}

await mkdir(imageDir, { recursive: true });
await writeFile(articlePath, buildFrontmatter({ title, slug, pubDate: todayDate() }), 'utf8');

console.log('已建立新文章：');
console.log(`  Markdown: src/content/articles/${slug}.md`);
console.log(`  圖片資料夾: public/images/posts/${slug}/`);
console.log('');
console.log('下一步：');
console.log(`  1. 編輯 frontmatter 與正文`);
console.log(`  2. 放入 cover.png 與內文圖片`);
console.log(`  3. 發布前將 draft 改為 false`);
