import express from 'express';
import multer from 'multer';
import fs from 'fs';
import {addMusicToPlaylist, removeMusicFromPlaylist, createPlaylist, removePlaylist, getPlaylists, getAllPlaylists, getSongsFromPlaylist, playlistExists} from '../database.js';
import { create } from 'domain';
var router = express.Router();

router.get('/database', async (req, res) => {
    const allPlaylists = await getAllPlaylists();
    if (allPlaylists.length === 0) {
        res.render('createPlaylist');
    }
    res.render('showPlaylist', {data: allPlaylists});
});

router.get('/add', function(req, res, next) {
    res.render('createPlaylist', {title: "Add a playlist"});
});

router.post('/add', multer().any() ,async (req, res) => {
    const {user_id, playlistName} = req.body;

    if (await playlistExists(user_id, playlistName)) {
        res.send("Playlist already exists.");
        return;
    }
    else {
        await createPlaylist(user_id, playlistName);
    }

    res.redirect('./database');
});

router.get('/delete', async (req, res) => {
    const user_id = req.query.user_id;
    const playlist_id = req.query.playlist_id;
    await removePlaylist(user_id,playlist_id);
    res.redirect('./database');
});

export default router;