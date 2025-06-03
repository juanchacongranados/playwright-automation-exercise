// utils/lighthouseHelper.js
import fs from 'fs';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

(async () => {
  const chrome = await launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance', 'accessibility'],
    port: chrome.port,
  };
  const runnerResult = await lighthouse('https://automationexercise.com', options);

  fs.writeFileSync('lighthouse-report.html', runnerResult.report);
  console.log('Accessibility score:', runnerResult.lhr.categories.accessibility.score);
  console.log('Performance score:', runnerResult.lhr.categories.performance.score);

  await chrome.kill();
})();
