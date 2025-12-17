import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exec } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, 'dist');
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

// List of routes to prerender
const routes = [
    '/',
    '/land',
    '/robulus',
    '/shelter',
    '/shelter/register',
    '/smart-contract',
    '/tech',
    '/legal',
    // Add other public routes here
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
    console.log('📦 Starting Prerendering...');

    // 1. Start the Vite preview server
    console.log('🚀 Starting preview server...');
    const server = exec('npm run preview');

    // Wait for server to be ready
    await sleep(3000);

    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // Useful for WSL/CI
    });

    // Fetch real data to inject
    console.log('🌍 Fetching real data for prerendering...');
    let techData = [];
    try {
        const res = await fetch('https://juvantia.org/api/tech-stack');
        techData = await res.json();
        console.log(`✅ Loaded ${techData.length} tech items.`);
    } catch (e) {
        console.error('❌ Failed to fetch tech data:', e.message);
    }

    try {
        const page = await browser.newPage();

        // Intercept API requests
        await page.setRequestInterception(true);
        page.on('request', request => {
            const url = request.url();
            if (url.includes('/api/tech-stack')) {
                console.log('⚡ Intercepting tech-stack request');
                request.respond({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(techData)
                });
            } else if (url.includes('/api/')) {
                // For other API endpoints, we can try to let them pass or mock empty
                // But simply continuing is risky if the proxy fails. 
                // Let's rely on the proxy for others, or fail gracefully.
                request.continue();
            } else {
                request.continue();
            }
        });

        for (const route of routes) {
            console.log(`Rendering: ${route}...`);

            page.on('console', msg => console.log('PAGE LOG:', msg.text()));
            page.on('requestfailed', request => console.log('FAILED REQUEST:', request.url(), request.failure().errorText));

            await page.goto(`${BASE_URL}${route}`, {
                waitUntil: 'networkidle0',
                timeout: 60000,
            });

            // Specific wait for /tech page to ensure data is fetched
            if (route === '/tech') {
                console.log('Waiting for Tech Stack data to load...');
                // Wait for the Loading text to disappear and/or grid to appear
                // The "Technology Stack" h1 only appears after loading is false
                try {
                    await page.waitForSelector('h1', { timeout: 10000 });
                    // Give it a little extra time for the items to render locally
                    await sleep(2000);
                } catch (e) {
                    console.log('Timeout waiting for Tech selector');
                }
            }

            const html = await page.content();

            // Determine output path
            // / -> dist/index.html
            // /tech -> dist/tech/index.html
            const filePath = route === '/'
                ? path.join(DIST_DIR, 'index.html')
                : path.join(DIST_DIR, route, 'index.html');

            const dirPath = path.dirname(filePath);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }

            fs.writeFileSync(filePath, html);
            console.log(`✅ Saved: ${filePath}`);
        }

        // Generate sitemap.xml
        console.log('🗺️ Generating sitemap.xml...');
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>https://juvantia.org${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;
        fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
        console.log(`✅ Saved: ${path.join(DIST_DIR, 'sitemap.xml')}`);

        // Generate robots.txt
        console.log('🤖 Generating robots.txt...');
        const robots = `User-agent: *
Allow: /

Sitemap: https://juvantia.org/sitemap.xml`;
        fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robots);
        console.log(`✅ Saved: ${path.join(DIST_DIR, 'robots.txt')}`);

    } catch (error) {
        console.error('❌ Error during prerendering:', error);
        process.exit(1);
    } finally {
        await browser.close();
        server.kill();
        console.log('🏁 Prerendering complete.');
        process.exit(0);
    }
}

main();
