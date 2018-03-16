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
  var role = member.guild.roles.find('name', 'Użytkownik');

  member.addRole(role);
  member.send('**Witaj na serwerze Haker.edu.pl!**');
  member.send('**Koniecznie zapoznaj się z naszym regulaminem na kanale #regulamin i zajrzyj na social media. Życzymy miłego pobytu! :wink:**');
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
  const command = message.content.slice(config.prefix.length)
  let prefix = config.prefix;

  if (message.author.bot) return;

  if (command === `c++`) {
    var role = message.guild.roles.find(r => r.name === `c++`);
    var giveRoleTo = message.guild.member(message.author);
    if (giveRoleTo.roles.has(role.id)) {
      giveRoleTo.removeRole(role.id).then(message.channel.send("Straciłeś role **c++**!"));
    } else {
      giveRoleTo.addRole(role.id)
        .then(message.channel.send("Dostałeś role **c++**!"))
        .catch(console.error);
    }
  }

  if (command === `js`) {
    var role = message.guild.roles.find(r => r.name === `js`);
    var giveRoleTo = message.guild.member(message.author);
    if (giveRoleTo.roles.has(role.id)) {
      giveRoleTo.removeRole(role.id).then(message.channel.send("Straciłeś role **js**!"));
    } else {
      giveRoleTo.addRole(role.id)
        .then(message.channel.send("Dostałeś role **js**!"))
        .catch(console.error);
    }
  }

  if (command === `python`) {
    var role = message.guild.roles.find(r => r.name === `python`);
    var giveRoleTo = message.guild.member(message.author);
    if (giveRoleTo.roles.has(role.id)) {
      giveRoleTo.removeRole(role.id).then(message.channel.send("Straciłeś role **python**!"));
    } else {
      giveRoleTo.addRole(role.id)
        .then(message.channel.send("Dostałeś role **python**!"))
        .catch(console.error);
    }
  }

  if (command === `c#`) {
    var role = message.guild.roles.find(r => r.name === `c#`);
    var giveRoleTo = message.guild.member(message.author);
    if (giveRoleTo.roles.has(role.id)) {
      giveRoleTo.removeRole(role.id).then(message.channel.send("Straciłeś role **c#**!"));
    } else {
      giveRoleTo.addRole(role.id)
        .then(message.channel.send("Dostałeś role **c#**!"))
        .catch(console.error);
    }
  }

  if (command === `lua`) {
    var role = message.guild.roles.find(r => r.name === `lua`);
    var giveRoleTo = message.guild.member(message.author);
    if (giveRoleTo.roles.has(role.id)) {
      giveRoleTo.removeRole(role.id).then(message.channel.send("Straciłeś role **lua**!"));
    } else {
      giveRoleTo.addRole(role.id)
        .then(message.channel.send("Dostałeś role **lua**!"))
        .catch(console.error);
    }
  }

  if (command === `html`) {
    var role = message.guild.roles.find(r => r.name === `html/css`);
    var giveRoleTo = message.guild.member(message.author);
    if (giveRoleTo.roles.has(role.id)) {
      giveRoleTo.removeRole(role.id).then(message.channel.send("Straciłeś role **html/css**!"));
    } else {
      giveRoleTo.addRole(role.id)
        .then(message.channel.send("Dostałeś role **html/css**!"))
        .catch(console.error);
    }
  }

  if (command === `java`) {
    var role = message.guild.roles.find(r => r.name === `java`);
    var giveRoleTo = message.guild.member(message.author);
    if (giveRoleTo.roles.has(role.id)) {
      giveRoleTo.removeRole(role.id).then(message.channel.send("Straciłeś role **java**!"));
    } else {
      giveRoleTo.addRole(role.id)
        .then(message.channel.send("Dostałeś role **java**!"))
        .catch(console.error);
    }
  }

  if (command === `php`) {
    var role = message.guild.roles.find(r => r.name === `php`);
    var giveRoleTo = message.guild.member(message.author);
    if (giveRoleTo.roles.has(role.id)) {
      giveRoleTo.removeRole(role.id).then(message.channel.send("Straciłeś role **php**!"));
    } else {
      giveRoleTo.addRole(role.id)
        .then(message.channel.send("Dostałeś role **php**!"))
        .catch(console.error);
    }
  }

  if (command === `swift`) {
    var role = message.guild.roles.find(r => r.name === `swift`);
    var giveRoleTo = message.guild.member(message.author);
    if (giveRoleTo.roles.has(role.id)) {
      giveRoleTo.removeRole(role.id).then(message.channel.send("Straciłeś role **swfit**!"));
    } else {
      giveRoleTo.addRole(role.id)
        .then(message.channel.send("Dostałeś role **swift**!"))
        .catch(console.error);
    }
  }

  if (message.channel.type === "dm") {
    message.reply(":warning: Nie możesz używać komend w prywatnych wiadomościach!")
    return;
  }

  let messageArray = message.content.split(/\s+/g);
  let args = messageArray.slice(1);
  let cmd = bot.commands.get(command.slice(prefix.length));
  if (command.startsWith(config.prefix)) {
    if (cmd) cmd.run(bot, message, args);
    if (!cmd) return message.channel.send(`:warning:  Error 404, komendy nie znaleziono! :warning:`);
  }

})
bot.login(token)