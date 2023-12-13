import express from 'express';
import fs from 'fs';
import {getMusic, addMusic, musicExists, deleteMusic, updateMusic, checkAdmin} from '../database.js';
import {getCurrentUser } from '../users.js';
var router = express.Router();

router.get('/database', async (req, res) => {
    const music = await getMusic();
    var user = await getCurrentUser(req);
    if (user) 
    {
        var is_ad = await checkAdmin(user.username);
        if (is_ad) //If you are admin
        {
            // Admin action
            if (music.length === 0) 
            {
                res.render('addMusic');
                return;
            }
            else 
            {
                res.render('showMusic', {data: music});
                return;
            }
        }
        else // You are logged but not admin
        {   
            // User action
            res.redirect('/');
        }
    }
    else { // You are not logged
        // Not logged action
        res.redirect('/login'); 
    }
    return;
});

router.get('/add', function(req, res, next) {
    res.render('addMusic', {title: "Add Music"});
    return;
});

router.post('/add', async (req, res) => {

    const {music_name, artist_name, origin, music_type} = req.body;

    if (await musicExists(music_name, artist_name, origin, music_type)) {
        res.send("Music already exists.");
        return;
    }

    if (req.files.length === 0) {
        res.send("You need to upload a file.");
        return;
    }

    const extension = req.files.music_file.name.split('.').pop();

    if (extension != "mp4") {
        res.send("Wrong format, only mp4 accepted.");
        return;
    }

    const [[id]] = await addMusic(music_name, artist_name, origin, music_type);

    const filepath = "./public/videos/"+id.music_id+"."+extension;

    fs.writeFile(filepath, req.files.music_file.data, function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });

    res.json({ redirectTo: './database' });
    return;
});

router.get('/delete', async (req, res) => {
    const id = req.query.id;
    await deleteMusic(id);
    fs.unlink("./public/videos/"+id+".mp4", function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });
    res.redirect('./database');
    return;
});

router.post('/edit', async (req, res) => {
    const {music_id, music_name, artist_name, origin, music_type} = req.body;
    await updateMusic(music_id, music_name, artist_name, origin, music_type);
    res.redirect('./database');
    return;
});

export default router;