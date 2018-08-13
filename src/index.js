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
  client.user.setPresence({ game: { name: client.users.size + ' programistów' , type: 3 } })
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
  const command = message.content.slice(config.prefix.length)
  
  if(command === 'test') {
    const role1 = client.guild.roles.find('name', 'Użytkownik')
    let member
    if (!role1) return message.channel.send(`**${message.author.username}**, role not found`);
    message.guild.members.filter(m => !m.user.client).map(async member => await member.addRole(role1));
    message.channel.send(`**${message.author.username}**, role **${role1.name}** was added to all members`);
  }

  if (command === 'c++') {
    roles(message)
  }

  if (command === 'javascript') {
    roles(message)
  }

  if (command === 'python') {
    roles(message)
  }

  if (command === 'c#') {
    roles(message)
  }

  if (command === 'lua') {
    roles(message)
  }

  if (command === 'html') {
    roles(message)
  }

  if (command === 'java') {
    roles(message)
  }

  if (command === 'php') {
    roles(message)
  }

  if (command === 'swift') {
    roles(message)
  }

  if (command === 'golang') {
    roles(message)
  }

  if (command === 'visual-basic') {
    roles(message)
  }

  if (command === 'help') {
    help(message)
  }

  if (message.content.startsWith(config.prefix)
  && commands.includes(message.content.slice(1)) === false) {
    message.reply(`bash: ${command}: command not found`)
  }
})
client.login(config.token)
