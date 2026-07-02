const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1680, height: 945 }, deviceScaleFactor: 1.4 });
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await page.click('#startJourney');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'artifacts-graph.png', fullPage: false });

  const graph = await page.evaluate(() => ({
    dagre: typeof window.dagre !== 'undefined',
    nodes: document.querySelectorAll('.graph-node').length,
    edges: document.querySelectorAll('.graph-edge').length,
    labels: document.querySelectorAll('.edge-label').length,
    // Guided journey: only the start step is clickable, everything else is locked.
    nextSteps: [...document.querySelectorAll('.graph-node.next')].map(n => n.dataset.id),
    lockedCount: document.querySelectorAll('.graph-node.locked').length,
    canvas: {
      width: document.querySelector('#graphCanvas').style.width,
      height: document.querySelector('#graphCanvas').style.height
    }
  }));

  // Clicking the highlighted next step should open its detail view.
  await page.click('.graph-node.next');
  await page.waitForTimeout(200);
  const opensDetail = await page.evaluate(() => !document.querySelector('#detailScreen').hidden);
  const detailTitle = await page.evaluate(() => document.querySelector('#detail-title')?.textContent);

  console.log(JSON.stringify({ graph, opensDetail, detailTitle, errors }, null, 2));
  await browser.close();
  const guidedOk = graph.nextSteps.length === 1 && graph.lockedCount === graph.nodes - 1;
  if (errors.length || !opensDetail || graph.nodes !== 23 || !guidedOk) process.exit(1);
})();
