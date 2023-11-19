import express from 'express';
var router = express.Router();
import dotenv from 'dotenv';
var JWT_SECRET = process.env.JWT_SECRET;
import {checkUser} from '../database.js';
var jwt = require('jsonwebtoken');

router.get('/login', function(req, res, next) {
    res.render('login');
    return;
});

router.post('/login', async function(req, res, next) {
    const {username, password} = req.body;
    const user = await checkUser(username, password);
    if (user) {
        var jwt_token = jwt.sign({username : user.username, user_id : user.user_id}, JWT_SECRET);
        res.cookie('jwt_token', jwt_token);
        res.redirect('/');
    }
    else {
        res.send("Wrong username or password.");
    }
});