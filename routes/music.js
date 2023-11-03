import express from 'express';
import multer from 'multer';
import fs from 'fs';
import {getMusic, addMusic, musicExists} from '../database.js';
var router = express.Router();

router.get('/getAll', async (req, res) => {
    const music = await getMusic();
    res.render('showMusic', {data: music});
});

router.get('/add', function(req, res, next) {
    res.render('addMusic');
});

router.post('/add', multer().any() ,async (req, res) => {
    const {music_name, artist_name, origin, music_type} = req.body;

    if (await musicExists(music_name, artist_name, origin, music_type)) {
        window.alert("Music already exists");
        return;
    }

    const [[id]] = await addMusic(music_name, artist_name, origin, music_type);

    const extension = req.files[0].originalname.split('.').pop();

    const filepath = "./public/videos/"+id.music_id+"."+extension;

    fs.writeFile(filepath, req.files[0].buffer, function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });

    res.redirect('./add');
});

export default router;