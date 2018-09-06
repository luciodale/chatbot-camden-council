const card = require('../dialogs_content/adaptive_card_messages');
const text = require('../dialogs_content/text_messages');
const helper = require('./dialogs_helpers');
const mongoose = require('mongoose');
const models = require('../../database/db_schema');
const logo = require('../dialogs_content/assets/logo');


module.exports = function(bot, builder, dbSecret) {
  bot.dialog('pcnChallengeSummary', [

    async function (session, results){

      if(session.message && session.message.value) {
        
        mongoose.connect(dbSecret, (err) => {
          if(err){
            helper.endBotSafely(session, text.pcnExceptions.ex1, 1000);
            return;
          }

          console.log('connected to db');

          let data =  session.privateConversationData.challenge;
          for(let i = 0; i < data.attachments.length; i++){
           data.attachments[i].doc.data = data.attachments[i].doc.data.data;
         }
         data.pcnNum = session.privateConversationData.userId.pcnNum;
         data.vehicleNum = session.privateConversationData.userId.vehicleNum;
         data.status = "Awaiting";

         models.summary.findOne({pcnNum: data.pcnNum} , (err, result) => {
          console.log('update summary status');
          result.status = 'Challenged';
          result.save();
        });

         let sendDB = new models.challenge(data);
         sendDB.save().then(()=> {
          console.log('saved in db');
          
          mongoose.connection.close(function () {
            console.log('Mongoose connection disconnected');
            session.endDialog();
          });

        }).catch((err) => {
          console.log(err);
          helper.endBotSafely(session, text.pcnExceptions.ex1, 1000);
          return;
        });
      }); 
      } else {
        let msg = new builder.Message(session).addAttachment(card.pcnChallengeSummary(session.privateConversationData, logo));
        session.send(msg)
      }
    }
    ]);
};