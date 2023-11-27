import express from 'express';
import {
    addMusicToPlaylist,
    removeMusicFromPlaylist,
    getMusic,
    createPlaylist,
    removePlaylist,
    getPlaylists,
    getAllPlaylists,
    getSongsFromPlaylist,
    playlistExists,
    addMusicToPlaylistID, removeMusicFromPlaylistID
} from '../database.js';
import { create } from 'domain';
var router = express.Router();


//Show the database
router.get('/database', async (req, res) => {
    const allPlaylists = await getAllPlaylists();
    if (allPlaylists.length === 0) {
        res.render('createPlaylist');
        return;
    }
    res.render('showPlaylist', {data: allPlaylists});
    return;
});

//page to add a playlist
router.get('/add', function(req, res, next) {
    res.render('createPlaylist', {title: "Add a playlist"});
    return;
});

//add a playlist
router.post('/add', async (req, res) => {
    const {user_id, playlistName} = req.body;

    if (await playlistExists(user_id, playlistName)) {
        res.send("Playlist already exists.");
        return;
    }
    else {
        await createPlaylist(user_id, playlistName);
    }

    res.redirect('./database');
    return;
});

//delete a playlist
router.get('/delete', async (req, res) => {
    const user_id = req.query.user_id;
    const playlist_id = req.query.playlist_id;
    await removePlaylist(user_id,playlist_id);
    res.redirect('./database');
    return;
});

//edit a given playlist
router.get('/editPlaylist', async (req, res) => {
    const playlist_id = req.query.playlist_id;
    const user_id = req.query.user_id;
    const songs = await getSongsFromPlaylist(user_id, playlist_id);
    const allMusic = await getMusic();
    if (allMusic.length === 0) {
        res.render('addMusic');
        return;
    }
    // Tri des musiques en fonction de la checkbox
    const sortedMusic = allMusic.sort((a, b) => {
        // Mettre les musiques cochées en premier
        const aChecked = songs.some(song => song.music_id === a.music_id);
        const bChecked = songs.some(song => song.music_id === b.music_id);// res.render('editPlaylist' , {data: allMusic, playlist_id : playlist_id});

        if (aChecked && !bChecked) {
            return -1;
        } else if (!aChecked && bChecked) {
            return 1;
        } else {
            return 0;
        }
    });
    console.log("nos");
    // res.render('editPlaylist' , {data: allMusic, playlist_id : playlist_id, user_id : user_id});
    res.render('editPlaylist', { data: sortedMusic, playlist_id : playlist_id, user_id : user_id});
    return;
});

//add a music to a playlist
router.get('/addMusicToPlaylist', async (req, res) => {
    const playlist_id = req.query.playlist_id;
    const user_id = req.query.user_id;
    const music_id = req.query.music_id;
    await addMusicToPlaylistID(user_id, playlist_id, music_id);
    res.redirect('./editPlaylist?playlist_id='+playlist_id+'&user_id='+user_id);
    return;
});

//remove a music from a playlist
router.get('/removeMusicFromPlaylist', async (req, res) => {
    const playlist_id = req.query.playlist_id;
    const user_id = req.query.user_id;
    const music_id = req.query.music_id;
    await removeMusicFromPlaylistID(user_id, playlist_id, music_id);
    res.redirect('./editPlaylist?playlist_id='+playlist_id+'&user_id='+user_id);
    return;
});

export default router;