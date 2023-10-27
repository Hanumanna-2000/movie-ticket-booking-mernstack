const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.ATLAS_URL).then(()=>{
    console.log("database connected successfully")
}).catch((err)=>{
    console.log(err)
})