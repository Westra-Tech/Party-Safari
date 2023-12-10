// partyReviewsPage.views.js

const path = require('path'); 
const fs = require('fs').promises;

const servePage = async (req, res) => {
    try {
        // Read the HTML template
        const templatePath = path.join(__dirname, '../../public/html/reviewsTemplate.html');
        const htmlContent = await fs.readFile(templatePath, 'utf8');

        // Serve the HTML content
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.end(htmlContent);

        console.log('HTML template served successfully!');
        
    } catch (err) {
        console.error('Error: ', err);
        res.statusCode = 500;
        res.end('Error serving review page');
    }
};

module.exports = servePage;
