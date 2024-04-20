const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema =  new Schema({
    Product:{type:String, require:true},
    SKU:{type:String, require:true},
    DPL:{type:Number, require:true},
    Quantity:{type:Number, require:true},
    
});

const Productmodel =mongoose.model('product',ProductSchema)
module.exports =  Productmodel;