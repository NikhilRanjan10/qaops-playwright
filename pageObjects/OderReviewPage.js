const { expect } = require("@playwright/test");
class OrderReviewPage{
    constructor(page){
        this.page = page;
        this.odrerConfirmationText = page.locator(".hero-primary");
        this.orderIdText = page.locator("label.ng-star-inserted");
        this.ordersButton = page.locator("button[routerlink*='orders']");
    }

    async validateOrderConfirmation(){
        await expect(this.odrerConfirmationText).toHaveText(" Thankyou for the order. ");
    }

    async getOrderId(){
        const order = await this.orderIdText.textContent();
        const orderId = order.split(" ")[2];
        return orderId;
    }

    async goToOrdersHistory(){
        await this.ordersButton.click();
    }
    

    
}

module.exports = {OrderReviewPage}
