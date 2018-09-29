const VirusTotalToken = '995e4b11fcbe66a9c8bcbc9c6df5459f394bf2575999bb5d67c1929d2e13019f'
const request = require('request')
const fs = require('fs')

var url = 'https://cdn.discordapp.com/attachments/446783858122293270/495347793695866900/fgdump.exe';

var download = request.get(url);
download.on('response',  function (res) {
  res.pipe(fs.createWriteStream('./plik.exe'));
  res.on( 'end', function(){
    console.log('pobrano plik!')
  });
});


console.log('wysyłamy plik')


var formData = {
    apikey: VirusTotalToken,
    file: fs.createReadStream(__dirname + '/plik.exe'),
};
request.post({url:'http://www.virustotal.com/vtapi/v2/file/scan', formData: formData}, function(err, httpResponse, body) {
    if (err) {
        return console.error('upload failed:', err);
    }
    //console.log('Upload successful!  Server responded with:', body);

    if (JSON.parse(body).md5=='d41d8cd98f00b204e9800998ecf8427e'){console.log('NULLFILE')}
    var VTRaportLink = JSON.parse(body).permalink
    console.log(VTRaportLink)



    var formData = {
        apikey: VirusTotalToken,
        resource: JSON.parse(body).resource
    }
    
    request.post({url:'https://www.virustotal.com/vtapi/v2/file/report', formData: formData}, function optionalCallback(err, httpResponse, body) {
        if (err) {
          return console.error('Check Status failed:', err);
        }
        const VTReportRespone = JSON.parse(body)
        //console.log(body);
        if (VTReportRespone.md5 == 'd41d8cd98f00b204e9800998ecf8427e'){
          console.log('NULL FILE!');
        }
        else if (VTReportRespone.response_code != 1){
          console.log(body);
        }else{
          console.log(VTReportRespone.positives +'/'+ VTReportRespone.total)
          //VTmessage(message, VTRaportLink, VTReportRespone.positives, VTReportRespone.total)            
        }
        
      });


    
});
