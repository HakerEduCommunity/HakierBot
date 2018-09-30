const VirusTotalToken = '995e4b11fcbe66a9c8bcbc9c6df5459f394bf2575999bb5d67c1929d2e13019f'
const request = require('request')
const fs = require('fs')

function virustotal(message) {
  try {
    const StatusMessage = message.channel.send('Preparing...')
    const Attachment = (message.attachments).array()
    const downloadLink = Attachment[0].url // link to download file from discord
    console.log(downloadLink)

    const regex = /[^/]{0,}$/gm
    const name = downloadLink.match(regex) // name of file

    // Download file to scan
    StatusMessage.then(sentMessage => sentMessage.edit('Downloading...'))
    const download = request.get(downloadLink)
    download.on('response', (res) => {
      res.pipe(fs.createWriteStream(`${__dirname}/VirusTotalFiles/plik.exe`))
      res.on('end', () => {
        console.log('pobrano plik!')

        // Upload File to VirusTotal
        StatusMessage.then(sentMessage => sentMessage.edit('Uploaded to VirusTotal...'))
        const formData = {
          apikey: VirusTotalToken,
          file: fs.createReadStream(`${__dirname}/VirusTotalFiles/plik.exe`),
        }
        request.post({ url: 'http://www.virustotal.com/vtapi/v2/file/scan', formData }, (err, httpResponse, body) => {
          if (err) {
            return console.error('upload failed:', err)
          }

          if (JSON.parse(body).md5 === 'd41d8cd98f00b204e9800998ecf8427e') {
            console.log('NULLFILE')
            return message.reply('Dlaczego mi wysyłasz pusty plik? ...')
          }
          const VTRaportLink = JSON.parse(body).permalink
          console.log(VTRaportLink)


          // GET Raport about File from VirusTotal
          StatusMessage.then(sentMessage => sentMessage.edit('Wait for Raport from VirusTotal...'))
          const formData = {
            apikey: VirusTotalToken,
            resource: JSON.parse(body).resource,
          }
          let IsScanedSuccessfull = false
          // Checking Loop
          const xyz = (function checkRaport() {
            if (IsScanedSuccessfull === false) {
              console.log('sprawdzam')

              request.post({ url: 'https://www.virustotal.com/vtapi/v2/file/report', formData }, (err, _httpResponse, body) => {
                if (err) {
                  return console.error('Check Status failed:', err)
                }
                // console.log(body);
                try {
                  const VTReportRespone = JSON.parse(body)
                  if (VTReportRespone.md5 === 'd41d8cd98f00b204e9800998ecf8427e') {
                    console.log('NULL FILE!')
                  } else if (VTReportRespone.response_code === -2) {
                    console.log('wciaz sprawdzam')
                  } else if (VTReportRespone.response_code === 1) {
                    console.log('WYJDZ MAM TO CO CHCE')
                    IsScanedSuccessfull = true
                    console.log(`${VTReportRespone.positives}/${VTReportRespone.total}`)

                    VTmessage(StatusMessage, VTRaportLink, VTReportRespone.positives, VTReportRespone.total)
                  } else {
                    console.log(body)
                  }
                } catch (err) {
                  return console.log(err)
                }
              })
              setTimeout(checkRaport, 5000)
            }
          })
        })
      })
    })

    function VTmessage(tracker, link, positives, total) {
      const embed = {
        title: `File scaned (${positives}/${total})`,
        description: `[Link to Analysis](${link})`,
        color: '22684',
        timestamp: '2018-08-11T13:35:04.860Z',
        footer: {
          icon_url: 'https://raw.githubusercontent.com/HakerEduCommunity/design-assets/master/assets/discord-thumbnail.png',
          text: 'Hakier Bot by takidelfin and Kiritito',
        },
        thumbnail: {
          url: 'https://static-dot-virustotalcloud.appspot.com/ui-public/images/thumbprint.png',
        },
        author: {
          name: 'VirusTotal',
          url: link,
          icon_url: 'https://static-dot-virustotalcloud.appspot.com/ui-public/images/thumbprint.png',
        },
      }
      // message.channel.send({ embed })
      tracker.then(sentMessage => sentMessage.edit({ embed }))
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = virustotal
