import express from 'express';
import {getSongsFromPlaylist, getInfoMusic, checkAdmin, getAllPlaylists} from "../database.js";
import {getCurrentUser} from "../users.js";
var router = express.Router();
/* GET home page. */
router.get('/', async function (req, res, next) {
  var user = await getCurrentUser(req);
  console.log(user);
  if (user) {
    var is_ad = await checkAdmin(user.username);
  }
  res.render('index', {title: 'BlindTest Project', is_ad: is_ad, username: user ? user.username : null});
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

router.get('/selectPlaylist', async function (req, res, next) {
  const allPlaylists = await getAllPlaylists();
    if (allPlaylists.length === 0) {
        res.render('createPlaylist');
        return;
    }
    res.render('selectPlaylist', {data: allPlaylists});
    return;
});

export default router;