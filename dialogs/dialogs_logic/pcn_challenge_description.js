const card = require('../dialogs_content/adaptive_card_messages');
const text = require('../dialogs_content/text_messages');
const helper = require('./dialogs_helpers');

module.exports = function(bot, builder) {
	bot.dialog('pcnChallengeDescription', [

		async function (session, args){

			let msg = new builder.Message(session).addAttachment(card.pcnChallengeDescription());

			if (args && args.reprompt) {
				await helper.sendMessageWithEllipsis(session, args.err, 1000);
				await helper.sendMessageWithEllipsis(session, msg, 1000);
				return;
			}

			if (session.message && session.message.value) {
				helper.deleteSummaryMedia(session);
				if(session.message.value.button === 'Submit Description'){
					if(session.message.value.MultiLineVal.length >= 50){
						
						session.privateConversationData.challenge._id = session.privateConversationData._id;
						session.privateConversationData.challenge.description = session.message.value.MultiLineVal; 
						
						session.privateConversationData.challenge.attachments = [];
						session.endDialogWithResult({option: session.message.value.button});

					} 
					else {
						session.replaceDialog('pcnChallengeDescription', {reprompt:true, err: text.pcnChallengeDescription.errEmpty});
					}
				} 
			} else {
				await helper.sendMessageWithEllipsis(session, text.pcnChallengeDescription.description, 1000);
				await helper.sendMessageWithEllipsis(session, msg, 1000);
			}
		}
		]);
};