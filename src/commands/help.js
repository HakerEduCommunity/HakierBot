function help(message) {
  try {
    const embed = {
      title: 'Hakier bot commands:',
      description: '**Prefix: $** \n\n**Available roles:**\n- $js\n- $c++\n- $python\n- $visual-basic\n- $java\n- $golang\n- $swift\n- $php\n- $html\n- $lua\n- $csharp',
      url: 'https://discordapp.com',
      color: 15605837,
      timestamp: '2018-08-11T13:35:04.860Z',
      footer: {
        icon_url: 'https://raw.githubusercontent.com/HakerEduCommunity/design-assets/master/assets/discord-thumbnail.png',
        text: 'Hakier bot by TakiDelfin and Kiritito',
      },
      thumbnail: {
        url: 'https://assets.kogan.com/files/Sidebar/HelpCentre.png',
      },
      author: {
        name: 'Haker.edu.pl',
        url: 'https://haker.edu.pl/',
        icon_url: 'https://cdn.discordapp.com/icons/302874462313906179/c0d68b69e26a9af15a63d0803d978529.webp',
      },
    }
    message.channel.send({ embed })
  } catch (err) {
    console.log(console.error())
  }
}

module.exports = help
