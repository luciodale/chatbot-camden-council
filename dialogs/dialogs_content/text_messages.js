const pcnGreeting = {
	hello: 'Hello! my name is Sunny.',
	intro1: 'Today, I am going to assist you with your Penalty Charge Notice (PCN).'
};

const pcnLogin = {
	intro1: 'I only need your PCN and Vehicle Registration numbers',
	err: 'Your credentials do not exist in the records'
};

const pcnContraventionSummary = {
	intro1: 'Here is a summary of your contravention',
	err: 'Please, select either Challenge or Make Payment'
};

const pcnChallengeDescription = {
	description: 'First tell us why you are challenging in the next empty box',
	errEmpty: 'Please, provide a description of at least 50 characters',
};

const pcnChallengeAttachments = {
	intro1: 'You might attach up to 5 files of size 1 MB each. The supported extensions are: jpg, png, pdf, tif, gif',
	err1: 'You have exceeded the 1 MB limit',
	err2: ' has an extension that is not supported',
	err3: 'Please, upload your files again',
};


const pcnChallengeUserData = {
	intro1: 'Awesome! Now enter the following details',
	errEmpty: 'Please, make sure you fill out all the text fields',
	errEmail: 'Please, provide a valid email address',
	errEmailMatch: 'The emails do not match!'
};

const pcnChallengeUserAddress = {
	intro1: 'You are almost there.. Type in your address',
	errEmpty: 'Please, make sure you fill out all the text fields',
};


const pcnGoodbye = {
	end1: 'Your challenge has been successfully submitted! You will receive updates on the outcome via email',
	end2: 'Thank you and have a good day!',
	end3: '(Type anything to start again)'
};

const pcnPay = {
	intro1:'the following card contains the summary of your ticket.'
};

const pcnExceptions = {
	ex1:'Something went wrong! Please, try to challenge again in the next few minutes. Goodbye until then!',
	ex2:'I am unable to process your files right now! We will continue without attachemts',
	ex3: 'You already submitted a challenge. You will receive an email when a decision will be made. Goodbye!',
	ex4: 'Something happened on our end. Waiting a bit might help.',
	ex5: 'You already paid for your fine. Have a great day!'
}

// LUIS Dialogs!

const pcnLuisHelp = {
	intro1: 'In this chat, you can retrieve your contravention information. After you\'ll go through it, you can either choose to pay the fine or to challenge it. If you want to leave or pay in any moment all you have to do is to ask!',
	intro2: 'Type anything to continue your experience :)'

}

const afterPayment = {
	receipt: 'Here is a receipt of your payment',
	goodbye: 'Thank you and see you soon!'

}



module.exports = {pcnGreeting, pcnLogin, pcnContraventionSummary, pcnChallengeDescription, pcnChallengeUserData, pcnChallengeAttachments, pcnChallengeUserAddress, pcnLuisHelp, pcnGoodbye, pcnPay, pcnExceptions, afterPayment};

