import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  return;
});

router.get('/game', function(req, res, next) {
  res.render('game');
  return;
});

export default router;