const nodemailer = require('nodemailer')
require('dotenv').config();
const path = require('path')
const assetsPath = path.join(__dirname, '..', 'assets');

const pdfPath = path.join(assetsPath, 'RUTVIK-PATIL-CV-.pdf');
const imagePath = path.join(assetsPath, 'image.jpg');

async function sendMailer(EmailData) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.RUTVIK,
            pass: process.env.RAPP_PASS
            // user: process.env.USERS,
            // pass: process.env.APP_PASS
        },
        tls: { rejectUnauthorized: false },

        debug: true
    });

    const mailOptions = {
        from: {
            name: 'Rutvik Patil',
            address: process.env.USERS
        },
        to: EmailData.To,
        subject: EmailData.subject,
        text: EmailData.text,
        //html: '<b>Testing Send mail</b>',
        attachments: [
            {
                filename: 'RUTVIK-PATIL-CV-.pdf',
                path: pdfPath,
                contentType: "application/pdf"
            },
            // {
            //     filename:'image.jpg',
            //     path:imagePath,
            //     contentType:"image/jpg"
            // },
        ]

    };

    // console.log(mailOptions);
    const info = await transporter.sendMail(mailOptions);
    // console.log(info)
    return info;
};

async function Profile_Contact(EmailData) {
    const data = {
        To: "patilrutvik501@gmail.com",
        subject: `Contact`,
        html: `<p>msg from :  ${EmailData.Email} </p>
                   <p>${EmailData.Message}</p>`,
    };
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.RUTVIK,
            pass: process.env.RAPP_PASS
            // user: process.env.USERS,
            // pass: process.env.APP_PASS
        },
        tls: { rejectUnauthorized: false },

        debug: true
    });

    const mailOptions = {
        from: {
            name: 'Rutvik Patil',
            address: process.env.USERS
        },
        to: data.To,
        subject: data.subject,
        text: data.text,
        html: data.html,


    };

    // console.log(mailOptions);
    const info = await transporter.sendMail(mailOptions);
    // console.log(info)
    return info;
};

async function sendFile( EmailData) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.RUTVIK,
            pass: process.env.RAPP_PASS
            // user: process.env.USERS,
            // pass: process.env.APP_PASS
        },
        tls: { rejectUnauthorized: false },

        debug: true
    });

    const mailOptions = {
        from: 'Rutvik Patil',
        to: EmailData.email,
        subject: ``,
        html: `<p>Hello ${EmailData.name}</p>
        <p>I am a Full-stack Developer.  I have specialized in backend development, With expertise in building secured backend APIs, utilizing Node.js and Express.js to create and manage RESTful APIs. 
        My expertise extends to database management, particularly in MongoDB, Furthermore, my proficiency in crafting responsive front-end pages with HTML, CSS, JavaScript, and EJSand React underscores my commitment to user-centered design. Additionally, I've experience in tools like Gitlab/Github, and Postman.
        </P>
        <p>I have attached my resume for your review and look forward to hear from you.</p>
        
        `,
        attachments: [
            {
                filename: 'RUTVIK-PATIL-CV-.pdf',
                path: pdfPath,
                contentType: "application/pdf"
            },
            // {
            //     filename:'image.jpg',
            //     path:imagePath,
            //     contentType:"image/jpg"
            // },
        ]
    };
    // console.log(mailOptions);
    const info = await transporter.sendMail(mailOptions);
    // console.log(info)
    return info;
}

async function sendFileMailer(extentionType, buffer, EmailData) {
    let EmailTo = 'patilrutvik501@gmail.com';
    let sheetmailer;
    let type;
    if (extentionType == "pdf") {
        sheetmailer = 'application/pdf'
        type = ".pdf";
    }
    else {
        sheetmailer = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        type = ".xlsx";
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.RUTVIK,
            pass: process.env.RAPP_PASS
            // user: process.env.USERS,
            // pass: process.env.APP_PASS
        },
        tls: { rejectUnauthorized: false },

        debug: true
    });

    const mailOptions = {
        from: 'Rutvik Patil',
        to: EmailTo,
        subject: `testing pdf mail send `,
        html: '',
        attachments: [
            {
                content: buffer,
                filename: `testing pdf mail send`,
                contentType:
                    sheetmailer
            }
        ]
    };
    // console.log(mailOptions);
    const info = await transporter.sendMail(mailOptions);
    // console.log(info)
    return info;
}

module.exports = { sendMailer, Profile_Contact, sendFileMailer ,sendFile};