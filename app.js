const express = require('express');
const builder = require('botbuilder');
const azure = require('botbuilder-azure');
const secret = require('./access/config.js');
const serveStatic = require('serve-static');

// Setup Express Server
const app = express();

// web test only
app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
	res.sendFile('/index.html');
}); 

// Setup server port
app.set('port', secret.port || 3978);

// Server listening to port			
app.listen(app.get('port'), function (req) {
	console.log('Express server listening to port %s', app.get('port'));
});


// Create chat connector for communicating with the Bot Framework Service
const connector = new builder.ChatConnector({
	appId: secret.connector.appId,
	appPassword: secret.connector.appPassword,
	openIdMetadata: secret.connector.openIdMetadata
});

// Listen for messages from users 
app.post('/api/messages', connector.listen());

// AZURE TABLES
const tableName = 'botdata';
const azureTableClient = new azure.AzureTableClient(tableName, secret.azureStorage);
const tableStorage = new azure.AzureBotStorage({ gzipData: false }, azureTableClient);
const inMemoryStorage = new builder.MemoryBotStorage();

// Cosmosdb storage
// const documentDbOptions = {
// 	host: secret.documentDbOptions.host,
// 	masterKey: secret.documentDbOptions.masterKey,
// 	database: 'botdocs',   
// 	collection: 'botdata'
// };
// var docDbClient = new azure.DocumentDbClient(documentDbOptions);
// var cosmosStorage = new azure.AzureBotStorage({ gzipData: false }, docDbClient);

const luisAppId = secret.luis.luisAppId;
const luisAPIKey = secret.luis.luisAPIKey;
const luisAPIHostName = secret.luis.luisAPIHostName;

const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v2.0/apps/' + luisAppId + '?subscription-key=' + luisAPIKey;


// *************** MAIN FLOW ***********************

// This bot ensures user's profile is up to date.
const bot = new builder.UniversalBot(connector, 
	[
	// greeting messages
	function (session) {
		session.beginDialog('pcnGreeting');
	},
	// credentials prompt
	function (session) {
		session.beginDialog('pcnLogin');
	},
	// details and challenge / pay options
	function(session, results){
		delete session.message.value;                    
		session.beginDialog('pcnContraventionSummary', results);
		
	}, 
	function(session, results){
		delete session.message.text;                    
		delete session.message.value;                    
		if(results.option === 'Challenge') {
			session.privateConversationData.challenge = {};
			session.beginDialog('pcnChallengeDescription');
		}
		else if(results.option === 'Make Payment') session.beginDialog('pcnPay');
	},

	function (session, results){
		delete session.message.value;  
		builder.Prompts.choice(session, "Do you want to attach any supporting file?", "Yes|No", { listStyle: 3 });
		
	}, 
	function (session, results, next){
		// this is not mandatory
		if(results.response.entity === 'Yes'){
			session.beginDialog('pcnChallengeAttachments');
		} else {
			next();
		}		
	}, 
		// mandatory! credentials 
		function (session, results){
			session.beginDialog('pcnChallengeCustDetails');

		},

		function (session, results){
			delete session.message.value;
			session.beginDialog('pcnChallengeCustAddress');
		},
		function (session, results){
			delete session.message.value;
			session.beginDialog('pcnChallengeSummary');	
		},

		function(session, results){
			delete session.message.value;
			session.beginDialog('pcnGoodbye');
			session.endConversation();
		}

		])
.set('storage', inMemoryStorage);
// .set('storage', cosmosStorage); // Register in-memory storage 

// Create a recognizer that gets intents from LUIS, and add it to the bot
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
bot.recognizer(recognizer);

// Handling Server Errors
// bot.on('error', (err) => {
// 	console.log("this should not happen:", err);
// bot.beginDialog('pcnServerError');
// });

// COGNITIVE SERVICES - > LUIS

// Logout from chat
bot.beginDialogAction('pcnCancelAction', 'pcnLuisCancel', 
	{ matches: 'Logout',     
	intentThreshold: 0.67
});

// Ask for help
bot.beginDialogAction('pcnHelpAction', 'pcnLuisHelp', 
	{ matches: 'Help',     
	intentThreshold: 0.67
});

// Pay at any time
bot.beginDialogAction('pcnPayAction', 'pcnLuisPay', 
	{ matches: 'Pay',     
	intentThreshold: 0.67
});

// pcnCancel
require('./dialogs/dialogs_luis/pcn_luis_cancel')(bot, builder);

// pcnHelp
require('./dialogs/dialogs_luis/pcn_luis_help')(bot, builder);

// pcnPay
require('./dialogs/dialogs_luis/pcn_luis_pay')(bot, builder);


/* Normal app flow */

// event triggered on new connection 
require('./dialogs/dialogs_logic/pcn_automatic')(bot, builder);

// pcnGreeting
require('./dialogs/dialogs_logic/pcn_greeting')(bot);

// pcnLogin
require('./dialogs/dialogs_logic/pcn_login')(bot, builder, secret.dbUri);

// pcnContraventionSummary
require('./dialogs/dialogs_logic/pcn_contravention_summary')(bot, builder);

// pcnPay
require('./dialogs/payment_logic/payment_main')(bot, builder);
require('./dialogs/payment_logic/invoke')(bot, connector);
require('./dialogs/dialogs_logic/pcn_after_payment')(bot, builder, secret.dbUri);

// pcnChallengeDescription
require('./dialogs/dialogs_logic/pcn_challenge_description')(bot, builder);

// pcnChallengeAttachments
require('./dialogs/dialogs_logic/pcn_challenge_attachments')(bot, builder, connector);

// pcnChallengeCustDetails
require('./dialogs/dialogs_logic/pcn_challenge_cust_details')(bot, builder);

// pcnChallengeCustAddress
require('./dialogs/dialogs_logic/pcn_challenge_cust_address')(bot, builder);

// pcnChallengeSummary
require('./dialogs/dialogs_logic/pcn_challenge_summary')(bot, builder, secret.dbUri);

// pcnGoodbye
require('./dialogs/dialogs_logic/pcn_goodbye')(bot);

// pcnGoodbye
require('./dialogs/dialogs_logic/server_errors')(bot);

// module.exports = bot;
module.exports = {app, connector};

