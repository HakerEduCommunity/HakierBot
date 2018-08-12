const rol = require('../roles.json')

function js(message) {
  let mes
  const role = message.guild.roles.find(r => r.name === message.content.slice(1))
  const giveRoleTo = message.guild.member(message.author)
  if (giveRoleTo.roles.has(role.id)) {
    mes = `Już nie jesteś deweloperem **${message.content.slice(1)}**!`
    giveRoleTo.removeRole(role.id)
  } else {
    mes = `Zostałeś deweloperem **${message.content.slice(1)}**!`
    giveRoleTo.addRole(role.id)
  }
  const embed = {
    title: 'Role updated:',
    description: `${mes}`,
    color: rol.name[message.content.slice(1)].color,
    timestamp: '2018-08-11T13:35:04.860Z',
    footer: {
      icon_url: 'https://raw.githubusercontent.com/HakerEduCommunity/design-assets/master/assets/discord-thumbnail.png',
      text: 'Hakier Bot by takidelfin and Kiritito',
    },
    thumbnail: {
      url: rol.name[message.content.slice(1)].url,
    },
    author: {
      name: rol.name[message.content.slice(1)].language,
      url: rol.name[message.content.slice(1)].urlauthor,
      icon_url: rol.name[message.content.slice(1)].icon_url,
    },
  }
  message.channel.send({ embed })
}

module.exports = js
