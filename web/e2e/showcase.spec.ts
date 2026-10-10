import { test } from '@playwright/test';
import type { Page } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'https://gmail-labeler-demo.vercel.app';

// Helper to add on-screen caption overlay
async function addCaption(page: Page, stepNumber: number, text: string) {
  await page.evaluate(
    ({ num, caption }: { num: number; caption: string }) => {
      // Remove existing caption if any
      const existing = document.getElementById('showcase-caption');
      if (existing) existing.remove();

      // Create caption banner
      const banner = document.createElement('div');
      banner.id = 'showcase-caption';
      banner.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.85);
        color: white;
        padding: 16px 24px;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 18px;
        font-weight: 500;
        z-index: 999999;
        box-shadow: 0 -2px 10px rgba(0,0,0,0.3);
      `;
      banner.innerHTML = `<span style="color: #60a5fa;">Step ${num}:</span> ${caption}`;
      document.body.appendChild(banner);
    },
    { num: stepNumber, caption: text }
  );
}

// Helper to add cursor highlight
async function addCursorHighlight(page: Page) {
  await page.evaluate(() => {
    if (document.getElementById('cursor-highlight')) return;

    const highlight = document.createElement('div');
    highlight.id = 'cursor-highlight';
    highlight.style.cssText = `
      position: fixed;
      width: 24px;
      height: 24px;
      border: 3px solid #60a5fa;
      border-radius: 50%;
      pointer-events: none;
      z-index: 999998;
      display: none;
      box-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
    `;
    document.body.appendChild(highlight);

    document.addEventListener('mousemove', (e) => {
      highlight.style.display = 'block';
      highlight.style.left = `${e.pageX - 12}px`;
      highlight.style.top = `${e.pageY - 12}px`;
    });
  });
}

// Helper for slow, human-like interactions
async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function slowClick(page: Page, selector: string, delay = 800) {
  await page.hover(selector);
  await wait(delay);
  await page.click(selector);
  await wait(1000);
}

async function slowType(page: Page, selector: string, text: string, delay = 100) {
  await page.click(selector);
  await wait(500);
  await page.type(selector, text, { delay });
  await wait(800);
}

test.describe('Showcase workflows', () => {
  test('Workflow 1: Explore the taxonomy', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await wait(2000);
    await addCursorHighlight(page);

    // Step 1: Navigate to taxonomy
    await addCaption(page, 1, 'Navigate to the Provider Taxonomy');
    await wait(1500);
    await slowClick(page, 'a[href="/taxonomy"]');
    await wait(2000);

    // Step 2: Browse provider types
    await addCaption(page, 2, 'Browse 20+ provider types with descriptions');
    await wait(1500);

    // Scroll through a few categories
    const categories = await page.locator('[data-provider-type], .provider-category, h3, h2').all();
    for (let i = 0; i < Math.min(5, categories.length); i++) {
      await categories[i].scrollIntoViewIfNeeded();
      await wait(1200);
    }

    // Step 3: Search functionality
    await addCaption(page, 3, 'Search where a domain lands (e.g., "github.com")');
    const searchInput = page.locator('input[type="search"], input[type="text"], input[placeholder*="search" i]').first();
    if (await searchInput.count() > 0) {
      await searchInput.click();
      await wait(500);
      await searchInput.type('github.com', { delay: 120 });
      await wait(2000);
    }

    // Step 4: View example rules
    await addCaption(page, 4, 'See example rules for each provider type');
    await wait(1500);

    // Click first expandable or example
    const expandable = page.locator('button, details, [role="button"]').filter({ hasText: /example|rule|view|expand/i }).first();
    if (await expandable.count() > 0) {
      await expandable.hover();
      await wait(1000);
      await expandable.click();
      await wait(2500);
    }

    await wait(1000);
  });

  test('Workflow 2: Dry-run simulator', async ({ page }) => {
    await page.goto(`${BASE_URL}/simulator`, { waitUntil: 'networkidle' });
    await wait(2000);
    await addCursorHighlight(page);

    // Step 1: Introduction
    await addCaption(page, 1, 'Open the Dry-Run Simulator');
    await wait(2000);

    // Step 2: Upload synthetic CSV (or use sample data)
    await addCaption(page, 2, 'Load sample inbox data (100 threads)');
    await wait(1500);

    // Look for sample data button or file upload
    const sampleButton = page.locator('button').filter({ hasText: /sample|example|demo|load/i }).first();
    if (await sampleButton.count() > 0) {
      await sampleButton.hover();
      await wait(1000);
      await sampleButton.click();
      await wait(2000);
    }

    // Step 3: Run classification
    await addCaption(page, 3, 'Watch threads get classified in real-time');
    await wait(1500);

    const runButton = page.locator('button').filter({ hasText: /run|simulate|classify|start/i }).first();
    if (await runButton.count() > 0) {
      await runButton.hover();
      await wait(1000);
      await runButton.click();
      await wait(4000); // Let simulation run
    }

    // Step 4: View results
    await addCaption(page, 4, 'Review label distribution and action log');
    await wait(2000);

    // Scroll to results
    const results = page.locator('[data-testid*="result"], .results, .distribution, table').first();
    if (await results.count() > 0) {
      await results.scrollIntoViewIfNeeded();
      await wait(2500);
    }

    await wait(1000);
  });

  test('Workflow 3: Privacy and governance', async ({ page }) => {
    await page.goto(`${BASE_URL}/privacy`, { waitUntil: 'networkidle' });
    await wait(2000);
    await addCursorHighlight(page);

    // Step 1: Privacy Impact Assessment
    await addCaption(page, 1, 'Read the Privacy Impact Assessment');
    await wait(2000);

    // Scroll through key sections
    await page.evaluate(() => window.scrollBy(0, 300));
    await wait(1500);
    await page.evaluate(() => window.scrollBy(0, 300));
    await wait(1500);

    // Step 2: Navigate to governance
    await addCaption(page, 2, 'Explore governance and failure modes');
    await wait(1500);
    await slowClick(page, 'a[href="/governance"]');
    await wait(2000);

    // Scroll through governance
    await page.evaluate(() => window.scrollBy(0, 300));
    await wait(1500);
    await page.evaluate(() => window.scrollBy(0, 300));
    await wait(1500);

    // Step 3: View decision records
    await addCaption(page, 3, 'Review Architecture Decision Records');
    await wait(1500);
    await slowClick(page, 'a[href="/methods"]');
    await wait(2000);

    // Step 4: Open a DR
    await addCaption(page, 4, 'See transparent decision-making process');
    await wait(1500);
    const drLink = page.locator('a[href*="/methods/dr-"]').first();
    if (await drLink.count() > 0) {
      await drLink.hover();
      await wait(1000);
      await drLink.click();
      await wait(2000);

      // Scroll through DR
      await page.evaluate(() => window.scrollBy(0, 300));
      await wait(1500);
      await page.evaluate(() => window.scrollBy(0, 300));
      await wait(1500);
    }

    await wait(1000);
  });
});
