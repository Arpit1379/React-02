import Product from "../models/Product.js";

export const createProduct=async(req,res)=>{
    const {title ,description,category}=req.body;
    let imageUrl="";

    if (req.file) {
        imageUrl = req.file.path; 
    }

    try{
        const newProduct=new Product({title,description,category,imageUrl})
        await newProduct.save();
        res.status(201).send("product Created Done!");
    }
    catch(error){
        res.status(201).send("Don't Create the Product!");
    }
}

export const getProduct=async(req,res)=>{
    try{
        const products=await Product.find({});
        res.status(200).json(products); 
       
    }
    catch(error){
        res.status(201).send("Don't Show the Product!");
    }
}

export const getSingleProduct=async(req,res)=>{
    const {id}=req.params;
    try{
        const products=await Product.findOne({ _id: id });
        res.status(200).json(products); 
    }
    catch(error){
        res.status(201).send("Don't Show the Single Product!");
    }
}

export const updateProduct=async(req,res)=>{
    const {title ,description,category,imageUrl}=req.body;
    const {id}=req.params;
    try{
        const newProduct=new Product({title,description,category,imageUrl})
        const updateProduct=await Product.findByIdAndUpdate( id, 
            { $set: { title, description, category, imageUrl } },
            { new: true } );
        res.status(201).send(updateProduct);
    }
    catch(error){
        res.status(201).send("Don't Update the Product!");
    }
}

export const deleteProduct=async(req,res)=>{
    const {id}=req.params;
    try{
        const deleteProduct=await Product.findByIdAndDelete({_id:id});
        res.status(201).send("product Deleted Done!");
    }
    catch(error){
        res.status(201).send("Don't Delete the Product!");
    }
}
