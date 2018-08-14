const Discord = require('discord.js')
const config = require('./config')

// commands import *coming soon*
const help = require('./commands/help')
const roles = require('./commands/roles')

// variables
const commands = ['javascript', 'c++', 'visual-basic', 'golang', 'swift', 'java', 'php', 'html', 'lua', 'c#', 'python', 'help']

const client = new Discord.Client({ disableEveryone: true })

client.on('ready', () => {
  console.log(`\nInitialized on ${new Date().toUTCString()}.`)
  client.user.setPresence({ game: { name: 'Haker.edu.pl', type: 3 } });
})

client.on('guildMemberAdd', async (member) => {
  const role = member.guild.roles.find('name', 'Użytkownik')

  await member.addRole(role)
  member.send('**Witaj na serwerze Haker.edu.pl!**')
  member.send('**Koniecznie zapoznaj się z naszym regulaminem na kanale #regulamin i zajrzyj na social media. Życzymy miłego pobytu! :wink:**')
})

// commands handler
client.commands = new Discord.Collection()


client.on('message', async (message) => {
  // const command = message.content.startsWith(config.prefix)


  if (message.content.startsWith(config.prefix + 'c++')) {
    roles(message)
  }

  if (message.content.startsWith(config.prefix + 'javascript')) {
    roles(message)
  }

  if (message.content.startsWith(config.prefix + 'python')) {
    roles(message)
  }

  if (message.content.startsWith(config.prefix + 'c#')) {
    roles(message)
  }

  if (message.content.startsWith(config.prefix + 'lua')) {
    roles(message)
  }

  if (message.content.startsWith(config.prefix + 'html')) {
    roles(message)
  }

  if (message.content.startsWith(config.prefix + 'java')) {
    roles(message)
  }

  if (message.content.startsWith(config.prefix + 'php')) {
    roles(message)
  }

  if (message.content.startsWith(config.prefix + 'swift')) {
    roles(message)
  }

  if (message.content.startsWith(config.prefix + 'golang')) {
    roles(message)
  }

  if (message.content.startsWith(config.prefix + 'visual-basic')) {
    roles(message)
  }

  if (message.content.startsWith(config.prefix + 'help')) {
    help(message)
  }

  if (message.content.startsWith(config.prefix)
  && commands.includes(message.content.slice(1)) === false) {
    message.reply(`bash: ${command}: command not found`)
  }
})

client.login(config.token)
