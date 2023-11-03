import express from 'express';
import multer from 'multer';
import fs from 'fs';
import {getMusic, addMusic, musicExists} from '../database.js';
var router = express.Router();

router.get('/getAll', async (req, res) => {
    const music = await getMusic();
    res.send(music);
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/videos');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage })

router.get('/add', function(req, res, next) {
    res.render('addMusic');
});

router.post('/add', upload.single('music_file'), async (req, res) => {
    const {music_name, artist_name, origin, music_type} = req.body;

    if (await musicExists(music_name, artist_name, origin, music_type)) {
        res.status(409).send('Music already exists');
        return;
    }

    const [[id]] = await addMusic(music_name, artist_name, origin, music_type);

    const extension = req.file.filename.split('.').pop();

    fs.rename("./public/videos/"+req.file.filename, "./public/videos/"+id.music_id+"."+extension, function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });

    res.redirect('./add');
});

export default router;