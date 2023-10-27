
const { default: mongoose } = require('mongoose');
const  Movie= require('../models/movie.model');
const Admin = require('../models/admin.model'); 

let addMovies=async(req,res,next)=>{
    try {
        let {title,description,actors,releaseDate,featured,postUrl}=req.body;

        if(!title || title.trim()==="" || !description || description.trim()==="" ||  !postUrl || postUrl.trim()===""){
            return res.status(422).json({error:true,message:"Invalid input"})
        }

        let findMovie=new Movie({title,description,actors,releaseDate:new Date(`${releaseDate}`),featured,postUrl,admin:req.movie.id})
            let session=await mongoose.startSession()
            let adminUser=await Admin.findById(req.movie.id)
            session.startTransaction()
            console.log(req.movie.id)
            await findMovie.save({session})
            adminUser.addedMovies.push(findMovie)
            await adminUser.save({session})
            await session.commitTransaction()

        if(!findMovie){
            return res.status(500).json({error:true,message:"request failed"})
        }
        return res.status(200).json({error:false,message:"movie added success full",data:findMovie})
    } catch (err) {
        next(err)
    }
}

let getAllMovies=async(req,res,next)=>{
    try {
        let movie=await Movie.find();
        if(!movie){
            return res.status(500).json({error:true,message:"request failed, movie is empty"})
        }
        return res.status(200).json({error:false,message:"fetched successfully",data:movie})

    } catch (err) {
        next(err)
    }
}

let getSingleMovie=async(req,res,next)=>{
    try {
        let {id}=req.params;
        let movie= await Movie.findById(id);
        if(!movie){
            return res.status(500).json({error:true,message:"request failed, no data found with given id"})
        }
        return res.status(200).json({error:true,message:"fetched successfully",movie})
    } catch (err) {
        next(err)
    }
}
module.exports={addMovies,getAllMovies,getSingleMovie}