import express from 'express';
import {getSongsFromPlaylist} from "../database.js";
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BlindTest Project' });
  return;
});

router.get('/game', async function (req, res, next) {
  const user_id = req.query.user_id;
  const playlist_id = req.query.playlist_id;
  const musics = await getSongsFromPlaylist(user_id, playlist_id);
  console.log(musics);
  res.render('game', {musics: musics});
  return;
});

export default router;