import express from 'express';
import {checkAdmin} from '../database.js';
import {getCurrentUser} from '../users.js';

var router = express.Router();

router.get('/', async function (req, res, next) {
  var user = await getCurrentUser(req);
  if (user) {
    var is_ad = await checkAdmin(user.username);
  
    if (is_ad) {
      res.render('admin', {title: 'Admin page', username: user ? user.username : null, is_ad: true});
    }
    else {
      res.redirect('/');
    }
  }
  else {
    res.redirect('/login');
  }
  return;
});


export default router;