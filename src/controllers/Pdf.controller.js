"use strict";
const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path = require("path");
const generatePDF = require("../Util/Pdf.util");
const { sendFileMailer,sendFile } = require('../Util/Mail.util');

exports.PDF_Creation = async(req, res, next) => {
    try {
        // let __dirname = "C:"
        // let filePath = path.join(__dirname);
        // let image = fs.readFileSync(filePath,);
        // let imageBase = Buffer.from(image).toString('base64');
        // let signature = `data:image/jpeg;base64,${imageBase}`;
        let ceo_name =""
        let fonts = {
            Roboto: {
                normal: 'node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf',
                bold: 'node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf',
                italics: 'node_modules/roboto-font/fonts/Roboto/roboto-italic-webfont.ttf',
                bolditalics: 'node_modules/roboto-font/fonts/Roboto/roboto-bolditalic-webfont.ttf'
            }
        };

        let printer = new PdfPrinter(fonts);
        let dd = {
                content: [
                    // {
                    //   text:`${name}` ,
                    //   marginBottom: 10,
                    //   style: {
                    //     fontSize: 25,
                    //     bold:true, 
                    //   alignment: "center",
                    //   },
                    // },
                    
                    // {
                    //   stack: [
                    //     {
                    //       text: "Annexure 2(b)(ii)",
                    //       style: {
                    //         alignment: "right",
                    //         bold: true
                    //       },
                    //       marginBottom: 20
                    //     },  
                    //   ],
                    // },
          
                    // {
                    //   text: "UNDERTAKING",
                    //   alignment: "center",
                    //   marginBottom: 10
                    // },
          
                    {
                      columns: [
                        {
                          stack: [
          
                            { text: [{ text: ` Hello ${ceo_name},` }], bold: true  },
          
              
                          ],
                          alignment: 'left'
                        },
                       
                      ],
                      marginTop: 25,
                      marginBottom: 30
                    },
                    {
                      text:[
                        "I am a Full-stack Developer. At Gainn Fintech Pvt Ltd, I have specialized in backend development, utilizing",
                        { text: `Node.js`, bold: true },  
                        "and",
                        { text: `Express.js`, bold: true},
                        ` to create and manage `,
                        {text: `RESTful APIs.`, bold: true},
                        `My expertise extends to database management, particularly in`,
                        {text: `MongoDB,`, bold: true},
                        `Furthermore, my proficiency in crafting responsive front-end pages with `,
                        {text: `HTML, CSS, JavaScript, and EJS,`, bold: true},
                        `and `,
                        {text: `React`, bold: true},
                        `underscores my commitment to user-centered design. Additionally, I've experience in tools like `,
                        {text: `Gitlab/Github,  Postman.`, bold: true},
                        `and`,
                        {text: `Gitlab/Github,  Postman.`, bold: true},
                      ],
                      style: {
                        fontSize: 12
                      },
                      marginBottom: 20
                    },

                    
                    {
                      columns: [
                        {
                          stack: [

                            { text: [{ text: `Regards !`}], },
                            { text: [{ text: `Rutvik Patil`}], },
                            { text: [{ text: `8591575654`}], },
              
                          ],
                          alignment: 'left'
                        },
                       
                      ],
                      marginTop: 25,
                      marginBottom: 30
                    },
                    
                  ],    
        };

        let pdfDoc = printer.createPdfKitDocument(dd);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=generated.pdf');
        // Pipe the PDF document directly to the response
        pdfDoc.pipe(res);
        // Finalize the PDF document
        pdfDoc.end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating PDF');
    }
};



exports.PDF_Creation_EJS_format = async (req, res) => {
    try {
                let filepath = "views/Pdf/PDF_Format.ejs";
                const pdfBuffer = await generatePDF(filepath, );
    
                res.setHeader('Content-Disposition', 'attachment; filename=My_resume.pdf');
                res.setHeader('Content-Type', 'application/pdf');
                res.end(pdfBuffer);
            // }else {
            // let excelBuffer = await excelCreation("All Segment P&L", clientDetails, data, param);
            // if (req.body.rtype == "mail") {
                // let ans = await sendFileMailer("xlsx", excelBuffer, "LT_ST Report", clientDetails);
                // return res.send({
                //     ...Constants.status200(),
                //     ...Constants.success(),
                //     ...Constants.info(),
                //     ...Constants.data(ans),
                // });
            // }
            // res.setHeader('Content-Disposition', 'attachment; filename=file.xlsx');
            // res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            // return res.end(excelBuffer);
           
       
        
    } catch (err) {
        res.send('Error While creating  PDF' , err );
    }
};


exports.sendFile = async (req, res) => {
    let EmailData = req.body;
    try {
        let filepath = "views/Pdf/PDF_Format.ejs";
        const pdfBuffer = await generatePDF(filepath);

        // Send the PDF as an attachment via email
        // let ans = await sendFileMailer("pdf", pdfBuffer, EmailData);
        let ans = await sendFile(EmailData);
        // Return a success message to the client
        return res.status(200).send(`Mail sent successfully to: ${EmailData.email}. Response: ${ans}`);

    } catch (err) {
        // Handle errors properly
        console.error('Error while creating PDF or sending email:', err);
        return res.status(500).send('Error while creating PDF or sending email.');
    }
};

exports.PDF_Mail = async (req, res) => {
    let EmailData = req.body;
    try {
        let filepath = "views/Pdf/PDF_Format.ejs";
        const pdfBuffer = await generatePDF(filepath);

        // Send the PDF as an attachment via email
         let ans = await sendFileMailer("pdf", pdfBuffer, EmailData);
        // Return a success message to the client
        return res.status(200).send(`Mail sent successfully to: ${EmailData.To}. Response: ${ans}`);

    } catch (err) {
        // Handle errors properly
        console.error('Error while creating PDF or sending email:', err);
        return res.status(500).send('Error while creating PDF or sending email.');
    }
};

