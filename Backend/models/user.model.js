const mongoose = require('mongoose');

let userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    booking:[{type:mongoose.Types.ObjectId,ref:"Booking"}]
},{
    timestamps:true
})

module.exports=new mongoose.model("User",userSchema)