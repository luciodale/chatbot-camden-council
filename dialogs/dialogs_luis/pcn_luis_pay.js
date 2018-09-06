const helper = require('../dialogs_logic/dialogs_helpers');

module.exports = function(bot, builder) {
    bot.dialog('pcnLuisPay', [

       function (session){
        builder.Prompts.choice(session, 'Do you want to pay now?', 'Yes|No', { listStyle: 3 });
    }, 
    function (session, results){
        if(results.response.entity === 'Yes'){
            console.log("in luis dialog checking session before allowing to pay:");
            console.log(session.privateConversationData.userId);
            if(session.privateConversationData.userId === undefined){
                session.send('You first need to login before paying the challenge...');
                session.endDialog('Type anything to continue with the login');
            } else {
                session.beginDialog('pcnPay');
            }
        } else {
            session.endDialog('Great! Type anything and I\'ll bring you back where you left!');
        }   
    } ]);
};