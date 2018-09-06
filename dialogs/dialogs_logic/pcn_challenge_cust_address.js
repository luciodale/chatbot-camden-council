const card = require('../dialogs_content/adaptive_card_messages');
const text = require('../dialogs_content/text_messages');
const helper = require('./dialogs_helpers');

module.exports = function(bot, builder) {
	bot.dialog('pcnChallengeCustAddress', [

		async function (session, args){

			let msg = new builder.Message(session).addAttachment(card.pcnChallengeUserAddress());

			if (args && args.reprompt) {
				
				let msg = new builder.Message(session).addAttachment(card.pcnChallengeUserAddress(args.data));

				await helper.sendMessageWithEllipsis(session, text.pcnChallengeUserAddress.errEmpty, 1000);
				await helper.sendMessageWithEllipsis(session, msg, 1000);
				return;
			}

			if (session.message && session.message.value) {
				session.privateConversationData.challenge.isTrue = false;

				for (x in session.message.value) {
					
					let info = session.message.value[x];
					
					if(/^\s*$/.test(info)){
						session.privateConversationData.challenge.isTrue = true;
						continue;
					}
					session.privateConversationData.challenge[x] = info;
				}
				try {
					let validation = await helper.validationCust(session.privateConversationData.challenge, session, 'address');
				} catch(dialog){
					console.log('validation failed!');
					return;
				}
				delete session.privateConversationData.challenge.isTrue;
				session.endDialog();
			} else {

				await helper.sendMessageWithEllipsis(session, text.pcnChallengeUserAddress.intro1, 1000);
				await helper.sendMessageWithEllipsis(session, msg, 1000);
			}
		}
		]);
};