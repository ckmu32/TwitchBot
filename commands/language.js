function language(channel, context, client) {
    client.say(channel, `Hello @${context.username}, The official language is Spanish, but we can also use English.`);
    console.log(`* Executed !language command`);
}

module.exports.language = language;