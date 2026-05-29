const { expect } = require("@playwright/test");
class CheckoutPage{
    constructor(page){
        this.page = page;
        this.selectCountryInput = page.locator('[placeholder="Select Country"]');
        this.dropdown = page.locator(".ta-results");
        this.email = page.locator(".user__name label");
        this.placeOrderButton = page.locator(".action__submit");
    }

    async selectCountry(desiredCountry){

        await this.selectCountryInput.pressSequentially(desiredCountry,{ delay: 150 });
        await this.dropdown.waitFor();
        const count = await this.dropdown.locator("button").count();
        for(let i=0;i<count;++i){
            const country = await this.dropdown.locator("button").nth(i).textContent();
            if(country.trim() === desiredCountry){
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
    }

    async validateEmail(email){
        await expect(this.email).toHaveText(email);
    }

    async placeOrder(){
        await this.placeOrderButton.click();
    }   
        
}

module.exports = {CheckoutPage}
