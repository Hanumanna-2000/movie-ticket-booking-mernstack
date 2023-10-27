const express = require('express');
const { addMovies, getAllMovies, getSingleMovie } = require('../controllers/movie.controller');
const { authenticationServices } = require('../Services/authenticationService');

let movieRouter=express.Router();

movieRouter.post("/addmovie",authenticationServices,addMovies)
movieRouter.get("/",getAllMovies)
movieRouter.get("/:id",getSingleMovie)

module.exports=movieRouter