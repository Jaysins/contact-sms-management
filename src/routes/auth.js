const express = require('express');
const router = express.Router();
const userService = require('../services/user');
const jwt = require('jsonwebtoken');
const {BadRequestError} = require("../errors");
const {StatusCodes} = require("http-status-codes");

// Register a new user
router.post('/register', async (req, res) => {
    const { name, password } = req.body;
    let email = req.body.email;
    if (!email || !name || !password){
        throw new BadRequestError('Please provide name, email and password')
    }

    email = email.toLocaleLowerCase();

    const existingUser = await userService.getUserByEmail(email);

    if (existingUser) {
        throw new BadRequestError('User already exists')
    }

    const user = await userService.createUser(name, email, password);

    res.status(StatusCodes.OK).json({name: user.name, email: user.email, token: user.token})
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password){
        throw new BadRequestError('Please provide email and password')
    }
    const user = await userService.loginUser(email, password)

    if (!user){
        throw new BadRequestError('Invalid credentials provided')
    }

    res.status(StatusCodes.OK).json({name: user.name, email: user.email, token: user.token})
});

module.exports = router;
