const text = require('../dialogs_content/text_messages');
const helper = require('./dialogs_helpers');
const card = require('../dialogs_content/adaptive_card_messages');
const mongoose = require('mongoose');
const models = require('../../database/db_schema');

module.exports = function(bot, builder, dbSecret) {
	bot.dialog('checkoutReceipt', async function (session, args) {

		let paymentRequest = args.paymentRequest;
		let chargeResult = args.chargeResult;
		let orderId = chargeResult.orderId;

		mongoose.connect(dbSecret, (err) => {
			if(err){
				helper.endBotSafely(session, text.pcnExceptions.ex1, 1000);
				return;
			}
			console.log('connected to db');
			let data =  {
				pcnNum: paymentRequest.id,
				vehicleNum: chargeResult.total.label,
				balance: chargeResult.total.amount.value,
			}

			models.summary.findOne({pcnNum: data.pcnNum} , (err, result) => {
				result.status = 'Paid';
				result.save();
			});


			let sendDB = new models.pay(data);
			console.log(sendDB);

			sendDB.save().then(()=> {
				console.log('saved in db');
				mongoose.connection.close(function () {
					console.log('Mongoose connection disconnected');
					session.endDialog();
				});

			}).catch((err) => {
				helper.endBotSafely(session, text.pcnExceptions.ex1, 1000);
				return;
			});
		});

		let msg = new builder.Message(session).addAttachment(card.pcnAfterPayment(args));
		await helper.sendMessageWithEllipsis(session, text.afterPayment.receipt, 1000);
		await helper.sendMessageWithEllipsis(session, msg, 1000);
		await helper.sendMessageWithEllipsis(session, text.afterPayment.goodbye, 1000);
		await helper.sendMessageInstant(session, text.pcnGoodbye.end3);

		session.endConversation();
	});

	bot.dialog('checkoutFailed', function (session, args) {
		session.endDialog('Could not process your payment: %s', args.errorMessage);
	});



};


