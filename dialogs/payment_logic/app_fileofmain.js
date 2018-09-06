
const payments = require('./payments');

// PaymentRequest with default options
function createPaymentRequest(cartId, product) {
  if (!cartId) {
    throw new Error('cartId is missing');
  }

  if (!product) {
    throw new Error('product is missing');
  }

  // PaymentMethodData[]
  var paymentMethods = [{
    supportedMethods: [payments.MicrosoftPayMethodName],
    data: {
      mode: process.env.PAYMENTS_LIVEMODE === 'true' ? null : 'TEST',
      merchantId: process.env.PAYMENTS_MERCHANT_ID,
      supportedNetworks: ['visa', 'mastercard'],
      supportedTypes: ['credit']
    }
  }];

  // PaymentDetails
  var paymentDetails = {
    total: {
      label: product.vehicleNum,
      amount: { currency: 'USD', value: product.balance.toFixed(2) },
      pending: true,
    },
    displayItems: [
    {
      label: 'Payment for Contravention Number: ' + product.pcnNum,
      amount: { currency: 'USD', value: product.balance.toFixed(2) }
    }, 
    ],
    // until a shipping address is selected, we can't offer shipping options or calculate taxes or shipping costs
    shippingOptions: []
};

  // PaymentOptions
  var paymentOptions = {
    requestPayerName: true,
    requestPayerEmail: true,
    requestPayerPhone: true,
    requestShipping: false,
    shippingType: 'shipping'
      };

  // PaymentRequest
  return {
    id: product.pcnNum,
    expires: '1.00:00:00',          // 1 day
    methodData: paymentMethods,     // paymethodMethods: paymentMethods,
    details: paymentDetails,        // paymentDetails: paymentDetails,
    options: paymentOptions         // paymentOptions: paymentOptions
};
}

function cleanupConversationData(session) {
  var cartId = session.privateConversationData[CartIdKey];
  delete session.privateConversationData[CartIdKey];
  delete session.privateConversationData[cartId];
}

module.exports = {createPaymentRequest, cleanupConversationData}
