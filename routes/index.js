import express from 'express';
import {getSongsFromPlaylist, getInfoMusic} from "../database.js";
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
  const infoMusics = [];
  for (const music of musics) {
    infoMusics.push( (await getInfoMusic(music.music_id))[0]);
  }
  res.render('game', {musics: musics,infoMusics}); //we need to have all infos of the music before the game starts (name, artist, origin, type)

  return;
});

export default router;