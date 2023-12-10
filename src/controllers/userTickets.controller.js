// userTickets.controller.js

// this file generates the qr code for a specific ticket
// the qr code stores the mongodb object string _id for this ticket for easy access
// this way, when the ticket is scanned, the server will recognize it

var QRCode = require('qrcode')

// With promises
QRCode.toDataURL('I am a pony!')
.then(url => {
  console.log(url)
})
.catch(err => {
  console.error(err)
})

// With async/await
const generateQR = async text => {
try {
  console.log(await QRCode.toDataURL(text))
} catch (err) {
  console.error(err)
}
}