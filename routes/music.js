import express from 'express';
import multer from 'multer';
import fs from 'fs';
import {getMusic, addMusic, musicExists, deleteMusic} from '../database.js';
var router = express.Router();

router.get('/database', async (req, res) => {
    const music = await getMusic();
    res.render('showMusic', {data: music});
});

router.get('/add', function(req, res, next) {
    res.render('addMusic', {title: "Add Music"});
});

router.post('/add', multer().any() ,async (req, res) => {
    const {music_name, artist_name, origin, music_type} = req.body;

    if (await musicExists(music_name, artist_name, origin, music_type)) {
        res.send("Music already exists.");
        return;
    }

    if (req.files.length === 0) {
        res.send("You need to upload a file.");
        return;
    }

    const extension = req.files[0].originalname.split('.').pop();

    console.log(extension);

    if (extension != "mp4") {
        res.send("Wrong format, only mp4 accepted.");
        return;
    }

    const [[id]] = await addMusic(music_name, artist_name, origin, music_type);

    const filepath = "./public/videos/"+id.music_id+"."+extension;

    fs.writeFile(filepath, req.files[0].buffer, function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });

    res.redirect('./database');
});

router.get('/delete', async (req, res) => {
    const id = req.query.id;
    await deleteMusic(id);
    fs.unlink("./public/videos/"+id+".mp4", function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });
    res.redirect('./database');
});

export default router;