const express = require('express');
const { addAdmin, admiLogin, getAdmin } = require('../controllers/admin.controller');

let adminRouter=express.Router();

adminRouter.post("/signup",addAdmin)
adminRouter.post("/login",admiLogin)
adminRouter.get("/",getAdmin)


module.exports=adminRouter
