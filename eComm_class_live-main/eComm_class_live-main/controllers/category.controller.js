/**
 * Controller for creating the Category
 * 
 * POST localhost:8888/ecomm/api/v1/categories
 * 
 * {
 * "name":"Household"
 * "discription":"In this will be all  the household items"
 * }
 */

const categoryModel=require ("../models/category.model");

exports.createNewCategory= async(req,res)=>{
    //(1)  Read the req body

    //(2) create the category obj
const cat_data={
    name:req.body.name,
    description:req.body.description
}

try{
//(3) insert in to Mangodb
const catgory=await categoryModel.create(cat_data)
return res.status(201).send(catgory)
}catch(err){
    console.log("Error while creating catData in mongodb",err)
    return res.status(500).send({
        message:"Error while creating catData in mongodb"
    })
}
    
    //(4) return the response of the  created category
}