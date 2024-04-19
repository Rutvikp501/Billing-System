const express = require("express")
const userRoute = express.Router();
const  usermodel = require("../models/user.model.js");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const token = process.env.token
const validatePassword =require("../helpers/PassValidation.js")
const Enc_Dec = require("../helpers/Enc_Dec.js")


exports.GetAllUser = async (req, res) => {
    
    try {
        const user  = await usermodel.find();
        if (user.length>0){
        res.status(200).send(user)
        }else{
        res.status(200).send("Dont have Users To Show...")
        }
    } catch (error) {
        console.log(error);
    }
};

exports.Login = async (req, res) => {
    let {Email,Password}=req.body;
    const user  = await usermodel.find({Email});
    var getData = JSON.stringify(user);
    var data = JSON.parse(getData);
    console.log(req.body);
    try{
       
        if (user.length>0){
            const pass = data[0]["Password"];
            // let npass = Enc_Dec.DecryptPass(pass);            
                if (Password == pass){
                    let keyToken= jwt.sign({userId:user[0]._id},token)//setting up a token using the '_id' in user model
                    data={
                        keyToken:keyToken,
                        LoginID:user[0].LoginID,
                        Name:user[0].Name,
                        Email:user[0].Email
                    }
                    console.log(data);
                    res.send(data)
                }else{
                    res.status(500).send("Enter Valid Password ")
                }    
        }
        else{
            res.status(500).send("User not found ...!")
        }
    }catch(error){
        console.log(error);
        res.status(500).send("invalid Credentials3 ")
    }
};
exports.Register = async (req, res) => {
    const {LoginID, Name , Email ,Password }=req.body
    const getExistingUser = await usermodel.find({ Email: Email });   
    const getExistingloginID = await usermodel.find({ LoginID: LoginID });   
    console.log(req.body);
    // const valid = validatePassword(Password)
    // if(valid){
    //     return res.status(400).send({message:valid[0]})
    // }
    try{
        if (getExistingloginID!=""){
            return res.send({ status: "failed", message: "Choose different user Id.." });
        }else{
        if (getExistingUser != "") {
            return res.send({ status: "failed", message: "Email already exist." });
          }else{
            // console.log("Password",Password);
            //     var Encpass = Enc_Dec.EncryptPass(Password);
                const user = new usermodel({
                    LoginID:LoginID,
                    Password:Password,
                    Name:Name,
                    Email:Email})//the password from the body and hashed password is different
                await user.save();
                res.send("User Registered Successfully");          
            }
        }
    
    }catch(err){
        console.log(err);
        res.send("Error...");
    }
};


exports.Edit = async (req, res) => {
    const { id } = request.body;
    try {
      const result = await usermodel.findById(id);
      response.send({
        status: "success",
        data: result,
      });
    } catch (error) {
      console.log(error);
    }
};


exports.Update = async (req, res) => {
    const {Password, Name , Email }=req.body
    const getExistingUser = await usermodel.find({ Email: Email });   
    const getExistingloginID = await usermodel.find({ LoginID: LoginID });   
    // console.log(getExistingUser);
    const valid = validatePassword(Password)
    if(valid){
        return res.status(400).send({message:valid[0]})
    }
    try{
        if (getExistingloginID!=""){
            return res.send({ status: "failed", message: "Choose different user Id.." });
        }else{
        if (getExistingUser != "") {
            return res.send({ status: "failed", message: "Email already exist." });
          }else{
                // var Encpass = Enc_Dec.EncryptPass(Password);
                const user = new usermodel({LoginID:LoginID,
                    Password:Password,
                    Name:Name,
                    Email:Email})//the password from the body and hashed password is different
                await user.save();
                res.send("User Updated Successfully");          
            }
        }
    
    }catch(err){
        console.log(err);
        res.send("Error...");
    }
};

exports.Logout = async (req, res) => {
    if (req.cookies) {
        Object.keys(req.cookies).forEach((cookie) => {
            res.clearCookie(cookie);
        });
    }
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
        } 
        else {
            res.send('Logged Out');
        }
    });
}

