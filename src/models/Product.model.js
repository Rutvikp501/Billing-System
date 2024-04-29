const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema =  new Schema({
    Product:{type:String, },
    Competition_Product:{type:String, },
    SKU:{type:String, },
    DPL:{type:Number, },
    Quantity:{type:Number,default:0 },
    
});

const Productmodel =mongoose.model('product',ProductSchema)
module.exports =  Productmodel;