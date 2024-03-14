import { Schema, model } from "mongoose";

const ProductSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:false
    },
    category:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:false
    },
},{timestamps:true})

const Product=model('Product',ProductSchema);

export default Product;