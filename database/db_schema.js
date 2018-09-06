	const mongoose = require('mongoose');

	const Challenge = new mongoose.Schema({
		pcnNum: {type: String, required: true, unique:true},
		vehicleNum:{type: String, required: true},
		attachments: [{doc:{data: Buffer, contentType: String}}],			
		description: {type: String, required: true},
		entity: {type: String, required: true},
		title: {type: String, required: true},
		firstName: {type: String, required: true},
		lastName: {type: String, required: true},
		phone: {type: Number, required: true},
		email: {type: String, required: true},
		addressLine: {type: String, required: true},
		cityTown: {type: String, required: true},
		postCode: {type: String, required: true},
		status: {type:String, required: true},
		dateTime: { type: Date, default: Date.now },
	});

	const Summary = new mongoose.Schema({
		pcnNum: {type: String, required: true, unique:true},
		vehicleNum: {type: String, required: true},
		dateTime: {type: String, required: true},
		location: {type: String, required: true},
		balance: {type: Number, required: true},
		description: {type: String, required: true},
		attachments: [{doc:{data: Buffer, contentType: String}}],
		status: {type: String, default: 'None'},
	});

	const Pay = new mongoose.Schema({
		pcnNum: {type: String, required: true, unique:true},
		vehicleNum: {type: String, required: true},
		dateTime: { type: Date, default: Date.now },
		balance: {type: Number, required: true},
		status: {type: String, default: 'Paid'},
	});


	const challenge = mongoose.model('Challenge', Challenge);
	const summary = mongoose.model('Summary', Summary);
	const pay = mongoose.model('Pay', Pay);


	module.exports = {challenge, summary, pay};

