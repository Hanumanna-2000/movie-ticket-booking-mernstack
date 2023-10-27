
const jwt= require('jsonwebtoken');
 require('dotenv').config();

let authenticationServices=(req,res,next)=>{
    try {
        let authToken=req.headers.authorization;
        if(!authToken || authToken.trim()==="" || !authToken.startsWith("Bearer")){
            return res.status(400).json({error:true,message:"Token required"})
        }
        let token=authToken.split(" ")[1];
       
        let decodedToken=jwt.verify(token,process.env.SECRETE_KEY)

        let {id}=decodedToken;
        req.movie={id}
        next()


    } catch (err) {
        next(err)
    }
}

module.exports={authenticationServices}