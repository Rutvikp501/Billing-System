const express = require("express")
const cors = require('cors');
const app= express();
const bodyParser = require('body-parser');
const path = require('path')
const Port= process.env.PORT || 5011;
//const DB_URL= process.env.DBURL ;
const DB_Conn = require('./src/config/DB_Conn')
require('dotenv').config()


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

const swaggerUI = require('swagger-ui-express');
const YAML = require("yamljs");


app.set("views", path.join("views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/src'));

const swaggerDocument = YAML.load(path.join(__dirname, '/swagger.yaml'));
app.use('/sgr', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


app.get('/',(req,res,next)=>{
    try {
        // res.status(200).send("testing")
        res.render('./home')
    } catch (error) {
        console.log(error);
    }
})


app.use('/mail',require('./src/Routes/mail.route'));
app.use('/user',require('./src/Routes/user.route'));
app.use('/pdf',require('./src/Routes/pdf.route'));
app.use('/excel',require('./src/Routes/excel.route'));
app.use('/product',require('./src/Routes/Product.route'));


app.listen(Port,()=>{
    try {
        DB_Conn.Connect_DB();
        console.log(`Server is running on : http://localhost:${Port}`);
    } catch (error) {
        console.log(error);
    }
})

// PORT = 5011  
// USERS=rutvik.gainn@gmail.com
// APP_PASS=uxzc tuzs dlkq awvw
// RUTVIK=patilrutvik501@gmail.com
// RAPP_PASS=mnzt tvan wirp byum