const mongoose = require('mongoose');

let adminSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        minLength:6
    },
    addedMovies:[{
        type:mongoose.Types.ObjectId,
        ref:"Movie"
    }]
},
{
    timestamps:true
})


module.exports=new mongoose.model("Admin",adminSchema)