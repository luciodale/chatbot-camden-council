const card = require('../dialogs_content/adaptive_card_messages');
const text = require('../dialogs_content/text_messages');
const helper = require('./dialogs_helpers');

module.exports = function(bot, builder) {
	// Welcome message for Node.js bot
	bot.on('conversationUpdate', function (message) {
		if (message.membersAdded) {
			message.membersAdded.forEach(function (identity) {
				if (identity.id == message.address.bot.id) {
                // Bot is joining conversation
                // - For WebChat channel you'll get this on page load.
                var reply = new builder.Message()
                .address(message.address)
                .text("Type something to start!");
                bot.send(reply);
            } 
            // else {
                
            //     var address = Object.create(message.address);
            //     address.user = identity;
            //     var reply = new builder.Message()
            //     .address(address)
            //     .text("Hello %s", identity.name);
            //     bot.send(reply);
            // }
        });
		}
	});

};



