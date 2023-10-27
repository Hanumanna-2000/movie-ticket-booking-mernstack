const express = require('express');
require("dotenv").config();
require('./adapters/connectionDB');
const cors = require('cors');
let userRoutes=require('./routes/user.route');
let adminRouter=require("./routes/admin.route")
let movieRoutes=require("./routes/movie.route")
let bookingRoutes=require("./routes/booking.route")
let app=express();
app.use(cors())
//^buil-in level middleware to accept json data
app.use(express.json())

//^navingating middleware
app.use("/user",userRoutes)
app.use("/admin",adminRouter)
app.use("/movie",movieRoutes)
app.use("/booking",bookingRoutes)
//*page not found middleware
app.use("*",(req,res,next)=>{
    res.status(404).json({error:true,message:"page not found"})
})
//! error handling middleware
app.use((err,req,res,next)=>{
    console.log(err)
})

//? creating server using express
app.listen(process.env.PORT,()=>{
    console.log(`server running in port ${process.env.PORT}`)
})