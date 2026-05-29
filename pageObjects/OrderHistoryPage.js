const { expect } = require("@playwright/test");
class OrderHistoryPage{
    constructor(page){
        this.page = page;
        this.orderRows = page.locator("tr.ng-star-inserted");
        this.orderTable = page.locator(".table");
        this.orderId = page.locator("div.col-text")
        
    }
    async validateOrderIdAndViewOrder(orderId,desiredProduct){
        await this.orderRows.last().waitFor();
        const tr = this.orderTable.locator("tr.ng-star-inserted");
        const count2 = await tr.count();
        for(let i=0;i<count2;++i){
            const id = await tr.nth(i).locator('th').textContent();
            if(id===orderId){
                await expect(tr.nth(i).locator('td').nth(1)).toHaveText(desiredProduct);
                await tr.nth(i).locator('.btn-primary').click();
                break;
        }
    }
    }

    async validateOrderIdOnViewOrdersPage(expectedOrderId){
        await expect(this.orderId).toHaveText(expectedOrderId);
    }
    
    
}

module.exports = {OrderHistoryPage}
