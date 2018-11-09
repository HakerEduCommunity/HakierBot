const config = require('../config')

const VirusTotalToken = config.virustotaltoken
const request = require('request')
const fs = require('fs')

function virustotal(message) {
  try {
    const Attachment = (message.attachments).array()
    const downloadLink = Attachment[0].url // link to download file from discord
    // console.log(downloadLink)

    const regex = /[^/]{0,}$/gm
    const name = downloadLink.match(regex)[0] // name of file

    // check file extension
    const enableExtesnionToScan = ['exe', 'zip', 'rar', '7zip']
    const regexExtension = (/[^.]{0,}$/gm)
    const extenstion = name.match(regexExtension)[0]
    if (!enableExtesnionToScan.includes(extenstion)) {
      // console.log(`Tego pliku nie skanuj (${name})`)
      return
    }


    let dirnamerand = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < 8; i++) { dirnamerand += possible.charAt(Math.floor(Math.random() * possible.length)) }

    const path = `${__dirname}/VirusTotalFiles/${dirnamerand}_${name}`


    // Download file to scan
    const StatusMessage = message.channel.send('📁 Downloading...')
    const download = request.get(downloadLink)
    download.on('response', (res) => {
      res.pipe(fs.createWriteStream(path))
      res.on('end', () => {
        // console.log(`Pobrano plik! (${name})`)

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

          if (JSON.parse(body).md5 === 'd41d8cd98f00b204e9800998ecf8427e') { console.log('NULLFILE') }
          const VTRaportLink = JSON.parse(body).permalink
          // console.log(VTRaportLink)


          // GET Raport about File from VirusTotal
          StatusMessage.then(sentMessage => sentMessage.edit(`🔍 Wait for Raport from VirusTotal...\n${VTRaportLink}`))
          const formData = {
            apikey: VirusTotalToken,
            resource: JSON.parse(body).resource,
          }
          let IsScanedSuccessfull = false
          // Checking Loop
          const xyz = (function checkRaport() {
            if (IsScanedSuccessfull === false) {
              // console.log('Sprawdzam VirusTotal czy jest raport')

              request.post({ url: 'https://www.virustotal.com/vtapi/v2/file/report', formData }, (err, _httpResponse, body) => {
                if (err) {
                  return console.error('Check Status failed:', err)
                }
                // console.log(body);
                let VTReportRespone
                try {
                  VTReportRespone = JSON.parse(body)
                } catch (err) {
                  // console.log(console.error())
                  // console.log('Nie udało się pobarc raportu')
                  StatusMessage.then(sentMessage => sentMessage.edit(`❌ Error, You can manually check info about file here\n${VTRaportLink}`))
                  return
                }


                if (VTReportRespone.md5 === 'd41d8cd98f00b204e9800998ecf8427e') {
                  console.log('NULL FILE!')
                } else if (VTReportRespone.response_code === -2) {
                  // console.log('wciaz sprawdzam')
                } else if (VTReportRespone.response_code === 1) {
                  console.log(`Skanowanie Zakonczone (${name}) ${VTReportRespone.positives}/${VTReportRespone.total}`)
                  IsScanedSuccessfull = true
                  VTmessage(StatusMessage, VTRaportLink, VTReportRespone.positives, VTReportRespone.total)
                  // Delete File
                  fs.unlink(path, (err) => {
                    if (err) throw err
                    // console.log(`Plik usunieto (${name})`);
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
  } catch (err) {
    console.log(console.error())
  }
}

function VTmessage(tracker, link, positives, total) {
  const embed = {
    title: 'Go to Analysis',
    description: `Detection rate (**${positives}**/${total})`,
    url: link,
    color: 3891711,
    timestamp: '2018-09-29T21:40:38.646Z',
    footer: {
      icon_url: 'https://raw.githubusercontent.com/HakerEduCommunity/design-assets/master/assets/discord-thumbnail.png',
      text: 'Hakier Bot by HakerEduPL Community',
    },
    thumbnail: {
      url: 'https://static-dot-virustotalcloud.appspot.com/ui-public/images/thumbprint.png',
    },
    author: {
      name: 'VirusTotal',
      icon_url: 'https://static-dot-virustotalcloud.appspot.com/ui-public/images/thumbprint.png',
    },
  }
  tracker.then(sentMessage => sentMessage.edit({ embed }))
}


module.exports = virustotal
