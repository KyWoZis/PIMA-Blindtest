import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
const __dirname = path.resolve();

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import musicRouter from './routes/music.js';
import playlistRouter from './routes/playlist.js';
import loginRouter from './routes/login.js';
import registerRouter from './routes/register.js';

var app = express();
dotenv.config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json({ limit: '100MB' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/music', musicRouter);
app.use('/playlist', playlistRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
