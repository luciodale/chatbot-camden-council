const card = require('../dialogs_content/adaptive_card_messages');
const text = require('../dialogs_content/text_messages');
const helper = require('./dialogs_helpers');
const fileType = require('file-type');

module.exports = function(bot, builder, dbSecret) {
	bot.dialog('pcnLogin', [

		async function (session, args){

  			// Variable to store pcn and vehicle numbers
  			let credentials = {};

    		// Variable to hold adaptive card message
    		let msg = new builder.Message(session).addAttachment(card.pcnLogin());

    		try {
			// Question reloaded because the credentials are wrong
			// --> Default case placed at the end
			if (args && args.reprompt) {
				await helper.sendMessageWithEllipsis(session, text.pcnLogin.err, 1000);
				await helper.sendMessageWithEllipsis(session, msg, 1000);
				return;
			}
        	// Submit Action obj was received -> skipped very first time because value = undefined
        	if (session.message && session.message.value) {
                
        		// if credentials are are greater than..
        		if(session.message.value.pcnNum.length  >= 10 && session.message.value.vehicleNum.length >= 7){

        			session.privateConversationData.userId = {};
        			session.privateConversationData.userId.pcnNum = session.message.value.pcnNum.toLowerCase();
        			session.privateConversationData.userId.vehicleNum = session.message.value.vehicleNum.toLowerCase();

 					// retrieve summary
 					helper.queryDatabaseSummary(session.privateConversationData.userId, dbSecret)
 					.then(function(result) {
 						session.privateConversationData.msg = result[0];
        				// checking for double challenges
        				return helper.checkDoubleChallenges(session, result[0], fileType);
        			})
 					.then(function(path){
        				// returning url file
        				session.privateConversationData.link = path;
        				session.endDialog();
        			})
 					.catch(function(err) {
        				// printing in console for debugging
        				console.log(err);
        				if(err == 'already challenged') helper.endBotSafely(session, text.pcnExceptions.ex3, 1000);
                        else if(err == 'already paid') helper.endBotSafely(session, text.pcnExceptions.ex5, 1000);
        				else if(err == 'not found') session.replaceDialog('pcnLogin', {reprompt:true});
        				else helper.endBotSafely(session, text.pcnExceptions.ex4, 1000)
        					return;
        			});
 				} 
 				else {
	        		// if credentials are not correct
	        		session.replaceDialog('pcnLogin', {reprompt:true});
	        	}
	        } else {
	        	// Default Case!
	        	await helper.sendMessageWithEllipsis(session, text.pcnLogin.intro1, 2000);
	        	await helper.sendMessageWithEllipsis(session, msg, 1000);
	        }
	    } catch(err){
	    	console.log('ERROR:', err);
	    }	
	}])
};