# TwitchBot.
TwitchBot let's you interact with your chat by using **!commands**.
For the moment some commands were implemented and extra logic.

# Functionality

 - Basic commands:
	 - !dice: Shows a random number (I know it's the same for the basic template, but it's fun :) ).
	 - !help/!commands: Shows the commands
		 - !help !command_name: Shows the description for that command.
	 - !hello: Greets you. Or if you use !hello otherUser (without @) you greet the other person.
	 - !language: Shows the officials language of your channel.
 - Execute a cron job, in this a case to drink something.
 - Check for punishable words (**blacklist_words.txt**), if an user wrote something with that word (case-sentive does not apply) will be warned, after 3 warns an automatic ban will be applied.

# Requirements.
 - nodeJS: 16.7.0 (not tested on current LTS 14.17.5).
 - tmi.js: 1.8.5
 - node-cron: 3.0.0

# How to use it?
Good question, but before, make sure that you have a working copy of it by downloading it.
Already downloaded? Good, let's continue.

 1. Go to the same folder (with the terminal) were package.json is located.
 2. Run on your terminal: `npm install` to download the required dependencies.
 3. Configure the required data to start.
 4. Start the bot by typing on the terminal (***depending on configuration***):
	 - If you wish to use the **configuration** file: `node botJS.js`
	 - Using **input parameters**:`node botJS.js param1 param2 param3 param4 param5 param6`
 5. If something happened at start a severe log will indicate what happened.

## Configuration for required data.
We have two ways to configure the required data:
### File.
Located on the same folder with the name config.json
Make sure to change the data to your real one.
### Input parameters.

 1. Channel name.
 2. Broadcaster name (your main user).
 3. Time in **minutes** for automatic job.
 4. Username of the bot account.
 5. Token for the bot account.
 6. Channel that the bot will connect.
### How to get your token?
Easy, just open this page and follow the instructions:
https://twitchapps.com/tmi/

# Notes

 - If you use a 0 for the time, the automatic job will no be initialized.
 - Basic logging is implemented.

# Future
Since this is more of a personal bot, updates will not be constant, but be free to tell:
 - Issues.
 - Cool options.
 - Fixes (create a PR).

And expect a better code source in future releases.
