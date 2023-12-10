// loginfail.views.js

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, './../../public/html/loginfail.html');

const loginFail = (req, res) => {
    console.log('loginfail begin');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log('500-loginfailviews');
            //res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('Error loading HTML file');
        } else {
            console.log('200-loginfailviews');
            //res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
};

module.exports = loginFail;