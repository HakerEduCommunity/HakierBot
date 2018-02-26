const Discord = require('discord.js')
const client = new Discord.Client()
// Please replace with your own token :D
const token = require('./token.js')
const config = {
    prefix: 'smroot '
  }


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('Hakuje Pentagon')
  });
    
  client.on('message', async (message) => {
    const command = message.content.slice(config.prefix.length)
  
    if (message.author.bot) return
  
    if (message.content.indexOf(config.prefix) !== 0) return

    
  
  })

    client.login(token)