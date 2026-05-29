class APIUtils{
    constructor(apiContext,requestPayload){
        this.apiContext = apiContext,
        this.requestPayload = requestPayload
    }

    async getToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
            data: this.requestPayload
        });
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        return token;        
    }

    async createOrder(orderPayload){
        const response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
                data: orderPayload,
                headers:{
                    'Authorization': response.token,
                    'content-type': 'application/json'
                }
            })
        const orderResponseJson = await orderResponse.json();
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        return response;
    }
}

module.exports = {APIUtils}