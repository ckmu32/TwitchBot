function rollDice(channel, context, client) {
  const sides = 6;
  const num = Math.floor(Math.random() * sides) + 1;
  client.say(channel, `@${context.username}, You rolled a ${num}`);
  console.log(`* Executed !dice command`);
}

module.exports.rollDice = rollDice;