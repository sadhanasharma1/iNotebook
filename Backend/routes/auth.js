const express= require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router=express.Router();

const JWT_SECRET = 'sadhanaisgoodgi$rl'
//Create a User using POST "/api/auth/createuser". No Login Required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min:5}),
    body('email','email').isEmail(),
    body('password','password must be atleast 5 characters').isLength({min:5})
], async(req,res)=>{
    //If there is error : return thr Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors:errors.array()});
    }
  //check whether the user with same email already exist
  try{
 let user = await User.findOne({email:req.body.email});
if(user){
    return res.status(400).json({error: "sorry a user with this email already exist"})
}
const salt=  await bcrypt.genSalt(10);  // salt generated

const secPass= await bcrypt.hash(req.body.password,salt);
//Create a new user
 user= await User.create({
        name:req.body.name,
        password:secPass,
        email:req.body.email
    });
   const data={
    user:{
        id:user.id
    }
   }
   const authToken = jwt.sign(data,JWT_SECRET);
    res.json({authToken})
}
    catch(err){
        console.log(err.message);
        res.status(500).send("some error has occured");
    }
})



module.exports= router
