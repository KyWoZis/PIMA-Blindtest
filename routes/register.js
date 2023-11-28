import express from 'express';
var router = express.Router();

import {createUser} from '../database.js';
router.get('/', function(req, res, next) {
    res.render('register');
    return;
});

router.post('/', async function(req, res, next) {
    const {username, password} = req.body;
    const creation = await createUser(username, password);
    if (creation) {
        res.redirect('/login');
    }
    else {
        res.send("Error creating user.");
    }
});

export default router;