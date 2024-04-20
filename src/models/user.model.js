const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema =  new Schema({
    Name:{type:String, require:true},
    Email:{type:String, require:true},
    Password:{type:String, require:true},
    Type:{type:String, require:true}
    
});

const usermodel =mongoose.model('user',userSchema)
module.exports =  usermodel;
