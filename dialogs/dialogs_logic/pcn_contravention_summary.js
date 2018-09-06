const card = require('../dialogs_content/adaptive_card_messages');
const text = require('../dialogs_content/text_messages');
const helper = require('./dialogs_helpers');

module.exports = function(bot, builder) {
	bot.dialog('pcnContraventionSummary', [

		async function(session, args){

			try {
				if (args && args.reprompt) {
					let cardss = card.pcnContraventionSummary(session.privateConversationData.msg, session.privateConversationData.link);
					let msg = new builder.Message(session).addAttachment(cardss);
					await helper.sendMessageWithEllipsis(session, text.pcnContraventionSummary.intro1, 1000);
					await helper.sendMessageWithEllipsis(session, msg, 1000);
					return;
				}
				if (session.message && session.message.text) {
					if(session.message.text === 'Challenge' || session.message.text === 'Make Payment'){
						
						session.endDialogWithResult({option: session.message.text});
					} else {
						session.replaceDialog('pcnContraventionSummary', {reprompt:true});

					}
				} else {


					let cardss = card.pcnContraventionSummary(session.privateConversationData.msg, session.privateConversationData.link);
					
					let msg = new builder.Message(session).addAttachment(cardss);
					await helper.sendMessageWithEllipsis(session, text.pcnContraventionSummary.intro1, 1000);
					await helper.sendMessageWithEllipsis(session, msg, 1000);
				}
			} catch(err) {
				console.log('ERROR', err);
				return;
			}
		}
		]);
};



