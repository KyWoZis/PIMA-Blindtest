import express from 'express';
import {getSongsFromPlaylist, getInfoMusic, checkAdmin, getAllPlaylists, getUserById} from "../database.js";
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
  //use getUserById to get user info
  var user_data = await getUserById(user.user_id);

  res.render('profile', {title: 'BlindTest Project', is_ad: is_ad, username: user ? user.username : null, nombrePJ: user_data.nb_games, nombrePG: user_data.nb_win, nombrePP: user_data.nb_loss, AvgScore: user_data.avg_score});
  return;
});


export default router;