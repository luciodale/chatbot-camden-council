const helper = require('../dialogs_logic/dialogs_helpers');
const text = require('../dialogs_content/text_messages');


module.exports = function(bot, builder) {
    bot.dialog('pcnLuisHelp',

     async function (session){
        
        await helper.sendMessageWithEllipsis(session, text.pcnLuisHelp.intro1, 2000);
        await helper.sendMessageWithEllipsis(session, text.pcnLuisHelp.intro2, 1000);
        session.endDialog();

    });
};