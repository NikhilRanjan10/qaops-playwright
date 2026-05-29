const { Before, AfterStep, Status } = require("@cucumber/cucumber");
const playwright = require('@playwright/test');
const { PageObjectManager } = require('../../pageObjects/PageObjectManager');

Before(async function () {
    const browser = await playwright.chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.pageObjectManager = new PageObjectManager(this.page);
});

AfterStep( async function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: 'page.png', fullPage: 'true' });
  }
});