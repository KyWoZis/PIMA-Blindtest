import express from 'express';

import dotenv from 'dotenv';

dotenv.config();

var JWT_SECRET = process.env.JWT_SECRET;
import {checkAdmin, checkUser} from '../database.js';
import jsonwebtoken from 'jsonwebtoken';

var router = express.Router();

router.get('/', async function (req, res, next) {
  if (req.cookies.jwt_token) {
    var user = jsonwebtoken.verify(req.cookies.jwt_token, JWT_SECRET);
    console.log(user);
     if(await checkAdmin(user.username)) {
       res.render('admin', {title: 'my super website!!!!!', username: user ? user.username : null, is_ad: true});
     }
     else {
       res.redirect('/');
     }
      return;
  }
  else {
    res.redirect('/login');
  }
  return;
});


export default router;