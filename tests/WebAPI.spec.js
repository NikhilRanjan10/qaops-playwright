import {test, expect, request} from "@playwright/test";
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

test('@Web E2E Automation Test', async({page})=>{
    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value)
    },response.token);
    const desiredProduct = 'ADIDAS ORIGINAL';
    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator("button[routerlink*='orders']").click();
    await page.locator("tr.ng-star-inserted").last().waitFor();
    const table = page.locator(".table");
    const tr = table.locator("tr.ng-star-inserted");
    const count2 = await tr.count();
    for(let i=0;i<count2;++i){
        const id = await tr.nth(i).locator('th').textContent();
        if(id===response.orderId){
            await expect(tr.nth(i).locator('td').nth(1)).toHaveText(desiredProduct);
            await tr.nth(i).locator('.btn-primary').click();
            break;
        }
    }
    await expect(page.locator("div.col-text")).toHaveText(response.orderId);

})