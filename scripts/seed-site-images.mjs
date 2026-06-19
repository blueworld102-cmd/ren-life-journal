/**
 * 產生網站背景 PNG 與 favicon（若 repo 內無原始素材時使用）。
 * 風格：柔和、低對比、日系生活誌。可日後以正式插畫替換同名檔案。
 */
import { mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');

const W = 1600;
const H = 1200;

function svgBackground({ stops, accents = '' }) {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      ${stops.map((s) => `<stop offset="${s.offset}" stop-color="${s.color}"/>`).join('')}
    </linearGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  ${accents}
</svg>`;
}

const backgrounds = [
	{
		file: 'images/site/backgrounds/hero/tokyo-rain-window-tower.png',
		svg: svgBackground({
			stops: [
				{ offset: '0%', color: '#f7f2ec' },
				{ offset: '45%', color: '#e8d5dc' },
				{ offset: '100%', color: '#d4c4b8' },
			],
			accents: `
        <ellipse cx="1180" cy="420" rx="180" ry="260" fill="#f1dde1" opacity="0.55" filter="url(#soft)"/>
        <rect x="120" y="180" width="920" height="720" rx="24" fill="#fff" opacity="0.35"/>
        <rect x="160" y="220" width="840" height="560" rx="12" fill="#cfe8f5" opacity="0.45"/>
        <circle cx="1320" cy="260" r="70" fill="#f3c9d4" opacity="0.5" filter="url(#soft)"/>
        <circle cx="1360" cy="300" r="55" fill="#f8e3ea" opacity="0.45" filter="url(#soft)"/>
      `,
		}),
	},
	{
		file: 'images/site/backgrounds/hero/waiting-luggage-window.png',
		svg: svgBackground({
			stops: [
				{ offset: '0%', color: '#faf5f2' },
				{ offset: '55%', color: '#f1dde1' },
				{ offset: '100%', color: '#d9e8f2' },
			],
			accents: `
        <rect x="80" y="120" width="1040" height="760" rx="28" fill="#fff" opacity="0.28"/>
        <rect x="980" y="520" width="220" height="300" rx="16" fill="#e8c9cf" opacity="0.55"/>
        <rect x="1010" y="470" width="160" height="90" rx="40" fill="#f4d9df" opacity="0.65"/>
      `,
		}),
	},
	{
		file: 'images/site/backgrounds/windows/train-window-rain-coffee.png',
		svg: svgBackground({
			stops: [
				{ offset: '0%', color: '#eef2f6' },
				{ offset: '100%', color: '#d7c7c2' },
			],
			accents: `
        <rect x="100" y="160" width="760" height="520" rx="20" fill="#fff" opacity="0.25"/>
        <ellipse cx="360" cy="760" rx="120" ry="40" fill="#c9a8a0" opacity="0.35"/>
        <rect x="280" y="620" width="160" height="110" rx="55" fill="#f0e0d8" opacity="0.7"/>
      `,
		}),
	},
	{
		file: 'images/site/backgrounds/windows/cafe-window-morning-notes.png',
		svg: svgBackground({
			stops: [
				{ offset: '0%', color: '#fffaf4' },
				{ offset: '100%', color: '#efe4d8' },
			],
			accents: `
        <rect x="140" y="200" width="700" height="480" rx="18" fill="#fff" opacity="0.4"/>
        <rect x="220" y="560" width="280" height="180" rx="12" fill="#f5ebe0" opacity="0.75"/>
        <circle cx="1180" cy="320" r="90" fill="#f1dde1" opacity="0.5" filter="url(#soft)"/>
      `,
		}),
	},
	{
		file: 'images/site/backgrounds/windows/rainy-city-street-blur.png',
		svg: svgBackground({
			stops: [
				{ offset: '0%', color: '#e6edf2' },
				{ offset: '100%', color: '#cfc4c0' },
			],
			accents: `
        <rect x="0" y="680" width="${W}" height="520" fill="#b8b0ab" opacity="0.25" filter="url(#soft)"/>
        <ellipse cx="400" cy="760" rx="220" ry="80" fill="#fff" opacity="0.2" filter="url(#soft)"/>
        <ellipse cx="900" cy="820" rx="280" ry="90" fill="#fff" opacity="0.18" filter="url(#soft)"/>
      `,
		}),
	},
	{
		file: 'images/site/backgrounds/lifestyle/soft-supermarket-diary.png',
		svg: svgBackground({
			stops: [
				{ offset: '0%', color: '#faf8f5' },
				{ offset: '100%', color: '#ebe2d6' },
			],
			accents: `
        <rect x="180" y="260" width="520" height="640" rx="20" fill="#fff" opacity="0.35"/>
        <rect x="760" y="340" width="420" height="500" rx="24" fill="#f3ebe2" opacity="0.55"/>
      `,
		}),
	},
	{
		file: 'images/site/backgrounds/travel/travel-journal-desk-soft.png',
		svg: svgBackground({
			stops: [
				{ offset: '0%', color: '#faf6f0' },
				{ offset: '100%', color: '#eadfce' },
			],
			accents: `
        <rect x="200" y="420" width="720" height="360" rx="16" fill="#fff" opacity="0.45"/>
        <circle cx="1240" cy="360" r="110" fill="#e8d4c8" opacity="0.45" filter="url(#soft)"/>
        <rect x="980" y="520" width="180" height="120" rx="10" fill="#f1dde1" opacity="0.55"/>
      `,
		}),
	},
	{
		file: 'images/site/backgrounds/australia/australia-coast-dreamy-morning.png',
		svg: svgBackground({
			stops: [
				{ offset: '0%', color: '#fde8dc' },
				{ offset: '45%', color: '#f6d4c8' },
				{ offset: '100%', color: '#cfe8ef' },
			],
			accents: `
        <ellipse cx="800" cy="920" rx="700" ry="120" fill="#fff" opacity="0.35" filter="url(#soft)"/>
        <rect x="900" y="280" width="420" height="180" rx="24" fill="#fff" opacity="0.25" filter="url(#soft)"/>
      `,
		}),
	},
];

async function writePng(relativePath, svg) {
	const out = path.join(publicDir, relativePath);
	await mkdir(path.dirname(out), { recursive: true });
	await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
	console.log(`  ✓ ${relativePath}`);
}

async function seedFavicons() {
	const svgPath = path.join(publicDir, 'favicon.svg');
	const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <rect width="512" height="512" rx="96" fill="#faf7f2"/>
    <circle cx="256" cy="230" r="118" fill="#f1dde1" opacity="0.9"/>
    <path d="M256 150c-42 0-76 30-76 68 0 52 76 118 76 118s76-66 76-118c0-38-34-68-76-68z" fill="#b76e79" opacity="0.85"/>
    <text x="256" y="390" text-anchor="middle" font-family="Georgia, serif" font-size="72" fill="#5c534c">R</text>
  </svg>`;

	await sharp(Buffer.from(iconSvg)).resize(32, 32).png().toFile(path.join(publicDir, 'favicon.png'));
	await sharp(Buffer.from(iconSvg)).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
	await mkdir(path.join(publicDir, 'images/site/icons'), { recursive: true });
	await sharp(Buffer.from(iconSvg)).resize(512, 512).png().toFile(
		path.join(publicDir, 'images/site/icons/ren-life-journal-icon.png'),
	);
	console.log('  ✓ favicon.png, apple-touch-icon.png, ren-life-journal-icon.png');
}

async function main() {
	console.log('產生網站背景與 icon…');
	for (const bg of backgrounds) {
		await writePng(bg.file, bg.svg);
	}
	await seedFavicons();

	const hero = path.join(publicDir, 'images/site/backgrounds/hero/tokyo-rain-window-tower.png');
	const coverDir = path.join(publicDir, 'images/posts/shibuya-ward-office-rainy-day');
	const cover = path.join(coverDir, 'cover.png');
	await mkdir(coverDir, { recursive: true });
	await copyFile(hero, cover);
	console.log('  ✓ images/posts/shibuya-ward-office-rainy-day/cover.png (from hero)');

	console.log('完成。若需正式插畫，請替換 public/images/site/backgrounds/ 內同名 PNG。');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
