function showHelp(channel, context, client, commandName) {
    const helpParts = commandName.split(' ');
    if (helpParts.length === 1)
        client.say(channel, `@${context.username}, These are the available commands: !help !dice !hello !language. If you need detailed info use !help !command_name.`);
    else if (helpParts.length === 2)
        client.say(channel, `@${context.username}, This is the information that I have for that command: ` + detailedHelp(helpParts[1]));
    else
        client.say(channel, `Sorry @${context.username}, I didn't understood you.`);

    console.log(`* Executed !help command`);
}

function detailedHelp(detailedCommand) {
    detailedCommand = detailedCommand.trim()
    if (detailedCommand === '!help')
        return 'It just displays the commands, nothing more, nothing lesss. LUL';
    else if (detailedCommand === '!dice')
        return 'Could it be the number you require? CoolStoryBob';
    else if (detailedCommand === '!hello')
        return 'Write it once to get greeted or use !hello other_user (without @) to greet the other person. GivePLZ TakeNRG';
    else if (detailedCommand === '!language')
        return 'Want know about the official languages of this channel? VoHiYo';
    else
        return 'Sorry, I do not have detailed information for that command or does not exists yet.';
}

module.exports.showHelp = showHelp;