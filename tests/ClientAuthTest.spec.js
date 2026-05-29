import {test,expect} from "@playwright/test"

test('Web Client App Login Test',async({page})=>{
    
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator("#userEmail").fill("nikhil123456@gmail.com");
    await page.locator("#userPassword").fill("Nikhil@123");
    await page.locator("#login").click();
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").last().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

});

test('Registration Test',async({page})=>{
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator("p.login-wrapper-footer-text").click();
    await page.locator('#firstName').fill('Nikhil');
    await page.locator('#lastName').fill('Ranjan');
    await page.locator('#userEmail').fill('nikhil123456@gmail.com');
    await page.locator('#userMobile').fill('1234567890');
    const occupation =  page.locator("select.custom-select");
    await occupation.selectOption('3: Engineer');
    await page.locator("[value='Male']").click();
    
    await page.locator('#userPassword').fill('Nikhil@123');
    await page.locator('#confirmPassword').fill('Nikhil@123');
    await page.locator("[type='checkbox']").click();
    await page.locator("#login").click();
    await page.pause();    
});

test('E2E Automation Test', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator("#userEmail").fill("nikhil123456@gmail.com");
    await page.locator("#userPassword").fill("Nikhil@123");
    await page.locator("#login").click();
    await page.locator(".card-body b").last().waitFor();
    const products = page.locator('.card-body');
    const count = await products.count();
    const desiredProduct = 'ZARA COAT 3';

    for(let i=0;i<count;++i){
        if(await products.nth(i).locator('b').textContent() === desiredProduct){
            await products.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").last().waitFor();

    const bool = await page.locator("h3:has-text('"+desiredProduct+"')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text='Checkout'").click();
    await page.locator('[placeholder="Select Country"]').pressSequentially("Ind",{ delay: 150 });
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();
    const count1 = await dropdown.locator("button").count();
    for(let i=0;i<count;++i){
        const country = await dropdown.locator("button").nth(i).textContent();
        if(country === " India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    const email = await page.locator(".user__name label").textContent();
    console.log(email);
    await expect(page.locator(".user__name label")).toHaveText("nikhil123456@gmail.com");
    
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const order = await page.locator("label.ng-star-inserted").textContent();
    const orderId = order.split(" ")[2];
    console.log(orderId);

    await page.locator("button[routerlink*='orders']").click();
    await page.locator("tr.ng-star-inserted").last().waitFor();
    const table = page.locator(".table");
    const tr = table.locator("tr.ng-star-inserted");
    const count2 = await tr.count();
    for(let i=0;i<count2;++i){
        const id = await tr.nth(i).locator('th').textContent();
        if(id===orderId){
            await expect(tr.nth(i).locator('td').nth(1)).toHaveText(desiredProduct);
            await tr.nth(i).locator('.btn-primary').click();
            break;
        }
    }
    await expect(page.locator("div.col-text")).toHaveText(orderId);

})