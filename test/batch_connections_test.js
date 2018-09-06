const { UniversalBot } = require('botbuilder');
const { expect } = require('chai');
const { BotTester, TestConnector } = require('bot-tester');
const assert = require('chai').assert;

const builder = require('botbuilder');


const connector = new TestConnector();



describe('Handling Multiple Users', () => {

	let bot;
	let users = [];

	for(let i = 0; i < 100; i++){
		users.push({
			user: { id: i + 1}
		});
	}
		beforeEach(() => {
			bot = new UniversalBot(connector);
		});

		let counter = users.length;
		while (counter--) {
			it('Handling user number: ' + counter, () => {
				bot.dialog('/', (session) => {
					session.send(users[counter]);
				});
				
				return new BotTester(bot)
				.sendMessageToBot('testing', users[counter])
				.runTest();
			}).timeout(40);
		}
});