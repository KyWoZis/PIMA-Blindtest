//Import 
import mysql from 'mysql2';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
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