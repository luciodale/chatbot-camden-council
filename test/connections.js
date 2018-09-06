const assert = require('chai').assert;
const { expect } = require('chai');
const secret = require('../access/config.js');
const mongoose = require('mongoose');
const builder = require('botbuilder');
const { app } = require('../app');
const { connector } = require('../app');


describe('Checking Connections', function() {

	it('Server Connection', function() {
		app.on('listened', function(data) {
			assert(data.server === true);
		});
		app.emit('listened', {server: true});
	}).timeout(2000);

	it('ComsomsDB Connection', function() {
		mongoose.connect(secret.dbUri, (err) => {
			assert(err == undefined);
		})
	}).timeout(2000);

	it('Chat Connector', function() {
		assert(connector.settings.endpoint.botConnectorIssuer === 'https://api.botframework.com');
		assert(connector.settings.endpoint.botConnectorAudience === '9e7ce484-66a3-42d8-b4ff-8164f96049fb');
		assert(connector.settings.endpoint.refreshEndpoint === 'https://login.microsoftonline.com/botframework.com/oauth2/v2.0/token');
		assert(connector.settings.endpoint.refreshScope === 'https://api.botframework.com/.default');

	});
});
