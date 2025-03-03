import { APIContracts, APIControllers } from 'authorizenet';
import configs from '../../constant';  // Ensure you have your API credentials here

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {

            console.log("Received Request Body:", req.body);
            const { contactDetails, travelers, cardDetails, billingInfo } = req.body;

            // // Validate input data before proceeding
            // if (!travelers || !cardDetails || !billingInfo) {
            //     return res.status(400).json({ success: false, message: 'Missing required information.' });
            // }

            const merchantAuthenticationType = new APIContracts.MerchantAuthenticationType();
            merchantAuthenticationType.setName(configs.apiLoginKey);
            merchantAuthenticationType.setTransactionKey(configs.transactionKey);

            // Credit Card Information
            const creditCard = new APIContracts.CreditCardType();
            creditCard.setCardNumber(`${cardDetails.cardNo}`);
            creditCard.setExpirationDate(`${cardDetails.expiry.month}${cardDetails.expiry.year.slice(-2)}`);
            creditCard.setCardCode(`${cardDetails.expiry.cvv}`);

            const paymentType = new APIContracts.PaymentType();
            paymentType.setCreditCard(creditCard);

            // Billing Information
            const billTo = new APIContracts.CustomerAddressType();
            billTo.setFirstName(`${travelers[0].firstName}`);
            billTo.setLastName(`${travelers[0].lastName}`);
            billTo.setAddress(`${billingInfo.address}`);
            billTo.setCity(`${billingInfo.city}`);
            billTo.setState(`${billingInfo.state}`);
            billTo.setZip(`${billingInfo.postalCode}`);
            billTo.setCountry(`${billingInfo.country}`);

            // Customer Request
            var customer = new APIContracts.CustomerDataType();
            customer.setEmail(`${contactDetails.Email}`);

            // Order Details (Dynamic Invoice Number)
            const orderDetails = new APIContracts.OrderType();
            orderDetails.setInvoiceNumber('INV-' + new Date().getTime());
            orderDetails.setDescription(`Flight Reservation for ${travelers[0].firstName} ${travelers[0].lastName}`);

            // Transaction Request
            const transactionRequestType = new APIContracts.TransactionRequestType();
            transactionRequestType.setTransactionType(APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
            transactionRequestType.setPayment(paymentType);
            transactionRequestType.setAmount(100); // Example amount
            transactionRequestType.setOrder(orderDetails);
            transactionRequestType.setBillTo(billTo);
            transactionRequestType.setCustomer(customer); // Attach customer email for receipt

            const createRequest = new APIContracts.CreateTransactionRequest();
            createRequest.setMerchantAuthentication(merchantAuthenticationType);
            createRequest.setTransactionRequest(transactionRequestType);

            const ctrl = new APIControllers.CreateTransactionController(createRequest.getJSON())

            // Execute the transaction and wait for the response
            const apiResponse = await new Promise((resolve, reject) => {
                ctrl.execute(function () {
                    const response = ctrl.getResponse();
                    if (response) {
                        resolve(response);
                    } else {
                        reject(new Error('No response from Payment Gateway'));
                    }
                });
            });

            // Process the response after receiving it
            const response = new APIContracts.CreateTransactionResponse(apiResponse);

            if (response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK) {
                // Transaction successful
                const transactionId = response.getTransactionResponse().getTransId();
                return res.status(200).json({
                    success: true,
                    message: 'Transaction Successful!',
                    transactionId: transactionId,
                });

            } else {
                // Handle failure and log detailed errors
                const errors = response.getTransactionResponse().getErrors();
                console.error('Transaction Failed:', errors);
                return res.status(400).json({
                    success: false,
                    message: 'Transaction Failed!',
                    errors: errors || 'Unknown error',
                });
            }

        } catch (error) {
            console.error('Error processing flight reservation:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
        }
    } else {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}

