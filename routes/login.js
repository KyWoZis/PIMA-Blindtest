import express from 'express';

import dotenv from 'dotenv';

dotenv.config();

var JWT_SECRET = process.env.JWT_SECRET;
import {checkUser} from '../database.js';
import {login, logout} from '../users.js';
import jsonwebtoken from 'jsonwebtoken';

var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login');
    return;
});

router.post('/', async function(req, res, next) {
    const {username, password} = req.body;
    login(username, password, res);
});

router.get('/logout', function(req, res, next) {
    logout(res);
});

export default router;