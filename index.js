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

  client.on("guildMemberAdd", function(member) {
      member.guild.channels.find("name", "powitalnia").send(member.toString() + ", Witamy na Haker.Edu.PL! Miłego dnia  :wink: !");
    });

  client.on("guildMemberAdd", member => {
    console.log('Użytkownik' + " " + member.username + ' has joined the server!')

    var role = member.guild.roles.find('name', 'Użytkownik');

    member.addRole(role)
  });

  client.on('message', async (message) => {
    const command = message.content.slice(config.prefix.length)
  
    if (message.author.bot) return
  
    if (message.content.indexOf(config.prefix) !== 0) return

    if(command === 'ping') {
        await message.channel.send(new Date().getTime() - message.createdTimestamp + " ms");        
      }

    })

    client.login(token)