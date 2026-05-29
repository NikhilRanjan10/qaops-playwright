const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {CartPage} = require('./CartPage');
const {CheckoutPage} = require('./CheckoutPage');
const {OrderReviewPage} = require('./OderReviewPage');
const {OrderHistoryPage} = require('./OrderHistoryPage');

class PageObjectManager{
    constructor(page){
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.orderReviewPage = new OrderReviewPage(page);
        this.orderHistoryPage = new OrderHistoryPage(page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getCartPage(){
        return this.cartPage;
    }

    getCheckoutPage(){
        return this.checkoutPage;
    }

    getOrderReviewPage(){
        return this.orderReviewPage;
    }

    getOrderHistoryPage(){
        return this.orderHistoryPage;
    }
}
module.exports = {PageObjectManager}
