const mongoose = require('mongoose');

let movieSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    
    actors:[{type:String,required:true}],

    releaseDate:{
        type:Date,
        required:true,
        
    },
    postUrl:{
        type:String,
        required:true
    },
    featured:{
        type:Boolean
    },
    bookings:[{
        type:mongoose.Types.ObjectId,
        ref:"Booking"
    }],
    admin:{
        type:mongoose.Types.ObjectId,
        ref:"Admin",
        required:true,
        
    }
},
{timestamps:true})

module.exports=new mongoose.model("Movie",movieSchema)