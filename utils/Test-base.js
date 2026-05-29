const base = require('@playwright/test');

exports.customTest = base.test.extend(
    {
        testdataContext:{
            username: "nikhil123456@gmail.com",
            password: "Nikhil@123",
            desiredProduct : "ZARA COAT 3"
        }
    }
)