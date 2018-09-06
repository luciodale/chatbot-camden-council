const helper = require('../dialogs_logic/dialogs_helpers');
const text = require('../dialogs_content/text_messages');

module.exports = function(bot, builder) {
    bot.dialog('pcnLuisCancel', [

       function (session){
        builder.Prompts.choice(session, 'Are you sure you want to leave?', 'Yes|No', { listStyle: 3 });
    }, 
    function (session, results){
        if(results.response.entity === 'Yes'){
            session.send('Alright! See you soon.. Goodbye!');
            session.send(text.pcnGoodbye.end3);
            session.endConversation();
        } else {
            session.endDialog('Great! Type anything and I\'ll bring you back where you left!');
        }   
    } ]);
};