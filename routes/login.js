import express from 'express';

import dotenv from 'dotenv';

dotenv.config();

var JWT_SECRET = process.env.JWT_SECRET;
import {checkUser} from '../database.js';
import jsonwebtoken from 'jsonwebtoken';

var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login');
    return;
});

router.post('/', async function(req, res, next) {
    const {username, password} = req.body;
    const user = await checkUser(username, password);
    if (user) {
        var jwt_token = jsonwebtoken.sign({username : user.username, user_id : user.user_id}, JWT_SECRET);
        res.cookie('jwt_token', jwt_token);
        res.redirect('/');
    }
    else {
        res.send("Wrong username or password.");
    }
});

router.get('/logout', function(req, res, next) {
    res.clearCookie('jwt_token');
    res.render('./');
    console.log("done");
});

export default router;