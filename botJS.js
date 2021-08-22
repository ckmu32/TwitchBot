const tmi = require('tmi.js');
const cron = require('node-cron');
const fs = require('fs');
const readLine = require('readline');

const diceF = require('./commands/diceFunction.js');
const helpF = require('./commands/help');
const greetF = require('./commands/greeting');
const languageF = require('./commands/language');

var inputParams = process.argv.slice(2);

//0: Channel name.
//1: Broadcaster name.
//2: Time for the automatic reminder (minutes). In this case to drink something.
//3: Username to login.
//4: The Token to login.
//5: The channel to login. (Only one).
//If the required params are not met, we kill the process.

var param0 = null;
var param1 = null;
var param2 = null;
var param3 = null;
var param4 = null;
var param5 = null;

//Config data retrieval.
if (inputParams.length == 0) {
  //No params were provided, we will try to retrieve them from the config file.
  console.log("Reading configuration file.");
  try {


    let configData = fs.readFileSync(__dirname + '/config.json');
    let configObject = JSON.parse(configData);
    console.log(configObject);

    param0 = configObject.channelName;
    param1 = configObject.broadcasterName;
    param2 = configObject.reminderTime;
    param3 = configObject.loginUser;
    param4 = configObject.loginToken;
    param5 = configObject.channelToLogin;
  } catch (error) {
    console.error(error);
    process.exit;
  }

} else if (inputParams.length === 6) {
  //Params were provided.
  console.log("Using input parameters.");
  param0 = inputParams[0];
  param1 = inputParams[1];
  param2 = inputParams[2];
  param3 = inputParams[3];
  param4 = inputParams[4];
  param5 = inputParams[5];
} else {
  //Incorrect params.
  console.error('Could not start the bot due to invalid configuration.');
  process.exit();
}

if (param3.trim() === null || param4.trim() === null || param3.trim() === '' || param4.trim() === '') {
  console.error('No credentials were passed');
  process.exit();
}

//If the time is not a number we exit.
if (!Number.isInteger(parseInt(param2))) {
  console.error('Could not start the bot due to invalid reminder time.');
  process.exit();
}

// Define configuration options
const channelName = '#' + param0;
const channelBroadcasterUserName = param1;
const remindLiquidTimeMinutes = parseInt(param2);

const opts = {
  identity: {
    username: `${param3}`,
    password: `${param4}`
  },
  channels: [
    `${param5}`
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

//Check if we should start the cron job
if (remindLiquidTimeMinutes > 0) {
  console.log('Activating liquid job.');
  startLiquidDirective();
} else
  console.log('Liquid job won\'t be used.');



//Banned words
var bannedWords = [];
try {
  const file = readLine.createInterface({
    input: fs.createReadStream(__dirname + '/blacklist_words.txt'),
    output: process.stdout,
    terminal: false
  });

  file.on('line', (line) => {
    if (!line.startsWith('//') || !line.trim() === '')
      bannedWords.push(line.trim());
  });
} catch (error) {
  console.error("Error while reading banned words: " + error);
}

const userWarnings = new Map();

// console.log('Client: ' + JSON.stringify(client, null, 2));
// Called every time a message comes in
function onMessageHandler(channel, context, msg, self) {
  //Check for bad word. If found we alert the user.
  if (bannedWords.some(sub => msg.trim().toLowerCase().includes(sub.trim().toLowerCase()))) {
    console.log('Sentence with bad words detected.');
    console.log(`Message ID: ${context.id}`);

    if (userWarnings.has(context.username)) {
      var counter = userWarnings.get(context.username);
      counter++;
      userWarnings.set(context.username, counter);

      //Ban the user.
      if (counter > 3) {
        console.log('Banning user.');
        client.ban(channel, context.username, 'Reiterated use of punishable wording.').catch(err => console.log(err));
        return;
      }

    } else {
      //Start the counter until ban.
      userWarnings.set(context.username, 1);
    }

    client.say(channel, `@${context.username}, tone down your language or you will be punished.`);
    client.deletemessage(channel, context.id).then(res => console.log(res)).catch(err => console.log(err));

    return;
  }

  if (self || !msg.startsWith("!")) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!dice') {
    diceF.rollDice(channel, context, client);
  } else if (commandName.startsWith('!help') || commandName.startsWith('!commands')) {
    helpF.showHelp(channel, context, client, commandName);
  } else if (commandName.startsWith('!hello')) {
    greetF.greet(channel, context, client, commandName);
  } else if (commandName === '!language') {
    languageF.language(channel, context, client);
  } else {
    client.say(channel, `Sorry @${context.username} please type !help for the available commands and usage. Kappa`);
    console.log(`* Unknown command ${commandName}`);
  }
}

//Cron jobs
function startLiquidDirective() {
  cron.schedule(`*\/${remindLiquidTimeMinutes} * * * *`, drinkLiquid)
}

function drinkLiquid() {
  client.say(channelName, `Hello @${channelBroadcasterUserName}, ${remindLiquidTimeMinutes} minutes have passed. Remember to drink something. HSCheers`);
}


// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}