/**
 * 產生日系生活誌風格的「紙張紋理」fallback PNG。
 * 僅使用柔和漸層 + 細緻顆粒，不含幾何色塊。
 * 正式插畫就緒後，直接覆蓋 public/images/site/backgrounds/ 同名檔案即可。
 */
import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');

const W = 1600;
const H = 1200;

function paperSvg(stops, seed = 3) {
	const gradientStops = stops
		.map((s) => `<stop offset="${s.offset}" stop-color="${s.color}"/>`)
		.join('');

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="85%" y2="100%">
      ${gradientStops}
    </linearGradient>
    <filter id="paper" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" seed="${seed}" result="noise"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.98  0 0 0 0 0.96  0 0 0 0 0.94  0 0 0 0.04 0" in="noise" result="grain"/>
      <feBlend in="SourceGraphic" in2="grain" mode="soft-light"/>
    </filter>
    <radialGradient id="vignette" cx="50%" cy="45%" r="75%">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.04"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)" filter="url(#paper)"/>
  <rect width="100%" height="100%" fill="url(#vignette)"/>
</svg>`;
}

const backgrounds = [
	{
		file: 'images/site/backgrounds/hero/tokyo-rain-window-tower.png',
		svg: paperSvg(
			[
				{ offset: '0%', color: '#faf7f2' },
				{ offset: '42%', color: '#f3e8ec' },
				{ offset: '100%', color: '#e8ded2' },
			],
			11,
		),
	},
	{
		file: 'images/site/backgrounds/hero/waiting-luggage-window.png',
		svg: paperSvg(
			[
				{ offset: '0%', color: '#faf6f3' },
				{ offset: '55%', color: '#f0e2e6' },
				{ offset: '100%', color: '#dde8ef' },
			],
			17,
		),
	},
	{
		file: 'images/site/backgrounds/windows/train-window-rain-coffee.png',
		svg: paperSvg(
			[
				{ offset: '0%', color: '#eef2f5' },
				{ offset: '50%', color: '#e6e0dc' },
				{ offset: '100%', color: '#d9cfc8' },
			],
			23,
		),
	},
	{
		file: 'images/site/backgrounds/windows/cafe-window-morning-notes.png',
		svg: paperSvg(
			[
				{ offset: '0%', color: '#fffaf5' },
				{ offset: '48%', color: '#f7efe6' },
				{ offset: '100%', color: '#ebe2d6' },
			],
			29,
		),
	},
	{
		file: 'images/site/backgrounds/windows/rainy-city-street-blur.png',
		svg: paperSvg(
			[
				{ offset: '0%', color: '#e8edf1' },
				{ offset: '45%', color: '#ddd6d2' },
				{ offset: '100%', color: '#cfc6c0' },
			],
			31,
		),
	},
	{
		file: 'images/site/backgrounds/lifestyle/soft-supermarket-diary.png',
		svg: paperSvg(
			[
				{ offset: '0%', color: '#faf9f6' },
				{ offset: '50%', color: '#f2ebe4' },
				{ offset: '100%', color: '#e6ddd3' },
			],
			37,
		),
	},
	{
		file: 'images/site/backgrounds/travel/travel-journal-desk-soft.png',
		svg: paperSvg(
			[
				{ offset: '0%', color: '#faf6f0' },
				{ offset: '55%', color: '#f0e6dc' },
				{ offset: '100%', color: '#e4d6c8' },
			],
			41,
		),
	},
	{
		file: 'images/site/backgrounds/australia/australia-coast-dreamy-morning.png',
		svg: paperSvg(
			[
				{ offset: '0%', color: '#fdeee4' },
				{ offset: '40%', color: '#f5ddd2' },
				{ offset: '100%', color: '#d8e8ee' },
			],
			43,
		),
	},
];

async function writePng(relativePath, svg) {
	const out = path.join(publicDir, relativePath);
	await mkdir(path.dirname(out), { recursive: true });
	await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
	console.log(`  ✓ ${relativePath}`);
}

async function writeArticleCover() {
	const svgPath = path.join(publicDir, 'images/covers/shibuya-rain.svg');
	const outDir = path.join(publicDir, 'images/posts/shibuya-ward-office-rainy-day');
	const outPath = path.join(outDir, 'cover.png');
	await mkdir(outDir, { recursive: true });
	await sharp(svgPath).resize(1200, 800, { fit: 'cover' }).png({ compressionLevel: 9 }).toFile(outPath);
	console.log('  ✓ images/posts/shibuya-ward-office-rainy-day/cover.png (from shibuya-rain.svg)');
}

async function main() {
	console.log('產生紙張紋理 fallback PNG…');
	for (const bg of backgrounds) {
		await writePng(bg.file, bg.svg);
	}
	await writeArticleCover();
	console.log('完成。請以正式插畫覆蓋同名檔案。');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
