const router = require('express').Router();
const User = require('../models/users.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT;

//TODO Sign Up / Create Account - Post
router.post('/signup', async (req, res) => {

});

//TODO Login - Post
router.post('/login', async (req, res) => {

});


module.exports = router;