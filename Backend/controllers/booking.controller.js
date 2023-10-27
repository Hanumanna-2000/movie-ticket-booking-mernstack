const { default: mongoose } = require('mongoose');
const  Booking= require('../models/booking.model');
const Movie = require('../models/movie.model');
const User = require('../models/user.model');
let newBooking=async(req,res,next)=>{
    try {
        let {movie,date,seatNumber,user}=req.body;
        let existingMovie=await Movie.findById(movie)
        let existingUser=await User.findById(user)
        if(!existingMovie){
            return res.status(500).json({error:true,message:"request failed,no movie found with given id"})
        }
        if(!existingUser){
            return res.status(500).json({error:true,message:"request failed,no user found with given id"})
        }
        let newBooking=new  Booking({movie,date:new Date(`${date}`),seatNumber,user})
        let session=await mongoose.startSession();
        session.startTransaction();
        existingMovie.bookings.push(newBooking)
        existingUser.booking.push(newBooking)
        await existingMovie.save({session})
        await existingMovie.save({session})
        await newBooking.save({session})
        session.commitTransaction()
        if(!newBooking){
            return res.status(500).json({error:true,message:"request failed"})
        }
         return res.status(200).json({error:true,message:"movie added successfully",data:newBooking})
    } catch (err) {
        next(err)
    }
}

let getBookingById=async(req,res,next)=>{
    try {
        let {id}=req.params;

        let bookingId=await Booking.findById(id);
        if(!bookingId){
            return res.status(500).json({error:true,message:"request failed, no booking found with given  id"})
        }
        return res.status(200).json({error:false,message:"fetched successfully",data:bookingId})
    } catch (err) {
        next(err)
    }
}

let deleteBooking=async(req,res,next)=>{
    try {
        let {id}=req.params;
        let book=await Booking.findByIdAndRemove(id).populate("user movie");
        let session=await mongoose.startSession();
        session.startTransaction();
        await book.user.booking.pull(book)
        await book.movie.bookings.pull(book)
        await book.user.save({session})
        await book.movie.save({session})
        session.commitTransaction()
        if(!book){
            return res.status(500).json({error:true,message:"unexpected error occur"})
        }
        return res.status(200).json({error:false,message:"deleted successfully"})
    } catch (err) {
       next(err) 
    }
}
module.exports={newBooking,getBookingById,deleteBooking}