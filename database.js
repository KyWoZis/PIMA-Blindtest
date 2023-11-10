//Import 
import mysql from 'mysql2';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { table } from 'console';
dotenv.config();

// create a connection to the database
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

// connect to the database
connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

//functions 
export async function getUsers() {
    const [rows] = await connection.query("SELECT * FROM users");
    return rows;
}

export async function getUserById(id) {
    const [rows] = await connection.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
}

export async function createUser(username, password) {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    await connection.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash]);
}

export async function getMusic() {
    const [rows] = await connection.query("SELECT * FROM music");
    return rows;
}

export async function addMusic(music_name, artist_name, origin, music_type) {
    await connection.query("INSERT INTO music (music_name, artist_name, origin, music_type) VALUES (?, ?, ?, ?)", [music_name, artist_name, origin, music_type]);
    return await connection.query("SELECT music_id FROM music WHERE music_name = ? AND artist_name = ? AND origin = ? AND music_type = ?", [music_name, artist_name, origin, music_type]);
}

export async function musicExists(music_name, artist_name, origin, music_type) {
    const [rows] = await connection.query("SELECT * FROM music WHERE music_name = ? AND artist_name = ? AND origin = ? AND music_type = ?", [music_name, artist_name, origin, music_type]);
    return rows.length > 0;
}

export async function deleteMusic(music_id) {
    await connection.query("DELETE FROM music WHERE music_id = ?", [music_id]);
}

//Playlist


// Add a music to the playlist of a given user. If the user doesn't have a playlist, create one.
export async function addMusicToPlaylist(music_id, user_id, playlistName) {
    try {
        const escapedPlaylistName = connection.escape(playlistName); // Escape the playlistName to avoid SQL injection
        const tableName = `playlist_${user_id}_${escapedPlaylistName}`; // Get the table name

        await connection.query(`INSERT INTO ? (music_id) VALUES (?)`, [tableName,music_id]); // Add the music to the playlist
        console.log('The music has been added to the playlist successfully.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Remove a music from the playlist of a given user
export async function removeMusicFromPlaylist(music_id, user_id, playlistName) {
    try {
        const escapedPlaylistName = connection.escape(playlistName); // Escape the playlistName to avoid SQL injection
        const tableName = `playlist_${user_id}_${escapedPlaylistName}`; // Get the table name

        await connection.query(`DELETE FROM ${tableName} WHERE music_id = ?`, [music_id]); // Remove the music from the playlist
        console.log('The music has been removed from the playlist successfully.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Create a playlist for a given user
export async function createPlaylist(user_id, playlistName) {
    try {
        const escapedPlaylistName = connection.escape(playlistName); // Escape the playlistName to avoid SQL injection
        const tableName = `playlist_${user_id}_${playlistName}`; // Get the table name

        await connection.query(`CREATE TABLE ${tableName} (music_id int NOT NULL, order_to_play int NOT NULL, FOREIGN KEY (music_id) REFERENCES music(music_id))`); // Create the playlist
        console.log('The playlist has been created successfully.');
        await connection.query(`INSERT INTO playlist_list (user_id, playlist_name) VALUES (?, ?)`, [user_id, playlistName]);
        console.log('The playlist has been added to the playlists table successfully.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}


// Remove a playlist
export async function removePlaylist(user_id,playlistName) {
    try {
        await connection.query(`DROP TABLE playlist_${user_id}_${playlistName}`); // Remove the playlist
        console.log('The playlist has been removed successfully.');
        await connection.query(`DELETE FROM playlist_list WHERE playlist_name = ?`, [playlistName]);
        console.log('The playlist has been removed from the playlists table successfully.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Get the playlists of a given user
export async function getPlaylists(user_id) {
    try {
        const [rows] = await connection.query(`SELECT * FROM playlist_list WHERE user_id = ?`, [user_id]);
        return rows;
    } catch (error) {
        console.error('An error occurred:', error);
    }
}


// Get every playlist
export async function getAllPlaylists() {
    try {
        const [rows] = await connection.query(`SELECT * FROM playlist_list`);
        return rows;
    }
    catch (error) {
        console.error('An error occurred:', error);
    }   
}


// Get the songs of a given playlist
export async function getSongsFromPlaylist(user_id, playlistName) {
    try {
        const escapedPlaylistName = connection.escape(playlistName); // Escape the playlistName to avoid SQL injection
        const tableName = `playlist_${user_id}_${escapedPlaylistName}`; // Get the table name

        const [rows] = await connection.query(`SELECT * FROM ?`, [tableName]);
        return rows;
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Check if a playlist already exists for a given user
export async function playlistExists(user_id, playlistName) {
    try {
        const escapedPlaylistName = connection.escape(playlistName); // Escape the playlistName to avoid SQL injection
        const tableName = `playlist_${user_id}_${playlistName}`; // Get the table name

        const [rows] = await connection.query("SELECT * FROM playlist_list WHERE user_id = ? AND playlist_name = ?", [user_id, playlistName]);
        return rows.length > 0;
    }
    catch (error) {
        console.error('An error occurred:', error);
    }
}