const { UniversalBot } = require('botbuilder');
const { expect } = require('chai');
const { BotTester, TestConnector } = require('bot-tester');
const assert = require('chai').assert;

const builder = require('botbuilder');
const secret = require('../access/config.js');
const card = require('./adaptive_card_messages');
const text = require('../dialogs/dialogs_content/text_messages');


const connector = new TestConnector();

describe('Testing Bot', () => {
	// let bot
	beforeEach(() => {
		bot = new UniversalBot(connector);
	});


	// testing greeting dialog
	it('greeting dialog test', () => {
	 	bot.dialog('/', (session) => {
	 		session.beginDialog('pcnGreeting');
	 	});
	 	require('../dialogs/dialogs_logic/pcn_greeting')(bot);

	 	return new BotTester(bot)
	 	.sendMessageToBot('',text.pcnGreeting.hello, text.pcnGreeting.intro1).runTest();
	 }).timeout(5000);


	 // testing login dialog
	it('login dialog test', () => {
	 	// greeting dialog test
	 	bot.dialog('/', (session) => {
	 		session.beginDialog('pcnLogin');
	 	});

	 	require('../dialogs/dialogs_logic/pcn_login')(bot, builder, secret.dbUri);

	 	return new BotTester(bot)
	 	.sendMessageToBot('', text.pcnLogin.intro1, card.pcn_login)
	 	.runTest();
	 }).timeout(5000);


	// testing challenge description
	it('challenge description dialog test', () => {
	 	// greeting dialog test
	 	bot.dialog('/', (session) => {
	 		session.beginDialog('pcnChallengeDescription');
	 	});

	 	require('../dialogs/dialogs_logic/pcn_challenge_description')(bot, builder);

	 	return new BotTester(bot)
	 	.sendMessageToBot('', text.pcnChallengeDescription.description)
	 	.runTest();
	 }).timeout(5000);


	// testing challenge details
	it('challenge customer details dialog test', () => {
	 	// greeting dialog test
	 	bot.dialog('/', (session) => {
	 		session.beginDialog('pcnChallengeCustDetails');
	 	});

	 	require('../dialogs/dialogs_logic/pcn_challenge_cust_details')(bot, builder);

	 	return new BotTester(bot)
	 	.sendMessageToBot('', text.pcnChallengeUserData.intro1)
	 	.runTest();
	 }).timeout(5000);


	// testing challenge address
	it('challenge customer address dialog test', () => {
	 	// greeting dialog test
	 	bot.dialog('/', (session) => {
	 		session.beginDialog('pcnChallengeCustAddress');
	 	});

	 	require('../dialogs/dialogs_logic/pcn_challenge_cust_address')(bot, builder);

	 	return new BotTester(bot)
	 	.sendMessageToBot('', text.pcnChallengeUserAddress.intro1)
	 	.runTest();
	 }).timeout(5000);


	// testing summary attachments
	it('challenge summary dialog test', () => {
	 	// greeting dialog test
	 	bot.dialog('/', (session) => {
	 		session.beginDialog('pcnGoodbye');
	 	});

	 	require('../dialogs/dialogs_logic/pcn_goodbye')(bot);

	 	return new BotTester(bot)
	 	.sendMessageToBot('', text.pcnGoodbye.end1, text.pcnGoodbye.end2)
	 	.runTest();
	 }).timeout(5000);
});

