const Discord = module.require('discord.js')

module.exports.run = async (bot, message, args) => {

  if(message.guild.member(bot.user).hasPermission('BAN_MEMBERS')) {

    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(':warning: You have no permission to ban members!')

      if(args.length < 2) {
        return message.channel.send(`**[Admin Mode]** Too few arguments! Type cody_help ban to get usage of this command.`)
      }

      if(args.length >= 2) {
        let toBan = message.mentions.members.first() || message.guild.members.get(args[0])

        if (!toBan) return message.channel.send(':warning: You did not specify a valid user mention or ID!')

        let reason = args.slice(1)

        if(!toBan.user.bot) {
          await toBan.user.send(`**You have been banned from ${message.guild.name}. Reason: ${reason.join(' ')}**`)
        }

        const banhammer = bot.emojis.get
        let embed = new Discord.RichEmbed()
        .setAuthor(`${toBan.user.username}#${toBan.user.discriminator} was banned`, toBan.user.displayAvatarURL)
        .setDescription(`**Banned by**: ${message.author}\n**Reason**: ${reason.join(' ')}`)
        message.channel.send(embed)
        await message.guild.member(toBan).ban(reason.join(' '))
      }

    } else {
      return message.channel.send(`I have no permission to ban members!`)
    }

}

module.exports.help = {
  name: 'ban'
}