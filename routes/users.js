import express from 'express';
import {getUsers, getUserById, createUser} from '../database.js';
var router = express.Router();

/* GET users listing. */
router.get('/getAll', async (req, res) => {
  const users = await getUsers();
  res.send(users);
  return;
});

router.post('/create', async (req, res) => {
  const {username, password} = req.body;
  await createUser(username, password);
  res.send('User created');
  return;
})

export default router;