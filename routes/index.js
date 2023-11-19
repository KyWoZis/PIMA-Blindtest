import express from 'express';
var router = express.Router();
import dotenv from 'dotenv';
dotenv.config();
var JWT_SECRET = process.env.JWT_SECRET;
import jsonwebtoken from 'jsonwebtoken';
/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.cookies.jwt_token) {
    var user = jsonwebtoken.verify(req.cookies.jwt_token, JWT_SECRET);
  }
  res.render('index', { title: 'my super website!!!!!', username : user ? user.username : null });
  return;
});

router.get('/game', function(req, res, next) {
  res.render('game');
  return;
});

export default router;