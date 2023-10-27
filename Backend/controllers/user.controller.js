
const Booking = require('../models/booking.model');
const User= require('../models/user.model');
const bcryptjs = require('bcryptjs');

let signUp=async(req,res,next)=>{
    try {
        let {name,email,password}=req.body;
        if(!name && name.trim()==="" || !email && email.trim()==="" || !password && password.trim()===""){
            return res.status(422).json({error:true,message:"invalid inputs"})
        }

        let newPassword= bcryptjs.hashSync(password)
        let user=await  User.create({name,email,password:newPassword})
        if(!user){
            return res.status(500).json({error:true,message:"unexpected error occur"})
        }
        return res.status(201).json({error:false,message:"user added successfully",data:user._id})

    } catch (err) {
        next(err)
    }
}


let getAllUser=async(req,res,next)=>{
    try {
        let user=await User.find();
        if(!user){
            return res.status(500).json({error:true,message:"users data in null"})
        }
        return res.status(200).json({error:false,message:"user data fetched successfully",data:user})
    } catch (err) {
        next(err)
    }
}


let updateById=async(req,res,next)=>{
    try {
        let id=req.params.id;
        let {name,email,password}=req.body;
        if(!name && name.trime()==="" || !email && email.trim()==="" || !password && password.trim()===""){
            return res.status(422).json({error:true,message:"invalid inputs"})
        }

        let newPassword= bcryptjs.hashSync(password)

        let user=await User.findByIdAndUpdate(id,{name,email,password:newPassword})
        if(!user){
            return res.status(500).json({error:true,message:"unexpected error occur"})
        }
        return res.status(201).json({error:true,message:"user updated successfully",data:user})

    } catch (err) {
        next(err)
    }
}

let deleteUser=async(req,res,next)=>{
    try {
        let {id}=req.params;
        let user=await User.findByIdAndRemove(id);
        if(!user){
            return res.status(500).json({error:true,message:"unexpected error occur"})
        }
        return res.status(201).json({error:true,message:"user deleted successfully",data:user})
    } catch (err) {
        next(err)
    } 
}

let Login=async(req,res,next)=>{
    try {
        let {email,password}=req.body;
        let isExistOrNot=await User.findOne({email});
        if(!isExistOrNot){
            return res.status(500).json({error:true,message:"user not founded with given id"})
        }

        let PasswordIsCorrect= bcryptjs.compareSync(password,isExistOrNot.password);

        if(PasswordIsCorrect){
            return res.status(200).json({error:false,message:"Login successfull",id:isExistOrNot._id})
        }

        return  res.status(200).json({error:true,message:"Invalid password"})


    } catch (err) {
        next(err)
    }
}

let getBookingOfUser=async(req,res,next)=>{
    try {
        let {id}=req.params
        let book=await Booking.find({user:id})
        if(!book){
            return res.status(500).json({error:true,message:"no data found with given id"})
        }
        return res.status(200).json({error:true,message:"fetched successfully",data:book})
    } catch (error) {
        
    }
}

module.exports={getAllUser,signUp,updateById,deleteUser,Login,getBookingOfUser}