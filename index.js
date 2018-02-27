const Discord = require('discord.js')
const bot = new Discord.Client({ disableEveryone: true });
// Please replace with your own token :D
const token = require('./token.js')
const fs = require('fs')
const ban = require('./commands/ban.js')
const kick = require('./commands/kick.js')
const config = require('./config.json')
bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity('Hakuje Pentagon')
});

bot.on("guildMemberAdd", function (member) {
  member.guild.channels.find("name", "powitalnia").send(member.toString() + ", Witamy na HakerEduPL! Miłego dnia  :wink: !");
});

bot.on("guildMemberAdd", member => {
  var role = member.guild.roles.find('name', 'Użytkownik');

  member.addRole(role)
});

// Command handler
bot.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);

  let jsfiles = files.filter(f => f.split('.').pop() === 'js');
  if (jsfiles.lenght <= 0) {
    console.log('No command files found...')
    return;
  }

  console.log(`Loading ${jsfiles.length} commands...`);

  jsfiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${i + 1}: ${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on('message', async (message) => {

  let prefix = config.prefix;

  if (message.author.bot) return;

  if (message.channel.type === "dm") {
    message.reply(":warning: Nie możesz używać komend w prywatnych wiadomościach!")
    return;
  }

  let messageArray = message.content.split(/\s+/g);
  let command = messageArray[0];
  let args = messageArray.slice(1);
  let cmd = bot.commands.get(command.slice(prefix.length));
  if (command.startsWith(config.prefix)) {
    if (cmd) cmd.run(bot, message, args);
    if (!cmd) return message.channel.send(`:warning:  Error 404, komendy nie znaleziono! :warning:`);
  }

})
bot.login(token)