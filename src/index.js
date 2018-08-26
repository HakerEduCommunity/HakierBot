const Discord = require('discord.js')
const config = require('./config')

// commands import *coming soon*
const help = require('./commands/help')
const roles = require('./commands/roles')

// variables
const commands = ['javascript', 'c++', 'visual-basic', 'golang', 'swift', 'java', 'php', 'html/css', 'lua', 'c#', 'python', 'help']
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
  const check = commands.includes(message.content.slice(1))

  if (message.content.startsWith(config.prefix + 'c++') && check === true) {
    roles(message)
  }

  if (message.content.startsWith(config.prefix + 'python') && check === true) {
    roles(message)
  }

  if (message.content.startsWith(config.prefix + 'c#') && check === true) {
    roles(message)
  }

  if (message.content.startsWith(config.prefix + 'lua') && check === true) {
    roles(message)
  }

  if (message.content.startsWith(config.prefix + 'html') && check === true) {
    roles(message)
  }

  if (message.content.startsWith(config.prefix + 'java') && check === true) {
    roles(message)
  }

  if (message.content.startsWith(config.prefix + 'php') && check === true) {
    roles(message)
  }

  if (message.content.startsWith(config.prefix + 'swift') && check === true) {
    roles(message)
  }

  if (message.content.startsWith(config.prefix + 'golang') && check === true) {
    roles(message)
  }

  if (message.content.startsWith(config.prefix + 'visual-basic') && check === true) {
    roles(message)
  }

  if (message.content.startsWith(config.prefix + 'help') && check === true) {
    help(message)
  }

  if (message.content.startsWith(config.prefix)
  && commands.includes(message.content.slice(1)) === false) {
    message.reply(`bash: ${message.content.slice(1)}: command not found`)
  }
})

client.login(config.token)
