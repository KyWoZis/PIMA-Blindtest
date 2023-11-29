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
    addMusicToPlaylistID,
    removeMusicFromPlaylistID,
    getUserMusic,
    getMusicId
} from '../database.js';
import { create } from 'domain';
import e from 'express';
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

    if (songs.length === 0) {
        var music = await getUserMusic();
        music = music.map(json => ({ ...json, isIn: false }));
        res.render('addToPlaylist', {data: music, playlist_id : playlist_id, user_id : user_id});
        return;
    }

    res.render('editPlaylist', { data: songs, playlist_id : playlist_id, user_id : user_id});
    return;
});

router.get('/addToPlaylist', async (req, res) => {
    const playlist_id = req.query.playlist_id;
    const user_id = req.query.user_id;
    const songs = await getSongsFromPlaylist(user_id, playlist_id);

    console.log(songs);

    var music = await getMusic();

    console.log(music[0]);

    //music with isIn = true if the music is already in the playlist
    for (var i = 0; i < music.length; i++) {
        music[i].isIn = false;
        for (var j = 0; j < songs.length; j++) {
            if (music[i].music_id === songs[j].music_id) {
                music[i].isIn = true;
            }
        }
    }
    res.render('addToPlaylist', {data: music, playlist_id : playlist_id, user_id : user_id});

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

router.post('/updatePlaylist', async (req, res) => {
    const playlist_id = req.body.playlist_id;
    const user_id = req.body.user_id;
    if (req.body.musicsToAdd=== undefined) {
        var musicsToAdd = [];
    } else {
        if (req.body.musicsToAdd[0] === '{') {
            var musicsToAdd = [JSON.parse(req.body.musicsToAdd)];
        }
        else {
            var musicsToAdd = req.body.musicsToAdd.map(json => JSON.parse(json));
        }
    }
    if (req.body.musicsToRemove === undefined) {
        var musicsToRemove = [];
    } else {
        if (req.body.musicsToRemove[0] === '{') {
            var musicsToRemove = [JSON.parse(req.body.musicsToRemove)];
        }
        else {
            var musicsToRemove = req.body.musicsToRemove.map(json => JSON.parse(json));
        }
    }
    
    for (var i = 0; i < musicsToAdd.length; i++) {
        const id = await getMusicId(musicsToAdd[i].music_name, musicsToAdd[i].artist_name, musicsToAdd[i].origin, musicsToAdd[i].music_type);
        await addMusicToPlaylistID(user_id, playlist_id, id);
    }

    for (var i = 0; i < musicsToRemove.length; i++) {
        const id = await getMusicId(musicsToRemove[i].music_name, musicsToRemove[i].artist_name, musicsToRemove[i].origin, musicsToRemove[i].music_type);
        await removeMusicFromPlaylistID(user_id, playlist_id, id);
    }
    res.redirect('./editPlaylist?playlist_id='+playlist_id+'&user_id='+user_id);
    return;
});

//remove a music from a playlist
router.get('/removeMusicFromPlaylist', async (req, res) => {
    const playlist_id = req.query.playlist_id;
    const user_id = req.query.user_id;
    const music_id = req.query.music_id;

    console.log("playlist_id : "+playlist_id+" user_id : "+user_id+" music_id : "+music_id);

    await removeMusicFromPlaylistID(user_id, playlist_id, music_id);
    res.redirect('./editPlaylist?playlist_id='+playlist_id+'&user_id='+user_id);
    return;
});

//remove a music from a playlist with music name and artist name and origin and music type
router.get('/removeMusicFromPlaylistName', async (req, res) => {
    const playlist_id = req.query.playlist_id;
    const user_id = req.query.user_id;
    const music_name = req.query.music_name;
    const artist_name = req.query.artist_name;
    const origin = req.query.origin;
    const music_type = req.query.music_type;
    const music_id = await getMusicId(music_name, artist_name, origin, music_type);
    await removeMusicFromPlaylistID(user_id, playlist_id, music_id);
    res.redirect('./editPlaylist?playlist_id='+playlist_id+'&user_id='+user_id);
    return;
});

export default router;