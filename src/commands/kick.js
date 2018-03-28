const Discord = module.require('discord.js')

module.exports.run = async (bot, message, args) => {

  if(message.guild.member(bot.user).hasPermission('KICK_MEMBERS')) {

    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(':warning: You have no permission to kick members!')

      if(args.length < 2) {
        return message.channel.send(`**[Admin Mode]** Too few arguments! Type cody_help kick to get usage of this command.`)
      }

      if(args.length >= 2) {
        let toBan = message.mentions.members.first() || message.guild.members.get(args[0])

        if (!toBan) return message.channel.send(':warning: You did not specify a valid user mention or ID!')

        let reason = args.slice(1)

        if(!toBan.user.bot) {
          await toBan.user.send(`**You have been kicked from ${message.guild.name}. Reason: ${reason.join(' ')}**`)
        }
        
        let embed = new Discord.RichEmbed()
        .setAuthor(`${toBan.user.username}#${toBan.user.discriminator} was kicked`, toBan.user.displayAvatarURL)
        .setDescription(`**Kicked by**: ${message.author}\n**Reason**: ${reason.join(' ')}`)
        message.channel.send(embed)
        await message.guild.member(toBan).kick()
      }

    } else {
      return message.channel.send(`:warning: I have no permission to kick users!`)
    }
}

module.exports.help = {
  name: 'kick'
}