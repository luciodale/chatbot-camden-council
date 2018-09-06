
const pcnLogin = function() {
	return {
		contentType: "application/vnd.microsoft.card.adaptive",
		content: {
			type: "AdaptiveCard",
			body: [
			{
				"type": "Container",
				"items": [
				
				{
					"type": "TextBlock",
					"text": "Your Details",
					"size": "large",
					"weight": "bolder"
				},
				{
					"type": "TextBlock",
					"text": "PCN Number",
					"wrap": true
				},
				{
					"type": "Input.Text",
					"id": "pcnNum",
					"placeholder": "CU12345678"
				},
				{
					"type": "TextBlock",
					"text": "Vehicle number",
					"wrap": true
				},
				{
					"type": "Input.Text",
					"id": "vehicleNum",
					"style":"string",
					"placeholder": "UKPL8TE"

				}
				]
			}
			],
			"actions": [
			{
				"type": "Action.Submit",
				"title": "Submit",
				"data": {}
			}]
		}
	}
};


const pcnContraventionSummary = function (info, link) {

	return {
		contentType: "application/vnd.microsoft.card.adaptive",
		content: {
			type: "AdaptiveCard",
			body: 
			[
			{
				"type": "Container",
				"items": [
				{
					"type": "TextBlock",
					"text": "PCN Summary",
					"weight": "bolder",
					"size": "medium"
				},
				{
					"type": "ColumnSet",
					"columns": [
					{
						"type": "Column",
						"width": "auto",
						"items": [
						{
							"type": "Image",
							"url": "https://pbs.twimg.com/profile_images/528138047745839106/0eUxJWxF_400x400.jpeg",
							"size": "small",
							"style": "person"
						}
						]
					},
					{
						"type": "Column",
						"width": "stretch",
						"items": [
						{
							"type": "TextBlock",
							"text": info.pcnNum,
							"weight": "bolder",
							"wrap": true
						},
						{
							"type": "TextBlock",
							"spacing": "none",
							"text": info.vehicleNum,
							"isSubtle": true,
							"wrap": true
						}
						]
					}
					]
				}
				]
			},
			{
				"type": "Container",
				"items": [
				{
					"type": "TextBlock",
					"text": info.description,
					"wrap": true
				},
				{
					"type": "FactSet",
					"facts": [
					{
						"title": "Data & Time:",
						"value": info.dateTime
					},
					{
						"title": "Location:",
						"value": info.location
					},
					{
						"title": "Balance:",
						"value": info.balance + " £"
					}
					]
				},
				{
					"type": "Image",
					"url": link,
					"size": "large"
				}
				]
			}
			],
			"actions": [
			{
				"type": "Action.Submit",
				"title": "Challenge",
				"data": "Challenge"
			},
			{
				"type": "Action.Submit",
				"title": "Make Payment",
				"data": "Make Payment"

			}]
		}
	};
};

const pcnChallengeDescription = function () {

	return { 
		contentType: "application/vnd.microsoft.card.adaptive",
		content: {
			type: "AdaptiveCard",
			body: [
			{
				"type": "TextBlock",
				"text": "Description",
				"weight": "bolder",
				"size": "medium"
			},
			{
				"type": "TextBlock",
				"text": "Max 300 words"
			},
			{
				"type": "Input.Text",
				"maxLength":300,
				"wrap": true,
				"placeholder": "Support your challenge with a comprehensive description",
				"isMultiline": true,
				"style": "text",
				"id": "MultiLineVal"
			}
			],
			"actions": [
			{
				"type": "Action.Submit",
				"title": "Submit Description",
				"data": {"button":"Submit Description"}
			}]
		}
	};
};

const pcnChallengeUserData = function (info = []) {

	return { 
		contentType: "application/vnd.microsoft.card.adaptive",
		content: {
			type: "AdaptiveCard",
			"body": [
			{
				"type": "TextBlock",
				"size": "medium",
				"weight": "bolder",
				"text": "Personal Details",
				"horizontalAlignment": "center"
			},
			{
				"type": "TextBlock",
				"text": "What is this challenge for?",
			},
			{
				"type": "Input.ChoiceSet",
				"id": "entity",
				"style": "compact",
				"value": (info.entity ? info.entity : ""),
				"choices": [
				{
					"title": "Individual",
					"value": "Individual"
				},
				{
					"title": "Business",
					"value": "Business"
				}
				]
			},
			{
				"type": "TextBlock",
				"text": "Your personal details",
				"weight": "bolder",
			},
			{
				"type": "Input.ChoiceSet",
				"id": "title",
				"style": "compact",
				"value": (info.title ? info.title : ""),
				"choices": [
				{
					"title": "Mr",
					"value": "Mr"
				},
				{
					"title": "Ms",
					"value": "Ms"
				},
				{
					"title": "Mrs",
					"value": "Mrs"
				},
				{
					"title": "Miss",
					"value": "Miss"
				},
				{
					"title": "Dr",
					"value": "Dr"
				}
				]
			},
			{
				"type": "TextBlock",
				"text": "First Name"
			},
			{
				"type": "Input.Text",
				"placeholder": "Name",
				"style": "text",
				"value": (info.firstName ? info.firstName : ""),
				"id": "firstName"
			},
			{
				"type": "TextBlock",
				"text": "Last Name"
			},
			{
				"type": "Input.Text",
				"placeholder": "Last name",
				"style": "text",
				"value": (info.lastName ? info.lastName : ""),
				"id": "lastName"
			},
			{
				"type": "TextBlock",
				"text": "Your contact details",
				"weight": "bolder",
			},
			{
				"type": "TextBlock",
				"text": "Phone"
			},
			{
				"type": "Input.Number",
				"placeholder": "Phone",
				"style": "tel",
				"value": (info.phone ? info.phone : ""),
				"id": "phone"
			},
			{
				"type": "TextBlock",
				"text": "Email"
			},
			{
				"type": "Input.Text",
				"placeholder": "Email",
				"style": "text",
				"value": (info.email ? info.email : ""),
				"id": "email"
			},
			{
				"type": "TextBlock",
				"text": "Confirm Email"
			},
			{
				"type": "Input.Text",
				"placeholder": "Confirm email",
				"style": "text",
				"value": (info.confirmEmail ? info.confirmEmail : ""),
				"id": "confirmEmail"
			}
			],
			"actions": [
			{
				"type": "Action.Submit",
				"title": "Submit Details",
				
			}
			]
		}
	}
}

const pcnChallengeUserAddress = function (info = []) {

	return { 
		contentType: "application/vnd.microsoft.card.adaptive",
		content: {
			type: "AdaptiveCard",
			"body": [
			{
				"type": "TextBlock",
				"size": "medium",
				"weight": "bolder",
				"text": "Address",
				"horizontalAlignment": "center"
			},
			{
				"type": "TextBlock",
				"text": "Address line",
			},
			{
				"type": "Input.Text",
				"placeholder": "Adress line",
				"style": "text",
				"maxLength": 0,
				"value": (info.addressLine ? info.addressLine : ""),
				"id": "addressLine"
			},
			{
				"type": "TextBlock",
				"text": "City/town"
			},
			{
				"type": "Input.Text",
				"placeholder": "London",
				"style": "text",
				"maxLength": 0,
				"value": (info.cityTown ? info.cityTown : ""),
				"id": "cityTown",
			},
			{
				"type": "TextBlock",
				"text": "Postcode"
			},
			{
				"type": "Input.Text",
				"placeholder": "WC1H 9JE",
				"style": "text",
				"maxLength": 0,
				"value": (info.postCode ? info.postCode : ""),
				"id": "postCode",
			}
			],
			"actions": [
			{
				"type": "Action.Submit",
				"title": "Submit Address",
			}
			]
		}
	}
}


const pcnChallengeSummary = function (info, logo) {

	return { 
		contentType: "application/vnd.microsoft.card.adaptive",
		content: {
			type: "AdaptiveCard",
			"body": [
			{
				"type": "Container",
				"items": [
				{
					"type": "TextBlock",
					"text": "Your Challenge Summary",
					"weight": "bolder",
					"size": "medium"
				},
				{
					"type": "TextBlock",
					"text": "Type:",
				},
				{
					"type": "TextBlock",
					"text": info.challenge.entity,
					"weight": "bolder",
					"wrap": true
				},
				{
					"type": "ColumnSet",
					"columns": [
					{
						"type": "Column",
						"width": "auto",
						"items": [
						{
							"type": "Image",
							"url": logo,
							"size": "small",
							"style": "person"
						}
						]
					},
					{
						"type": "Column",
						"width": "stretch",
						"items": [
						{
							"type": "TextBlock",
							"text": info.challenge.title + " " + info.challenge.firstName + " " + info.challenge.lastName,
							"weight": "bolder",
							"wrap": true
						},
						{
							"type": "TextBlock",
							"spacing": "none",
							"text": info.challenge.email,
							"isSubtle": true,
							"wrap": true
						}
						]
					}
					]
				}
				]
			},
			{
				"type": "Container",
				"items": [
				{
					"type": "TextBlock",
					"text": info.challenge.description,
					"wrap": true
				},
				{
					"type": "TextBlock",
					"text": "Attachments",
					"weight": "bolder",
					"wrap": true
				},
				{
					"type": "TextBlock",
					"text": (info.challenge.attachments[0] ? info.challenge.attachments.length + " files uploaded" : "No files uplaoded"),
					"wrap": true
				},
				
				]
			}
			],
			"actions": [
			{
				"type": "Action.ShowCard",
				"title": "View Address",
				"card": {
					"type": "AdaptiveCard",
					"body": [
					{
						"type": "FactSet",
						"facts": [
						{
							"title": "Street",
							"value": info.challenge.addressLine
						},
						{
							"title": "City",
							"value": info.challenge.cityTown
						},
						{
							"title": "Postal Code",
							"value": info.challenge.postCode
						},
						{
							"title": "Phone",
							"value": info.challenge.phone
						}
						]
					}
					]
				}
			},
			{
				"type": "Action.Submit",
				"title": "Submit Challenge",
				"data": {"button":"Submit Challenge"}
			}
			]
		}
	}
};


const pcnAfterPayment = function (info) {

	return {
		contentType: "application/vnd.microsoft.card.adaptive",
		content: {
			type: "AdaptiveCard",
			body: 
			[
			{
				"type": "Container",
				"items": [
				{
					"type": "TextBlock",
					"text": "Payment Receipt",
					"weight": "bolder",
					"size": "medium"
				},
				]
			},
			{
				"type": "TextBlock",
				"text": info.chargeResult.items[0].label,
				"isSubtle": true,
				"wrap": true
			},
			{
				"type": "ColumnSet",
				"separator": true,
				"spacing": "medium",
				"columns": [
				{
					"type": "Column",
					"width": "stretch",
					"items": [
					{
						"type": "TextBlock",
						"text": "ID:",
						"isSubtle": true,
						"weight": "bolder"
					},
					{
						"type": "TextBlock",
						"text": "Method:",
						"isSubtle": true,
						"weight": "bolder"
					},
					{
						"type": "TextBlock",
						"text": "Total:",
						"isSubtle": true,
						"weight": "bolder",
						"size": "large"
					}
					]
				},
				{
					"type": "Column",
					"width": "auto",
					"items": [
					{
						"type": "TextBlock",
						"text": info.paymentRequest.id,
						"horizontalAlignment": "right",
						"spacing": "small"
					},
					{
						"type": "TextBlock",
						"text": "Credit Card",
						"horizontalAlignment": "right",
						"spacing": "small"
					},
					{
						"type": "TextBlock",
						"text": info.chargeResult.total.amount.value + " " +  info.chargeResult.total.amount.currency,
						"size": "large",
						"horizontalAlignment": "right"
					}
					]
				}
				]
			},
			],
		}
	};
};

module.exports = {pcnLogin, pcnContraventionSummary, pcnChallengeDescription, pcnChallengeUserData, pcnChallengeUserAddress, pcnChallengeSummary, pcnAfterPayment};


