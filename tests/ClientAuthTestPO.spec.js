import {test,expect} from "@playwright/test"
import { PageObjectManager } from "../pageObjects/PageObjectManager";
const testdata = JSON.parse(JSON.stringify(require('../utils/E2EAutomationDataSet.json')))
const {customTest} = require('../utils/Test-base');

test('Web Client App Login Test',async({page})=>{
    
    const pageObjectManager = new PageObjectManager(page);
    const loginPage = pageObjectManager.getLoginPage();
    await loginPage.goToLoginPage();
    await loginPage.validLogin('nikhil123456@gmail.com','Nikhil@123');
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


for (const data of testdata){
test(`E2E Automation Test for ${data.desiredProduct}`, async({page})=>{
    
    const pageObjectManager = new PageObjectManager(page);
    const loginPage = pageObjectManager.getLoginPage();
    await loginPage.goToLoginPage();
    await loginPage.validLogin(data.username,data.password);
 
    const dashboardPage = pageObjectManager.getDashboardPage();
    await dashboardPage.searchProductAndAddToCart(data.desiredProduct);
    await dashboardPage.navigateToCart();
    
    const cartPage = pageObjectManager.getCartPage();
    await cartPage.verifyProductIsAddedToCart(data.desiredProduct);
    await cartPage.proceedToCheckout();
    
    const checkoutPage = pageObjectManager.getCheckoutPage();
    await checkoutPage.selectCountry("Cuba");
    await checkoutPage.validateEmail(data.username);
    await checkoutPage.placeOrder();

    const orderReviewPage = pageObjectManager.getOrderReviewPage();
    await orderReviewPage.validateOrderConfirmation();
    const orderId = await orderReviewPage.getOrderId();
    await orderReviewPage.goToOrdersHistory();

    const orderHistoryPage = pageObjectManager.getOrderHistoryPage();
    await orderHistoryPage.validateOrderIdAndViewOrder(orderId, data.desiredProduct);
    await orderHistoryPage.validateOrderIdOnViewOrdersPage(orderId);

})
}

customTest("E2E Automation Test", async({page,testdataContext})=>{
    
    const pageObjectManager = new PageObjectManager(page);
    const loginPage = pageObjectManager.getLoginPage();
    await loginPage.goToLoginPage();
    await loginPage.validLogin(testdataContext.username,testdataContext.password);
 
    const dashboardPage = pageObjectManager.getDashboardPage();
    await dashboardPage.searchProductAndAddToCart(testdataContext.desiredProduct);
    await dashboardPage.navigateToCart();
    
    const cartPage = pageObjectManager.getCartPage();
    await cartPage.verifyProductIsAddedToCart(testdataContext.desiredProduct);
    await cartPage.proceedToCheckout();
});