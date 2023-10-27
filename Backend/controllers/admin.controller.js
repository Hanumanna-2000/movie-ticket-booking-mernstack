const Admin = require('../models/admin.model');
const bcryptjs = require('bcryptjs');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const { addMovies } = require('./movie.controller');

let addAdmin=async(req,res,next)=>{
    try {
        let {email,password}=req.body;
        if(!email && email.trim()==="" || !password && password.trim()===""){
            return res.status(422).json({error:true,message:"invalid inputs"})
        }
        let isExist=await Admin.findOne({email});
        if(isExist){
            return res.status(500).json({error:true,message:"Admin already exists"})
        }

        let newPassword= bcryptjs.hashSync(password)

        let admin=await Admin.create({email,password:newPassword})
        if(!admin){
            return res.status(500).json({error:true,message:"unexpected error"})
        }
        return res.status(201).json({error:false,message:"admin added successfully",data:admin})

    } catch (err) {
        next(err)
    }
}

let admiLogin=async(req,res,next)=>{
    try {
        let {email,password}=req.body;
        if(!email && email.trim()==="" || !password && password.trim()===""){
            return res.status(422).json({error:true,message:"invalid inputs"})
        }
        let isExist=await Admin.findOne({email})
        if(!isExist){
            return res.status(500).json({error:true,message:"Admin not found"})
        }
        let isCorrect=bcryptjs.compareSync(password,isExist.password)
        if(isCorrect){
            let token= jwt.sign({id:isExist._id},process.env.SECRETE_KEY,{expiresIn:process.env.EXPIRES_IN})
            return res.status(200).json({error:false,message:"Authentication complete",tok:token,id:isExist._id})
        }
        return res.status(500).json({error:true,message:"Invalid Password"})
    } catch (err) {
        next(err)
    }
}

let getAdmin=async(req,res,next)=>{
    try {
        let admins=await Admin.find();
        if(!admins){
            return res.status(500).json({error:true,message:"request failed, admin is empty"})
        }
        return res.status(200).json({error:false,message:"fetched successfully",data:admins})
    } catch (err) {
       next(err) 
    }
}
module.exports={addAdmin,admiLogin,getAdmin}