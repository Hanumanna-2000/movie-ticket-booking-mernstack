const express = require('express');

let userRouter=express.Router();
const  { getAllUser, signUp, updateById, deleteUser, Login }= require('../controllers/user.controller');
const { getBookingById } = require('../controllers/booking.controller');


userRouter.post("/signup",signUp)
userRouter.get("/",getAllUser)
userRouter.put("/:id",updateById)
userRouter.delete("/:id",deleteUser)
userRouter.post("/login",Login)
userRouter.get("/getbooking/:id",getBookingById)



module.exports=userRouter