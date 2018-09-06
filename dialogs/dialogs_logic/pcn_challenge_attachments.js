const card = require('../dialogs_content/adaptive_card_messages');
const text = require('../dialogs_content/text_messages');
const helper = require('./dialogs_helpers');
var Promise = require('bluebird');
var request = require('request-promise').defaults({ encoding: null });
const fileType = require('file-type');



module.exports = function(bot, builder, connector) {
    
   bot.dialog('pcnChallengeAttachments', [
       
       async function (session, args, results){

         if (args && args.reprompt) {

          if(args.size){
           let err1 = text.pcnChallengeAttachments.err1;
           await helper.sendMessageWithEllipsis(session, err1, 1000);
         } else {
           let err2 = args.name + text.pcnChallengeAttachments.err2;
           await helper.sendMessageWithEllipsis(session, err2, 1000);
         } 
         let err3 = text.pcnChallengeAttachments.err3
         await helper.sendMessageWithEllipsis(session, err3, 1000);
         return;
       }

       if(session.message && session.message.attachments.length > 0){

        session.privateConversationData.challenge.attachments = [];
		      // Message with attachment, proceed to download it.
        	       // Skype & MS Teams attachment URLs are secured by a JwtToken, 
        		// so we need to pass the token from our bot.
        	   // Promise for obtaining JWT Token (requested once)
            var obtainToken = Promise.promisify(connector.getAccessToken.bind(connector));
            var msg = session.message;
            let attachment;

            for(let i = 0; i < msg.attachments.length; i++){
             try {
              attachment = msg.attachments[i];
              //Inspired by: https://github.com/Microsoft/BotBuilder-Samples/tree/master/Node/core-ReceiveAttachment
              let fileDownload = helper.checkRequiresToken(msg)
              ? helper.requestWithToken(attachment.contentUrl)
              : request(attachment.contentUrl);

              let ext = await helper.checkFormat(fileDownload, fileType);
              let outcome = await helper.fileDownload(fileDownload, session, attachment, ext);

              if(i == (msg.attachments.length - 1)){
                session.endDialogWithResult({option: ''});
              }
            }
            catch(err) {
              if(err == 'wrong format'){
               session.replaceDialog('pcnChallengeAttachments', {reprompt:true, name:attachment.name, size:false});
             }
             else if('over size'){
               session.replaceDialog('pcnChallengeAttachments', {reprompt:true, name:attachment.name, size:true});
             } else {
              await helper.sendMessageWithEllipsis(session, text.pcnExceptions.ex2, 1000);
              session.endDialog();

            }
            return;
          } 
        }
      }
      else {
        await helper.sendMessageWithEllipsis(session, text.pcnChallengeAttachments.intro1, 1000);
      }
    }
    ])
 };
