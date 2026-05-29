import {test, expect} from "@playwright/test"

test('Playwright Special locators', async ({ page }) => {
  
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link",{name : "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
 
});

test('E2E Automation Test', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.getByPlaceholder("email@example.com").fill("nikhil123456@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Nikhil@123");
    await page.locator("#login").click();
    await page.locator(".card-body b").last().waitFor();
    const products = page.locator('.card-body');

    await products.filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:" Add To Cart"}).click();
    
    await page.locator("li").getByRole("button",{name:"  Cart "}).click();
    await page.locator("div li").last().waitFor();

    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    await page.getByText("Checkout").click();
    await page.getByPlaceholder("Select Country").pressSequentially("Ind",{ delay: 150 });
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();
    await dropdown.getByRole("button",{name:"India"}).nth(1).click();
    await expect(page.getByText("nikhil123456@gmail.com")).toBeVisible();
    
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
    const order = await page.locator("label.ng-star-inserted").textContent();
    const orderId = order.split(" ")[2];
    console.log(orderId);

    await page.getByRole("button",{name: "  ORDERS"}).click();
    await expect(page.getByText(orderId)).toBeVisible();
   // await page.getByText(orderId).locator("td").nth(1).toHaveText("ZARA COAT 3");
   // await page.getByText(orderId).getByRole("button",{name: "View"}).click();
   // await expect(page.getByText(orderId)).toBeVisible();
})