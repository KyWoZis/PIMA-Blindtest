import express from 'express';
import {getSongsFromPlaylist, getInfoMusic, checkAdmin, getAllPlaylists} from "../database.js";
var router = express.Router();
import dotenv from 'dotenv';
dotenv.config();
var JWT_SECRET = process.env.JWT_SECRET;
import jsonwebtoken from 'jsonwebtoken';
/* GET home page. */
router.get('/', async function (req, res, next) {
  if (req.cookies.jwt_token) {
    var user = jsonwebtoken.verify(req.cookies.jwt_token, JWT_SECRET);
    var is_ad = await checkAdmin(user.username);
  }
  res.render('profile', {title: 'BlindTest Project', is_ad: is_ad, username: user ? user.username : null, nombrePJ: 10, nombrePG: 5, nombrePP: 2, AvgScore: 75});
  return;
});


export default router;