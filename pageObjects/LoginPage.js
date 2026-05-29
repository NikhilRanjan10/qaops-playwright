class LoginPage{

    constructor(page){
        this.page = page;
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginButton = page.locator("#login")
        this.productTitles = page.locator(".card-body b");
    }

    async goToLoginPage(){
        await this.page.goto('https://rahulshettyacademy.com/client/');
    }

    async validLogin(username,password){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        await this.productTitles.last().waitFor();
    }
}
module.exports = {LoginPage}