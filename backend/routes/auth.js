const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//Create a user using: POST "/api/auth". Doesn't require Auth
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({min: 5}),
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
            return res.status(400).json({error: "Sorry a user with this email is already exist"});
        }
        // Create a new user
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
        })
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occured");
    }
})

module.exports = router