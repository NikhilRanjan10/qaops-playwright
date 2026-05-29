import {test,expect,request} from "@playwright/test"

import { APIUtils } from "../utils/APIUtils";

const requestPayload = {userEmail:"nikhil123456@gmail.com",userPassword:"Nikhil@123"};
const orderPayload = {orders:[{country:"United Kingdom",productOrderedId:"6960eae1c941646b7a8b3ed3"}]};

let response;

test.beforeAll(async()=>{

    
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,requestPayload);
    response = await apiUtils.createOrder(orderPayload);
    console.log(response.token);
    console.log(response.orderId);
});

test('Network Response Intercepter Test', async({page})=>{
    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value)
    },response.token);
    const desiredProduct = 'ADIDAS ORIGINAL';
    const fakePayLoadOrders = { data: [], message: "No Orders" };
    await page.goto("https://rahulshettyacademy.com/client");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route =>{
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill({
                response,body
            })
        });
//intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    
    await page.locator("button[routerlink*='orders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
 
  console.log(await page.locator(".mt-4").textContent());

});

