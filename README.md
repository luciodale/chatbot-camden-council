# chatbot-camden-council
This is an AI chatbot to pay or challenge contravention tickets. It is developed in NodeJS, leveraging the bot-builder framework.

## Instructions to run the code:
First of all, download the repo to get the code on your local machine.

### NodeJS Download
You need a stable version of NodeJS, which can be downloaded here: ```https://nodejs.org/```.
After installing NodeJS, open your terminal and run the command ```node -v```. If it returns the version you are using, your installation was completed successfully.

### Dependencies Download
At this point, go to the project root folder from your terminal and run ```npm install``` to import all the required dependencies.

### Emulator Download
To run the code locally, install the Microsoft Bot Builder Emulator from this website ```https://bit.ly/2L6xmcE```. The procedure is very straight forward, if you just follow the documentation. 

### Run the code
Once the emulator is configured, go back to your terminal on the project root folder and run the command ```npm run```. Then, go back to the emulator and send a message... Voilà!!

### Important info
The LUIS recognizer (Natural Language Feature) must be set up in the emulator to work. As it requires sensitive data such as the application id and the authoring key, this option will not be made available.

However, the full chat capabilities can be tested at ```https://camden-pcn.azurewebsites.net/``` as long as the server will be kept alive.
