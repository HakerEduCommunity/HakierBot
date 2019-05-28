const axios = require('axios')
const apiKey = require('../../config/config')

const sub = async (message) => {
    let ddd = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCxnQfWxR4Xp4Tv_dLh2Xvtw&key=${apiKey.youtubeApiKey}`)
    let data = ddd.data.items[0].statistics
    try {
        const embed = {
          title: 'Statystyki kanału na youtube.com',
          url: 'https://www.youtube.com/channel/UCxnQfWxR4Xp4Tv_dLh2Xvtw',
          description: `**Wyświetlenia:** ${data.viewCount}\n **Subskrypcje:** ${data.subscriberCount}\n **Liczba filmików:** ${data.videoCount}`,
          color: 15605837,
          timestamp: new Date(),
          footer: {
            icon_url: 'https://raw.githubusercontent.com/HakerEduCommunity/design-assets/master/assets/discord-thumbnail.png',
            text: 'Hakier Bot by HakerEduPL Community',
          },
          thumbnail: {
            url: '',
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

module.exports = sub