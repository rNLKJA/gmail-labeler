// Use dynamic import since playwright is installed via npx
const { chromium } = await import('playwright');

const pages = [
  '/methods',
  '/governance',
  '/governance/coverage',
  '/ai-log',
  '/methods/dr-001-provider-taxonomy',
  '/methods/dr-002-dry-run-by-default',
  '/methods/dr-003-gpl-license',
];

const baseURL = 'http://localhost:3648';
const outputDir = '/tmp/gmail-labeler-screenshots';

async function captureScreenshots() {
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    colorScheme: 'light'
  });
  const page = await context.newPage();

  for (const route of pages) {
    const filename = route.replace(/\//g, '_').replace(/^_/, '') + '.png';
    console.log(`Capturing ${route} -> ${filename}`);
    await page.goto(baseURL + route, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${outputDir}/${filename}`, fullPage: true });
  }

  await browser.close();
  console.log(`Screenshots saved to ${outputDir}`);
}

captureScreenshots().catch(console.error);
