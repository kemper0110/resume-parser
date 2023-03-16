var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var resumesRouter = require('./routes/resumes');
var parserRouter = require('./routes/parser');
var pool = require('./db/pg');
var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend/build')))
pool.connect(function (err, client, done) {
    if (err) throw new Error(err);
    console.log('Connected to postgresql server');
})

app.use('/resumes', resumesRouter);
app.use('/parser', parserRouter);

app.get('*', (req, res) => {
    res.sendFile(
        path.join(__dirname, 'frontend/build/index.html')
    );
})

module.exports = app;
