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
async function getUsers() {
    const [rows] = await connection.query("SELECT * FROM users");
    return rows;
}

async function getUserById(id) {
    const [rows] = await connection.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
}

async function createUser(username, password) {
    const saltRounds = 10;
    bcrypt.hash(password, 10, function(err, hash) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        connection.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash]);
    });
}

createUser('testuser', 'testpassword')

//const rows = await getUsers();
//console.log(rows);

// close the connection
connection.end();
