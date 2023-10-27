const express = require('express');

const { newBooking, getBookingById, deleteBooking } = require('../controllers/booking.controller');

let bookRouter=express.Router();

bookRouter.post("/",newBooking)
bookRouter.get("/:id",getBookingById)
bookRouter.delete("/:id",deleteBooking)

module.exports=bookRouter