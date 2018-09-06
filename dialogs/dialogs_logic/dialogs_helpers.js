const mongoose = require('mongoose');
const models = require('../../database/db_schema');
const text = require('../dialogs_content/text_messages');
const fs = require('fs');

/**
 * Method that sends simple text and card messages with ellipsis, which can be
 * controlled by assigning a millisecond value to the parameter time.
 */
 function sendMessageWithEllipsis(session, content, time){
 	
 	session.sendTyping();
 	return new Promise((res, rej) => {
 		setTimeout(() => {
 			res(session.send(content));
 		}, time);
 	});
 }

/**
 * Method that sends simple text and card messages instantly.
 */
 function sendMessageInstant(session, content){
 	return new Promise((res, rej) => {
 		res(session.send(content));
 	});
 }

 function queryDatabaseSummary(userId, dbSecret){
 	return new Promise((res, rej) => {
 		mongoose.connect(dbSecret, (err) => {
 			if(err) rej('no connection');
 			models.summary.find({ pcnNum: userId.pcnNum, vehicleNum:userId.vehicleNum} , (err, result)=> {
 				if(result.length > 0) res(result);
 				else rej('not found');
 			});
 		});
 	});
 }

 function checkDoubleChallenges(session, contraventionData, fileType){
 	return new Promise((res, rej) => {
 		let userId = session.privateConversationData.userId;
 		models.challenge.find({ pcnNum: userId.pcnNum, vehicleNum:userId.vehicleNum} , (err, result)=> {
 			if(result.length > 0) {
 				rej('already challenged');
 			}
 			else {
 				models.pay.find({ pcnNum: userId.pcnNum, vehicleNum:userId.vehicleNum} , (err, result)=> {
 					if(result.length > 0) {
 						rej('already paid');
 					}
 					else {
 						let media = contraventionData.attachments[0].doc.data;
 						let type = contraventionData.attachments[0].doc.contentType;

 						let base64data = new Buffer(media, 'binary').toString('base64');
 						let uri = "data:" + type + ";base64," + base64data;
 						res(uri);
 					}
 					mongoose.connection.close(function () {
 						console.log('Mongoose connection disconnected');
 					});
 				});
 			}
 		});
 	});
 }

 function deleteSummaryMedia(session){
 	delete session.privateConversationData.msg;
 }


// Request file with Authentication Header
function requestWithToken (url) {
	return obtainToken().then(function (token) {
		return request({
			url: url,
			headers: {
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'application/octet-stream'
			}
		});
	});
};

function checkRequiresToken(message) {
	return message.source === 'skype' || message.source === 'msteams';
};

function checkFormat(fileDownload, fileType){
	return new Promise((res, rej) => {
		fileDownload.once('data', (chunk) => {
			
			let file = fileType(chunk);
			
			if ((
				file != null) && (file.ext == 'jpg' || file.ext == 'png' || 
				file.ext == 'pdf' || file.ext == 'tif' || file.ext == 'gif'
				)) 
			{
				res(file);
			} else {
				rej('wrong format');
			}
		});
	}).catch((err) => {
		return;
	});
}

function fileDownload(fileDownload, session, attachment, file){
	return new Promise((res, rej) => {

		fileDownload.then((response) => {

			if(response.length > 1000000){
				rej('over size');

			} else {
				session.privateConversationData.challenge.attachments.push( 
				{
					doc: {
						data: response,
						contentType: file.mime
					}
				});
				res('file downloaded');
			};
		});
	})
} 

function validationCust(info, session, dialog){
	return new Promise((res, rej) => {

		let isTrue = info.isTrue;

		// empty field
		if(isTrue){
			if(dialog == 'details'){
				rej(session.replaceDialog('pcnChallengeCustDetails', {reprompt: true, 
					data: info, catch:'emptyField'}));
			} else {
				rej(session.replaceDialog('pcnChallengeCustAddress', {reprompt: true, 
					data: info, catch:'emptyField'}));
			}
			return;
		}

		if(dialog == 'details'){
		// email regex check
		if(!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.([a-zA-Z0-9-]+)$/.test(info.email)){
			rej(session.replaceDialog('pcnChallengeCustDetails', {reprompt: true, 
				data: info, catch:'emailNotValid'}));
		}

		// email matching check
		else if (info.email != info.confirmEmail){
			rej(session.replaceDialog('pcnChallengeCustDetails', {reprompt: true, data: info, catch:'emailNotMatching'}));
		}
		else {
			res('validation okay!');
		}
	} else res('validation okay!');
});
}  

async function endBotSafely(session, msg, time){
	await sendMessageWithEllipsis(session, msg, time);
	await sendMessageInstant(session, text.pcnGoodbye.end3);
	session.endConversation();
}


module.exports = {sendMessageWithEllipsis, sendMessageInstant, queryDatabaseSummary, checkDoubleChallenges, deleteSummaryMedia, requestWithToken, checkRequiresToken, checkFormat, fileDownload, validationCust, endBotSafely};