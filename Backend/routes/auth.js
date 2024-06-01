const express= require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router=express.Router();


//Create a User using POST "/api/auth". Doesn't require Auth
router.post('/',[
    body('name','Enter a valid name').isLength({min:5}),
    body('email','email').isEmail(),
    body('password','password must be atleast 5 characters').isLength({min:5})
],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors:errors.array()});
    }
  
    User.create({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email
    }).then(user=>res.json(user))
    .catch(err=>{console.log(err)
        req.json({error:'Please  enter a unique value for email',message:err.message})
    })
})



module.exports= router
