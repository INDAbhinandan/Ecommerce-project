/**
 * we create the schema for category:-
 *  for name and its discription
 * 
 */

const mongoose=require("mongoose");
const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    description:{
        type:String,
        require:true
    }
},{timestamps:true,versionKey:false})// here timestamp give the time of CRUD occure
module.exports=mongoose.model("Category",categorySchema) //here created a collection named-Categories and create in module form of this file 

