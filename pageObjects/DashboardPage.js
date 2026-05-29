class DashboardPage{
    constructor(page){
        this.page = page;
        this.products = page.locator('.card-body');
        this.cart = page.locator("[routerlink*='cart']");
    }

    async searchProductAndAddToCart(desiredProduct){
        const count = await this.products.count();

        for(let i=0;i<count;++i){
            if(await this.products.nth(i).locator('b').textContent() === desiredProduct){
                await this.products.nth(i).locator('text= Add To Cart').click();
                break;
            }
        }
    }

    async navigateToCart(){
        await this.cart.click();
    }   
        
}

module.exports = {DashboardPage}