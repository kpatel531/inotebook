const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "kaushalisgoodb$oy";

// ROUTE-1: Create a user using: POST "/api/auth/createuser"
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min: 5}),
], async (req, res) => {
    // If there are bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        // Check user mail exist or not
        let user = await User.findOne({email: req.body.email});
        if(user) {
            success = false;
            return res.status(400).json({success, error: "Sorry a user with this email is already exist"});
        }

        // Create a new user
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });

        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken});

    } catch (error) {
        console.log(error.message);
        success = false;
        res.status(500).send(success, "Some error occured");
    }
})

// ROUTE-2: Authenticate a user using: POST "/api/auth/login"
router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    // If there are bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({success, errors: errors.array()});
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({success, error: "Please try to login with correct credentials"});
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken});


    } catch (error) {
        console.log(error.message);
        success = false;
        res.status(500).send(success, "Internal Server Error");
    }
})

// ROUTE-3: Get loggedin user information using: POST "/api/auth/getuser": Login required
router.post('/getuser', fetchuser, async (req, res) => {
    // If there are bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        success = true;
        res.send({success, user});
    } catch (error) {
        success = false;
        console.log(error.message);
        res.status(500).send(success, "Internal Server Error");
    }
})


module.exports = router