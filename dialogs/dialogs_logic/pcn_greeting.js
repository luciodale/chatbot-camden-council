const card = require('../dialogs_content/adaptive_card_messages');
const text = require('../dialogs_content/text_messages');
const helper = require('./dialogs_helpers');

module.exports = function(bot) {
	bot.dialog('pcnGreeting', [

		async function (session){
			// session.send()
			await helper.sendMessageWithEllipsis(session, text.pcnGreeting.hello, 1000);
			await helper.sendMessageWithEllipsis(session, text.pcnGreeting.intro1, 2000);
			session.endDialog();
		}])
};



