const dbUri = process.env.CosmosDbAccess;

const connector = {
	appId: process.env.MicrosoftAppId,
	appPassword: process.env.MicrosoftAppPassword,
	openIdMetadata: process.env.BotOpenIdMetadata
};

const port = process.env.port || process.env.PORT;
const azureStorage = process.env['AzureWebJobsStorage'];

// Cosmosdb storage
const documentDbOptions = {
	host: process.env.CosmosOptionsHost,
	masterKey: process.env.CosmosOptionsMasterKey
};

const luis = {
	luisAppId: process.env.LuisAppId,
	luisAPIKey: process.env.LuisAPIKey,
	luisAPIHostName: process.env.LuisAPIHostName
}

module.exports = {connector, port, azureStorage, documentDbOptions, luis, dbUri};
