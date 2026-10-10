import { test, expect, type Page } from '@playwright/test';

const BASE_URL = 'https://gmail-labeler-demo.vercel.app';

const routes = [
  { path: '/', name: 'Home' },
  { path: '/ai-log', name: 'AI-Log' },
  { path: '/governance', name: 'Governance' },
  { path: '/governance/coverage', name: 'Governance-Coverage' },
  { path: '/installation', name: 'Installation' },
  { path: '/methods', name: 'Methods' },
  { path: '/methods/dr-001-provider-taxonomy', name: 'DR-001' },
  { path: '/methods/dr-002-dry-run-by-default', name: 'DR-002' },
  { path: '/methods/dr-003-gpl-license', name: 'DR-003' },
  { path: '/playground', name: 'Playground' },
  { path: '/privacy', name: 'Privacy' },
  { path: '/simulator', name: 'Simulator' },
  { path: '/taxonomy', name: 'Taxonomy' },
];

interface IssueReport {
  route: string;
  project: string;
  consoleErrors: string[];
  failedRequests: string[];
  pageErrors: string[];
}

const issues: IssueReport[] = [];

test.describe('Production verification', () => {
  for (const route of routes) {
    test(`${route.name} loads correctly`, async ({ page }, testInfo) => {
      const consoleErrors: string[] = [];
      const failedRequests: string[] = [];
      const pageErrors: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      page.on('response', (response) => {
        if (response.status() >= 400) {
          failedRequests.push(`${response.status()} ${response.url()}`);
        }
      });

      page.on('pageerror', (error) => {
        pageErrors.push(error.message);
      });

      await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1000);

      const screenshotPath = `/Volumes/Rin T705 M2 Drive/GitHub/gmail-labeler/web/screenshots/${testInfo.project.name}-${route.name}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });

      if (consoleErrors.length > 0 || failedRequests.length > 0 || pageErrors.length > 0) {
        issues.push({
          route: route.path,
          project: testInfo.project.name,
          consoleErrors,
          failedRequests,
          pageErrors,
        });
      }

      expect(consoleErrors, `Console errors on ${route.path}`).toHaveLength(0);
      expect(failedRequests, `Failed requests on ${route.path}`).toHaveLength(0);
      expect(pageErrors, `Page errors on ${route.path}`).toHaveLength(0);
    });
  }

  test('Playground AI interaction without key', async ({ page }, testInfo) => {
    await page.goto(`${BASE_URL}/playground`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const aiButtons = page.locator('button').filter({ hasText: /generate|analyze|ai|label/i });
    const buttonCount = await aiButtons.count();

    if (buttonCount > 0) {
      await aiButtons.first().click();
      await page.waitForTimeout(1500);

      const hasKeyPrompt = await page.locator('text=/api key|bring your own key|byok|enter.*key|settings/i').count() > 0;

      await page.screenshot({
        path: `/Volumes/Rin T705 M2 Drive/GitHub/gmail-labeler/web/screenshots/${testInfo.project.name}-playground-ai-interaction.png`,
        fullPage: true
      });

      expect(hasKeyPrompt, 'Should show API key prompt').toBe(true);
    }
  });

  test('Simulator AI interaction without key', async ({ page }, testInfo) => {
    await page.goto(`${BASE_URL}/simulator`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const aiButtons = page.locator('button').filter({ hasText: /generate|analyze|ai|simulate|run/i });
    const buttonCount = await aiButtons.count();

    if (buttonCount > 0) {
      await aiButtons.first().click();
      await page.waitForTimeout(1500);

      const hasKeyPrompt = await page.locator('text=/api key|bring your own key|byok|enter.*key|settings/i').count() > 0;

      await page.screenshot({
        path: `/Volumes/Rin T705 M2 Drive/GitHub/gmail-labeler/web/screenshots/${testInfo.project.name}-simulator-ai-interaction.png`,
        fullPage: true
      });

      expect(hasKeyPrompt, 'Should show API key prompt').toBe(true);
    }
  });
});

test.afterAll(async () => {
  if (issues.length > 0) {
    console.log('\n=== ISSUES FOUND ===');
    for (const issue of issues) {
      console.log(`\nRoute: ${issue.route} [${issue.project}]`);
      if (issue.consoleErrors.length > 0) {
        console.log('Console Errors:', issue.consoleErrors);
      }
      if (issue.failedRequests.length > 0) {
        console.log('Failed Requests:', issue.failedRequests);
      }
      if (issue.pageErrors.length > 0) {
        console.log('Page Errors:', issue.pageErrors);
      }
    }
  }
});
