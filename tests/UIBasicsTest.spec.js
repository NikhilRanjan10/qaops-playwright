const {test,expect} = require('@playwright/test')

test('Browser Context UI Test', async ({browser})=>{

    const contex = await browser.newContext();
    const page1 = await contex.newPage();
    await page1.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(page1.title());

});

test('Page UI Test', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(page.title());
    //await expect(page).toHaveTitle("Google");
    await page.locator('#username').fill('Rahul');
    await page.locator("[name='password']").fill('Learning@830$3mK2');
    await page.locator('#signInBtn').click();

    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    await page.locator('#username').fill('');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#signInBtn').click();

    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());
    console.log(await page.locator(".card-body a").last().textContent());
    

    console.log(await page.locator(".card-body a").allTextContents());

});

test('Login UI Components Test',async({page})=>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator("[name='password']").fill('Learning@830$3mK2');
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption('consult');
    //await page.pause();
    await page.locator("span.checkmark").last().click();
    await page.locator("#okayBtn").click();
    await expect(page.locator("span.checkmark").last()).toBeChecked();
    console.log(await page.locator("span.checkmark").last().isChecked());

    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    console.log((await page.locator("#terms").isChecked()));
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    const documentLink = page.locator("[href*='documents-request']");
    await expect(documentLink).toHaveAttribute("class","blinkingText");

})

test('Handling Child Window Test', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator("[href*='documents-request']");
    const[newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()]
    );
    const text = await newPage.locator('.red').textContent();
    const arrayText = text.split('@');
    const domain = arrayText[1].split(' ')[0].split('.')[0];
    console.log(domain);
    await page.bringToFront(); //only for headed version visibility
    await page.locator('#username').fill(domain);
    //await page.pause();
    console.log(await page.locator("#username").inputValue());
})  