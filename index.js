const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');
const app = express();
// const keyFilename = './som-rit-ourvoice-cloud-storage-key.json';

app.use(express.json());


/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
app.post('/', async (req, res, next) => {
  try {
    const type = req.get('content-type');
    const {html, url} = req.body

    if(type !== 'application/x-www-form-urlencoded')
        return res.status(404).send('Content-Type must be set to application/x-www-form-urlencoded')
    
    // Create a browser instance
    const browser = await puppeteer.launch();
        
    // Create a new page
    const page = await browser.newPage();
    
    if(url){
        // Website URL to export as pdf
        await page.goto(url, { waitUntil: 'networkidle0' }); 
    } else {
        if(!html || html.length === 0)
            return res.status(404).send('Error, no html passed in body.')

        await page.setContent(html, { waitUntil: 'domcontentloaded' });
    }
    
    await page.emulateMediaType('screen');
    
    const pdf = await page.pdf({
        path: 'result.pdf',
        margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
        printBackground: true,
        format: 'A4',
    });

    return res.status(200).send({ 'pdf': pdf });


  } catch (err) {
    next(err);
  }
});

module.exports = {
  app
};