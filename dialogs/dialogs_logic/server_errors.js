const card = require('../dialogs_content/adaptive_card_messages');
const text = require('../dialogs_content/text_messages');
const helper = require('./dialogs_helpers');

module.exports = function(bot) {
	bot.dialog('pcnServerError', [

		function (session){
			helper.endBotSafely(session, text.pcnExceptions.ex4, 1000);
		}])
};



