const Discord = require('discord.js')
const fs = require('fs')
const config = require('./config')

const bot = new Discord.Client({ disableEveryone: true })

bot.on('ready', () => {
  console.log(`\nInitialized on ${new Date().toUTCString()}.`)
  bot.user.setPresence({ game: { name: 'Mr. Robot', type: 3 } })
})

bot.on('guildMemberAdd', async (member) => {
  const role = member.guild.roles.find('name', 'Użytkownik')

  await member.addRole(role)
  member.send('**Witaj na serwerze Haker.edu.pl!**')
  member.send('**Koniecznie zapoznaj się z naszym regulaminem na kanale #regulamin i zajrzyj na social media. Życzymy miłego pobytu! :wink:**')
})

// commands handler
bot.commands = new Discord.Collection()

fs.readdir('./src/commands/', (err, files) => {
  if (err) console.error(err)

  const jsfiles = files.filter(f => f.split('.').pop() === 'js')
  if (jsfiles.lenght <= 0) {
    console.log('No commands files found...')
    return
  }

  console.log(`Loading ${jsfiles.length} commands... \n`)

  jsfiles.forEach((f) => {
    /* eslint-disable */
    const props = require(`./commands/${f}`)
    /* eslint-enable */
    console.log(`${f} loaded!`)
    bot.commands.set(props.help.name, props)
  })
})

bot.on('message', async (message) => {
  const command = message.content.slice(config.prefix.length)

  if (message.author.bot) return
  if (command === 'c++') {
    const role = message.guild.roles.find(r => r.name === 'c++')
    const giveRoleTo = message.guild.member(message.author)
    if (giveRoleTo.roles.has(role.id)) {
      giveRoleTo.removeRole(role.id).then(message.channel.send('Straciłeś role **c++**!'))
    } else {
      giveRoleTo.addRole(role.id)
        .then(message.channel.send('Dostałeś role **c++**!'))
        .catch(console.error)
    }
  }

  if (command === 'js') {
    const role = message.guild.roles.find(r => r.name === 'javascript')
    const giveRoleTo = message.guild.member(message.author)
    if (giveRoleTo.roles.has(role.id)) {
      giveRoleTo.removeRole(role.id).then(message.channel.send('Straciłeś role **javascript**!'))
    } else {
      giveRoleTo.addRole(role.id)
        .then(message.channel.send('Dostałeś role **javascript**!'))
        .catch(console.error)
    }
  }

  if (command === 'python') {
    const role = message.guild.roles.find(r => r.name === 'python')
    const giveRoleTo = message.guild.member(message.author)
    if (giveRoleTo.roles.has(role.id)) {
      giveRoleTo.removeRole(role.id).then(message.channel.send('Straciłeś role **python**!'))
    } else {
      giveRoleTo.addRole(role.id)
        .then(message.channel.send('Dostałeś role **python**!'))
        .catch(console.error)
    }
  }

  if (command === 'c#') {
    const role = message.guild.roles.find(r => r.name === 'c#')
    const giveRoleTo = message.guild.member(message.author)
    if (giveRoleTo.roles.has(role.id)) {
      giveRoleTo.removeRole(role.id).then(message.channel.send('Straciłeś role **c#**!'))
    } else {
      giveRoleTo.addRole(role.id)
        .then(message.channel.send('Dostałeś role **c#**!'))
        .catch(console.error)
    }
  }

  if (command === 'lua') {
    const role = message.guild.roles.find(r => r.name === 'lua')
    const giveRoleTo = message.guild.member(message.author)
    if (giveRoleTo.roles.has(role.id)) {
      giveRoleTo.removeRole(role.id).then(message.channel.send('Straciłeś role **lua**!'))
    } else {
      giveRoleTo.addRole(role.id)
        .then(message.channel.send('Dostałeś role **lua**!'))
        .catch(console.error)
    }
  }

  if (command === 'html') {
    const role = message.guild.roles.find(r => r.name === 'html/css')
    const giveRoleTo = message.guild.member(message.author)
    if (giveRoleTo.roles.has(role.id)) {
      giveRoleTo.removeRole(role.id).then(message.channel.send('Straciłeś role **html/css**!'))
    } else {
      giveRoleTo.addRole(role.id)
        .then(message.channel.send('Dostałeś role **html/css**!'))
        .catch(console.error)
    }
  }

  if (command === 'java') {
    const role = message.guild.roles.find(r => r.name === 'java')
    const giveRoleTo = message.guild.member(message.author)
    if (giveRoleTo.roles.has(role.id)) {
      giveRoleTo.removeRole(role.id).then(message.channel.send('Straciłeś role **java**!'))
    } else {
      giveRoleTo.addRole(role.id)
        .then(message.channel.send('Dostałeś role **java**!'))
        .catch(console.error)
    }
  }

  if (command === 'php') {
    const role = message.guild.roles.find(r => r.name === 'php')
    const giveRoleTo = message.guild.member(message.author)
    if (giveRoleTo.roles.has(role.id)) {
      giveRoleTo.removeRole(role.id).then(message.channel.send('Straciłeś role **php**!'))
    } else {
      giveRoleTo.addRole(role.id)
        .then(message.channel.send('Dostałeś role **php**!'))
        .catch(console.error)
    }
  }

  if (command === 'swift') {
    const role = message.guild.roles.find(r => r.name === 'swift')
    const giveRoleTo = message.guild.member(message.author)
    if (giveRoleTo.roles.has(role.id)) {
      giveRoleTo.removeRole(role.id).then(message.channel.send('Straciłeś role **swfit**!'))
    } else {
      giveRoleTo.addRole(role.id)
        .then(message.channel.send('Dostałeś role **swift**!'))
        .catch(console.error)
    }
  }

  if (command === 'golang') {
    const role = message.guild.roles.find(r => r.name === 'golang')
    const giveRoleTo = message.guild.member(message.author)
    if (giveRoleTo.roles.has(role.id)) {
      giveRoleTo.removeRole(role.id).then(message.channel.send('Straciłeś role **golang**!'))
    } else {
      giveRoleTo.addRole(role.id)
        .then(message.channel.send('Dostałeś role **golang**!'))
        .catch(console.error)
    }
  }
  
  if (command === 'visual-basic') {
    const role = message.guild.roles.find(r => r.name === 'visual-basic')
    const giveRoleTo = message.guild.member(message.author)
    if (giveRoleTo.roles.has(role.id)) {
      giveRoleTo.removeRole(role.id).then(message.channel.send('Straciłeś role **visual-basic**!'))
    } else {
      giveRoleTo.addRole(role.id)
        .then(message.channel.send('Dostałeś role **visual-basic**!'))
        .catch(console.error)
    }
  }


  if (message.channel.type === 'dm') {
    message.reply(':warning: Nie możesz używać komend w prywatnych wiadomościach!')
    return
  }

  const args = message.content.split(/\s+/g)
  const cmd = bot.commands.get(args[1])

  if (message.content.startsWith(config.prefix)) {
    if (cmd) cmd.run(bot, message, args)
    if (!cmd) return message.channel.send(':warning:  Error 404, komendy nie znaleziono! :warning:')
  }
})
bot.login(config.token)
