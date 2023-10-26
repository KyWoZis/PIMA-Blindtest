// const mysql = require('mysql2');
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();
// create a connection to the database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}).promise();

// connect to the database
connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});


async function getUser() {
    const [rows] = await connection.execute('SELECT * FROM test');
    return rows;
}
const result = getUser();
const rows = result[0];
console.log(rows);
// close the connection
connection.end();
