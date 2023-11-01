import express from 'express';
import {getUsers, getUserById, createUser} from './database.js';

const app = express();

https
  .createServer(app)
  .listen(3000, ()=>{
    console.log('server is runing at port 3000')
  });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

app.get('/users', async (req, res) => {
    const users = await getUsers();
    res.send(users);
})