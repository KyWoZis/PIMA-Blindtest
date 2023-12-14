import express from 'express';
import {getUsers, getUserById, createUser, deleteUser, addGamePlayed, addWin, updateAvgScore} from '../database.js';
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

router.post('/delete', async (req, res) => {
  const username = req.query.username;
  await deleteUser(username);
  res.redirect('/login/logout')
  return;
})

router.get('/addGamePlayed', async (req, res) => {
  const user_id = req.query.user_id;
  await addGamePlayed(user_id);
  return;
})

router.get('/addWin', async (req, res) => {
  const user_id = req.query.user_id;
  await addWin(user_id);
  return;
})

router.get('/updateAvgScore', async (req, res) => {
  const user_id = req.query.user_id;
  const score = req.query.score;
  await updateAvgScore(user_id, score);
  return;
})

export default router;