const express= require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router=express.Router();


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

 user= await User.create({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email
    })


    res.json(user)}
    catch(err){
        console.log(err.message);
        res.status(500).send("some error has occured");
    }
})



module.exports= router
