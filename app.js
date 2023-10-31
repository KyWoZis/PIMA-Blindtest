import express from 'express';
import {getUsers, getUserById, createUser} from './database.js';

const app = express();

app.get('/users', async (req, res) => {
    const users = await getUsers();
    res.send(users);
})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
})