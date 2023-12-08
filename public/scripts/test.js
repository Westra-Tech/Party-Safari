const qrCode = require('qrcode');
const fs = require('fs');

// Generate the QR code
qrCode.toDataURL('https://example.com', (err, url) => {
  if (err) throw err;

  // Create the HTML file content with the QR code image
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>QR Code Example</title>
    </head>
    <body>
      <img src="${url}" alt="QR Code">
    </body>
    </html>
  `;

  // Write the HTML file
  fs.writeFile('qrcode.html', htmlContent, (err) => {
    if (err) throw err;
    console.log('QR code generated and inserted into qrcode.html');
  });
});
