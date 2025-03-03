import { APIContracts, APIControllers } from 'authorizenet';
import configs from '../../../../constant';

export async function POST(request) {

    try {

        const { travelers, cardDetails, billingInfo, contactDetails, selectedFlight } = await request.json();
        console.log({ travelers, cardDetails, billingInfo, contactDetails, selectedFlight }, "JSON DATA BACKEND");

        const merchantAuthenticationType = new APIContracts.MerchantAuthenticationType();
        merchantAuthenticationType.setName(process.env.APILOGINID);
        merchantAuthenticationType.setTransactionKey(process.env.TRANSACTIONKEY);

        // Credit Card information
        const expiryMonth = cardDetails.expiry.month; // e.g., 7 for July
        const expiryYear = cardDetails.expiry.year; // e.g., 2027

        // Ensure month is two digits (e.g., '07' instead of '7')
        const formattedMonth = String(expiryMonth).padStart(2, '0');

        console.log(formattedMonth, "FORMATTEDMONTH");

        // Format expiration date as 'YYYY-MM'
        const expirationDate = `${expiryYear}-${formattedMonth}`;
        const creditCard = new APIContracts.CreditCardType();
        creditCard.setCardNumber(`${cardDetails.cardNo}`);

        // creditCard.setExpirationDate(`${cardDetails.expiry.month}${cardDetails.expiry.year.slice(-2)}`);
        creditCard.setExpirationDate(expirationDate);
        creditCard.setCardCode(`${cardDetails.expiry.cvv}`);

        const paymentType = new APIContracts.PaymentType();
        paymentType.setCreditCard(creditCard);

        // Billing Information
        var billTo = new APIContracts.CustomerAddressType();
        billTo.setFirstName(`${travelers[0].firstName}`);
        billTo.setLastName(`${travelers[0].lastName}`);
        billTo.setCompany('Jetquins Travel PVT. LTD.');
        billTo.setAddress(`${billingInfo.address}`);
        billTo.setCity(`${billingInfo.city}`);
        billTo.setState(`${billingInfo.state}`);
        billTo.setZip(`${billingInfo.postalCode}`);
        billTo.setCountry(`${billingInfo.country}`);

        // Customer Request
        var customer = new APIContracts.CustomerDataType();
        customer.setEmail(`${contactDetails.Email}`);

        // Order details (dynamic invoice number)
        const orderDetails = new APIContracts.OrderType();
        orderDetails.setInvoiceNumber('INV-' + new Date().getTime());  // Dynamic Invoice Number
        orderDetails.setDescription(`Flight Reservation for ${travelers[0].firstName} ${travelers[0].lastName}`);

        const amount = parseFloat(selectedFlight.travelerPricings[0].price.total);

        // Transaction details (example amount)
        const transactionRequestType = new APIContracts.TransactionRequestType();
        transactionRequestType.setTransactionType(APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
        transactionRequestType.setPayment(paymentType);
        transactionRequestType.setAmount(amount);
        transactionRequestType.setOrder(orderDetails);
        transactionRequestType.setBillTo(billTo);
        transactionRequestType.setCustomer(customer); // Attach customer email for receipt

        // Create transaction request
        const createRequest = new APIContracts.CreateTransactionRequest();
        createRequest.setMerchantAuthentication(merchantAuthenticationType);
        createRequest.setTransactionRequest(transactionRequestType);

        const ctrl = new APIControllers.CreateTransactionController(createRequest.getJSON());

        // Execute transaction
        const apiResponse = await new Promise((resolve, reject) => {
            ctrl.execute(function () {
                const apiResponse = ctrl.getResponse();
                if (apiResponse != null) {
                    resolve(apiResponse);
                } else {
                    reject(new Error("No response from payment gateway"));
                }
            });
        });

        const response = new APIContracts.CreateTransactionResponse(apiResponse);

        if (
            response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK
        ) {
            // Transaction successful
            return new Response(
                JSON.stringify({
                    success: true,
                    message: "Transaction Successful",
                    transactionId: response.getTransactionResponse().getTransId(),
                }),
                { status: 200 }
            );
        } else {
            // Log detailed error messages from Authorize.Net response
            const messages = response.getMessages();
            let errorMessages = [];

            if (messages && messages.getMessage()) {
                const messageArray = messages.getMessage();
                messageArray.forEach((message) => {
                    errorMessages.push(
                        `Code: ${message.getCode()}, Text: ${message.getText()}`
                    );
                });
            }

            // Return detailed error messages
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Transaction Failed",
                    errorDetails: errorMessages, // Detailed error information
                }),
                { status: 400 }
            );
        }
    } catch (error) {
        // Log detailed error for debugging
        console.error("Error processing flight reservation:", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Internal Server Error",
                error: error.message,
            }),
            { status: 500 }
        );
    }
}