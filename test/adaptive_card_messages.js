module.exports = { 
	pcn_login : 
	{"type":"message","agent":"botbuilder","source":"console","address":{"channelId":"console","user":{"id":"user1","name":"user1"},"bot":{"id":"bot","name":"Bot"},"conversation":{"id":"user1Conversation"}},"attachments":[{"contentType":"application/vnd.microsoft.card.adaptive","content":{"type":"AdaptiveCard","body":[{"type":"Container","items":[{"type":"TextBlock","text":"Your Details","size":"large","weight":"bolder"},{"type":"TextBlock","text":"PCN Number","wrap":true},{"type":"Input.Text","id":"pcnNum","placeholder":"CU12345678"},{"type":"TextBlock","text":"Vehicle number","wrap":true},{"type":"Input.Text","id":"vehicleNum","style":"string","placeholder":"UKPL8TE"}]}],"actions":[{"type":"Action.Submit","title":"Submit","data":{}}]}}]},

}