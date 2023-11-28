import express from 'express';
import {getSongsFromPlaylist, getInfoMusic} from "../database.js";
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

router.get('/game', async function (req, res, next) {
  const user_id = req.query.user_id;
  const playlist_id = req.query.playlist_id;
  const musics = await getSongsFromPlaylist(user_id, playlist_id);
  console.log(musics);
  const infoMusics = [];
  for (const music of musics) {
    infoMusics.push( (await getInfoMusic(music.music_id))[0]);
  }
  res.render('game', {musics: musics,infoMusics}); //we need to have all infos of the music before the game starts (name, artist, origin, type)

  return;
});

export default router;