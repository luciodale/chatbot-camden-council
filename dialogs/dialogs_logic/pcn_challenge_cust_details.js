const card = require('../dialogs_content/adaptive_card_messages');
const text = require('../dialogs_content/text_messages');
const helper = require('./dialogs_helpers');

module.exports = function(bot, builder) {
	bot.dialog('pcnChallengeCustDetails', [

		async function (session, args){

			if (args && args.reprompt) {
				let msg = new builder.Message(session).addAttachment(card.pcnChallengeUserData(args.data));
				let simpleText;

				switch(args.catch){
					case 'emptyField': 
					simpleText = text.pcnChallengeUserData.errEmpty;
					break;
					case 'emailNotValid':
					simpleText = text.pcnChallengeUserData.errEmail;
					break;
					case 'emailNotMatching':
					simpleText = text.pcnChallengeUserData.errEmailMatch;
				}

				await helper.sendMessageWithEllipsis(session, simpleText, 1000);
				await helper.sendMessageWithEllipsis(session, msg, 1000);
				return;
			}
			else if (session.message && session.message.value) {

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
					let validation = await helper.validationCust(session.privateConversationData.challenge, session, 'details');
				} catch(dialog){
					console.log('validation failed!');
					return;
				}
				delete session.privateConversationData.challenge.confirmEmail;
				session.endDialog();
			} else {
				let msg = new builder.Message(session).addAttachment(card.pcnChallengeUserData());
				await helper.sendMessageWithEllipsis(session, text.pcnChallengeUserData.intro1, 1000);
				await helper.sendMessageWithEllipsis(session, msg, 1000);
			}
		}
		]);
};