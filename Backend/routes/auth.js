const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');

const JWT_SECRET = 'sadhanaisgoodgi$rl'
//Route 1:  Create a User using POST "/api/auth/createuser". No Login Required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'email').isEmail(),
    body('password', 'password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success=false;
    //If there is error : return thr Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    //check whether the user with same email already exist
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success=true;
            return res.status(400).json({ success, error: "sorry a user with this email already exist" })
        }
        const salt = await bcrypt.genSalt(10);  // salt generated

        const secPass = await bcrypt.hash(req.body.password, salt);
        //Create a new user 
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success, authToken })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error");
    }
})



//Route 2:   Authenticate a User using POST "/api/auth/login". No Login Required

router.post('/login', [
    //if email wro n g or tge apssword is kept blank 
    //then the below error will be shown to them
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
     let success=false;
    //If there is error : return thr Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            success=false;
            return res.status(400).json({ success,error: "please try to login with correct credentials" });
        }
        // we just pass the password emtered by the user and tge password stored in the database 
        //this fun internally comare the hash.. no need to bother
        //it return true(if matched) else false
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success=false;
            return res.status(400).json({ success,error: "please try to login with correct credentials" }); }

        const data = {
            user: {
                id: user.id
            }
        }//it creates an authentication token to be sent to the valid user
        const authToken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success,authToken});
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error");
    }
})

//Route 3:  Get loggedin user details using POST "/api/auth/getuser".Login Required(i.e. JWT token hme bhejna prega)
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router
