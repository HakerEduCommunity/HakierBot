const Discord = module.require('discord.js')

module.exports.run = async (bot, message, args) => {
  if (message.guild.member(bot.user).hasPermission('KICK_MEMBERS')) {
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(':warning: You have no permission to kick members!')

    if (args.length < 2) {
      return message.channel.send('**[Admin Mode]** Too few arguments! Type cody_help kick to get usage of this command.')
    }

    if (args.length >= 2) {
      const toKick = message.mentions.members.first() || message.guild.members.get(args[2])

      if (!toKick) return message.channel.send(':warning: You did not specify a valid user mention or ID!')
      const reason = args.slice(3)

      if (!toKick.user.bot) {
        await toKick.user.send(`**You have been kicked from ${message.guild.name}. Reason: ${reason.join(' ')}**`)
      }

      const embed = new Discord.RichEmbed()
        .setAuthor(`${toKick.user.tag} was kicked`, toKick.user.displayAvatarURL)
        .setDescription(`**Kicked by**: ${message.author}\n**Reason**: ${reason.join(' ')}`)
      message.channel.send(embed)
      await message.guild.member(toKick).kick()
    }
  } else {
    return message.channel.send(':warning: I have no permission to kick users!')
  }
}

module.exports.help = {
  name: 'kick',
}
