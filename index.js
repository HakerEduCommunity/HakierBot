const Discord = require('discord.js')
const client = new Discord.Client()
// Please replace with your own token :D
const token = require('./token.js')
const config = {
  prefix: '!'
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('Hakuje Pentagon')
});

client.on("guildMemberAdd", function (member) {
  member.guild.channels.find("name", "powitalnia").send(member.toString() + ", Witamy na HakerEduPL! Miłego dnia  :wink: !");
});

client.on("guildMemberAdd", member => {
  var role = member.guild.roles.find('name', 'Użytkownik');

  member.addRole(role)
});

client.on('message', async (message) => {
  const command = message.content.slice(config.prefix.length)

  if (message.author.bot) return

  if (message.content.indexOf(config.prefix) !== 0) return

  if (command === 'ping') {
    await message.channel.send(new Date().getTime() - message.createdTimestamp + " ms");
  }

  if (command === "kick") {
    if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("sorry, you don't have permission to kick members.");
    if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply("it seems I do not have permission to perform this action. Does my role have the kick membes permission?");
    let userToKick = message.mentions.users.first();

    if (message.mentions.users.size < 1) return message.reply("you did not provide a user to kick. Aborting operation.");
    if (!message.guild.member(userToKick)
      .kickable) return message.reply("that user has a role above my highest role.")

    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
  }
});

client.login(token)