var builder = require('botbuilder');
var payments = require('./payments');
var checkout = require('./checkout');
const appMethods = require('./app_fileofmain');


module.exports = function(bot, connector) {

 connector.onInvoke((invoke, callback) => {

  // This is a temporary workaround for the issue that the channelId for "webchat" is mapped to "directline" in the incoming RelatesTo object
  invoke.relatesTo.channelId = invoke.relatesTo.channelId === 'directline' ? 'webchat' : invoke.relatesTo.channelId;

  var storageCtx = {
    address: invoke.relatesTo,
    persistConversationData: true,
    conversationId: invoke.relatesTo.conversation.id
  };

  connector.getData(storageCtx, (err, data) => {

    var cartId = '1';
    if (!invoke.relatesTo.user && cartId) {
      var userId ='userId';
      invoke.relatesTo.useAuth = true;
      invoke.relatesTo.user = { id: userId };
    }

    // Continue based on PaymentRequest event
    var paymentRequest = null;
    switch (invoke.name) {
   
       case payments.Operations.PaymentCompleteOperation:
       let paymentRequestComplete = invoke.value;
       paymentRequest = paymentRequestComplete.paymentRequest;
       let paymentResponse = paymentRequestComplete.paymentResponse;
        // Validate address 
        checkout
        .validateAndCalculateDetails(paymentRequest) 
         .then(updatedPaymentRequest =>
            // Process Payment
            checkout
            .processPayment(paymentRequest, paymentResponse)
            .then(chargeResult => {
                // return success
                callback(null, { result: "success" }, 200);
                // send receipt to user
                
                bot.beginDialog(invoke.relatesTo, 'checkoutReceipt', {
                 paymentRequest: updatedPaymentRequest,
                 chargeResult: chargeResult,
               });
              })
            ).catch(err => {
            // return error to onInvoke handler
            callback(err);
            // send error message back to user
            console.log(err);
            bot.beginDialog(invoke.relatesTo, 'checkoutFailed', {
             errorMessage: err.message
           });
          });

            break;
          }

        });
});

}