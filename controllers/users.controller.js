const router = require('express').Router();
const User = require('../models/users.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT;

const errorResponse = (res, error) => {
    return (
        res.status(500).json({
            error: error.message
        })
    )
}

//TODO Sign Up / Create Account - Post
router.post('/signup', async (req, res) => {
    try {

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 13)
        });

        const newUser = await user.save();

        const token = jwt.sign({id: newUser._id}, SECRET, {expiresIn: "1 day"});

        res.status(200).json({
            user: newUser,
            message: 'User Created',
            token
        })

    } catch (err) {
        console.log('Why is this broken');
        errorResponse(res, err);
    }
});

//TODO Login - Post
router.post('/login', async (req,res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({email: email});
        
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!user || !passwordMatch) throw new Error('Email or Password does not match');

        const token = jwt.sign({id: user._id}, SECRET, {expiresIn: "1 day"});

        res.status(200).json({
            message: `Success!`,
            user, 
            token
        })

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})


module.exports = router;