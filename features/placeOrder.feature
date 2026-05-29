Feature: Ecommerce Validations
    @Regression
    Scenario: Placing the order

        Given user logs in to the application with "nikhil123456@gmail.com" and "Nikhil@123"
        When user add "ZARA COAT 3" to the cart
        Then verify "ZARA COAT 3" is displayed in the cart
        When user enters order details and places the order
        Then verify order is present in the orderHistory