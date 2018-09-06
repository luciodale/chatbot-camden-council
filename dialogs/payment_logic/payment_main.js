var util = require('util');
var builder = require('botbuilder');
var payments = require('./payments');
var checkout = require('./checkout');
const appMethods = require('./app_fileofmain')

// Payment procedure inspired by: https://www.marquam.com/Documents/Microsoft%20Bot%20Framework%20Documentation.pdf
module.exports = function(bot, connector) {
  bot.dialog('pcnPay', (session) => {

  // Store userId for later, when reading relatedTo to resume dialog with the receipt
  let cartId = session.privateConversationData.msg.pcnNum;
  let CartIdKey = 'cardId';

    // Create PaymentRequest obj based on product information
    var paymentRequest = appMethods.createPaymentRequest(cartId, session.privateConversationData.msg);

    var buyCard = new builder.HeroCard(session)
    .title('Payment Process', session.privateConversationData.msg.balance)
    .subtitle('Contravention Payment')
    .buttons([
      new builder.CardAction(session)
      .title('Pay %s USD', session.privateConversationData.msg.balance)
      .type(payments.PaymentActionType)
      .value(paymentRequest)
      ]);

    session.send(new builder.Message(session)
      .addAttachment(buyCard));

  });
}