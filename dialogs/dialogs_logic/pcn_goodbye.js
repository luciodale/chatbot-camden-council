const card = require('../dialogs_content/adaptive_card_messages');
const text = require('../dialogs_content/text_messages');
const helper = require('./dialogs_helpers');

module.exports = function(bot) {
	bot.dialog('pcnGoodbye', [

		async function (session){
			await helper.sendMessageWithEllipsis(session, text.pcnGoodbye.end1, 1000);
			await helper.sendMessageWithEllipsis(session, text.pcnGoodbye.end2, 1000);
			await helper.sendMessageInstant(session, text.pcnGoodbye.end3);
			session.endDialog();
		}])
};



