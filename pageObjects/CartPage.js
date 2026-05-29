const { expect } = require("@playwright/test");

class CartPage{
    constructor(page){
        this.page = page
        this.addedItems = page.locator("div li.ng-star-inserted");
        this.checkout = page.locator("text='Checkout'")
    }

    async verifyProductIsAddedToCart(desiredProduct){
        await this.addedItems.last().waitFor();
        const bool = await this.page.locator("h3:has-text('"+desiredProduct+"')").isVisible();
        expect(bool).toBeTruthy();
    }

    async proceedToCheckout(){
        await this.checkout.click();
    }
}
module.exports = {CartPage}