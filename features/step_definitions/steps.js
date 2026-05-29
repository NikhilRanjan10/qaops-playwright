const { Given, When, Then } = require('@cucumber/cucumber')


Given('user logs in to the application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    
    const loginPage = this.pageObjectManager.getLoginPage();
    await loginPage.goToLoginPage();
    await loginPage.validLogin(username, password);
    this.email = username;

});


When('user add {string} to the cart', async function (product) {
    const dashboardPage = this.pageObjectManager.getDashboardPage();
    await dashboardPage.searchProductAndAddToCart(product);
    await dashboardPage.navigateToCart();
});

Then('verify {string} is displayed in the cart', async function (product) {
    const cartPage = this.pageObjectManager.getCartPage();
    await cartPage.verifyProductIsAddedToCart(product);
    await cartPage.proceedToCheckout();
    this.desiredProduct = product;
});

When('user enters order details and places the order', async function () {
    const checkoutPage = this.pageObjectManager.getCheckoutPage();
    await checkoutPage.selectCountry("Cuba");
    await checkoutPage.validateEmail(this.email);
    await checkoutPage.placeOrder();

    const orderReviewPage = this.pageObjectManager.getOrderReviewPage();
    await orderReviewPage.validateOrderConfirmation();
    this.orderId = await orderReviewPage.getOrderId();
    await orderReviewPage.goToOrdersHistory();
});

Then('verify order is present in the orderHistory', async function () {
    const orderHistoryPage = this.pageObjectManager.getOrderHistoryPage();
    await orderHistoryPage.validateOrderIdAndViewOrder(this.orderId, this.desiredProduct);
    await orderHistoryPage.validateOrderIdOnViewOrdersPage(this.orderId);
});
