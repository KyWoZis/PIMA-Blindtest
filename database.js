//Import 
import mysql from 'mysql2';
import dotenv from 'dotenv';
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
async function getUser() {
    const [rows] = await connection.query("SELECT * FROM test");
    return rows;
}
const result = await getUser();
const rows = result[0];
console.log(rows);

// close the connection
connection.end();
