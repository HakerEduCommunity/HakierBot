const VirusTotalToken = '995e4b11fcbe66a9c8bcbc9c6df5459f394bf2575999bb5d67c1929d2e13019f'
const request = require('request')
const fs = require('fs')

function virustotal(message) {
  try {
    let StatusMessage
    const Attachment = (message.attachments).array()
    const downloadLink = Attachment[0].url // link to download file from discord
    console.log(downloadLink)

    const regex = /[^/]{0,}$/gm
    const name = downloadLink.match(regex)[0] // name of file

    // check file extension
    const enableExtesnionToScan = ['exe', 'zip', 'rar', '7zip']
    const regexExtension = (/[^.]{0,}$/gm)
    const extenstion = name.match(regexExtension)[0]
    if (!enableExtesnionToScan.includes(extenstion)) {
      return console.log(`Tego pliku nie skanuj (${name})`)
    }

    if (enableExtesnionToScan.includes(extenstion)) {
      StatusMessage = message.channel.send('Preparing...')
    }

    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let dirnamerand = ''
    for (let i = 0; i < 8; i++) {
      dirnamerand += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    const path = `${__dirname}/VirusTotalFiles/${dirnamerand}_${name}`

    // Download file to scan
    StatusMessage.then(sentMessage => sentMessage.edit('📁 Downloading...'))
    const download = request.get(downloadLink)
    download.on('response', (res) => {
      res.pipe(fs.createWriteStream(path))
      res.on('end', () => {
        console.log(`Pobrano plik! (${name})`)

        // Upload File to VirusTotal
        StatusMessage.then(sentMessage => sentMessage.edit('📬 Upload to VirusTotal...'))
        const formData = {
          apikey: VirusTotalToken,
          file: fs.createReadStream(path),
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
          StatusMessage.then(sentMessage => sentMessage.edit(`🔍 Wait for Raport from VirusTotal...\n${VTRaportLink}`))
          const formDataRaport = {
            apikey: VirusTotalToken,
            resource: JSON.parse(body).resource,
          }
          let IsScanedSuccessfull = false
          // Checking Loop
          const xyz = (function checkRaport() {
            if (IsScanedSuccessfull === false) {
              console.log('sprawdzam')

              request.post({ url: 'https://www.virustotal.com/vtapi/v2/file/report', formDataRaport }, (err, _httpResponse, body) => {
                if (err) {
                  return console.error('Check Status failed:', err)
                }
                console.log(body)
                let VTReportRespone
                try {
                  VTReportRespone = JSON.parse(body)
                } catch (err) {
                  console.log(console.error())
                  console.log('Nie udało się pobarc raportu')
                  return StatusMessage.then(sentMessage => sentMessage.edit(`❌ Error, You can manually check info about file here\n${VTRaportLink}`))
                }

                if (VTReportRespone.md5 === 'd41d8cd98f00b204e9800998ecf8427e') {
                  console.log('NULL FILE!')
                } else if (VTReportRespone.response_code === -2) {
                  console.log('wciaz sprawdzam')
                } else if (VTReportRespone.response_code === 1) {
                  console.log(`Skanowanie Zakonczone (${name}) ${VTReportRespone.positives}/${VTReportRespone.total}`)
                  IsScanedSuccessfull = true
                  VTmessage(StatusMessage, VTRaportLink, VTReportRespone.positives, VTReportRespone.total)
                  // Delete File
                  fs.unlink(path, (err) => {
                    if (err) throw err
                    console.log(`Plik usunieto (${name})`)
                  })
                } else {
                  console.log(body)
                }
              })
              setTimeout(checkRaport, 7000)
            }
          }())
        })
      })
    })

    function VTmessage(tracker, link, positives, total) {
      const embed = {
        title: 'Go to Analysis',
        description: `Detection rate (**${positives}**/${total})`,
        url: link,
        color: 3891711,
        timestamp: '2018-09-29T21:40:38.646Z',
        footer: {
          icon_url: 'https://raw.githubusercontent.com/HakerEduCommunity/design-assets/master/assets/discord-thumbnail.png',
          text: 'Hakier Bot by takidelfin and Kiritito',
        },
        thumbnail: {
          url: 'https://i.imgur.com/WLnclEQ.png',
        },
        author: {
          name: 'VirusTotal',
          icon_url: 'https://i.imgur.com/GIs1ABG.png',
        },
      }
      tracker.then(sentMessage => sentMessage.edit({ embed }))
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = virustotal
