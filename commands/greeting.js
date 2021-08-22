function greet(channel, context, client, commandName) {
    const greetParts = commandName.split(' ');
    if (greetParts.length === 1)
        client.say(channel, `Hello @${context.username}, Enjoy the stream. KonCha`);
    else if (greetParts.length === 2)
        client.say(channel, `Hello @${greetParts[1].replaceAll('@', '')}, @${context.username} told me to greet you, Enjoy the stream. KonCha`);
    else
        client.say(channel, `Sorry @${context.username}, I didn't understood you.`);
    console.log(`* Executed !greet command`);
}

module.exports.greet = greet;