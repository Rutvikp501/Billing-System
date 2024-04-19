
const puppeteer = require("puppeteer");
const ejs = require("ejs")
const fs = require("fs");
async function generatePDF(filepath, report_name, ) {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        const templateContent = fs.readFileSync(filepath, 'utf-8');
        const htmlContent = ejs.render(templateContent, { report_name: report_name, });
        await page.setContent(htmlContent)
        const pdfBuffer = await page.pdf({
            format: "A3", margin: { top: '10px', bottom: '40px' },
            displayHeaderFooter: true,
            footerTemplate: `
            <div style="width:100%;display:flex;justify-content:right">
            <p style="margin:0px 20px 0px 0px;font-size: 10px;">Page 
            <span class="pageNumber"></span>
                OF
            <span class="totalPages"></span>
            </p>
         </div>`});
        await browser.close();
        return pdfBuffer;
    }
    catch (e) {
        console.log(e)
    }
}


module.exports = generatePDF;