// Imports
import express from "express";
import path from "path";
import favicon from "serve-favicon";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

// Database
let mongo = require('mongodb');
let monk = require('monk');
let db = monk('localhost:27017/MonsterPlayer');

// Routes
import index from "./app/routes/index.es6";
import user from "./app/routes/user.es6";
import media from "./app/routes/media.es6";
import playlist from "./app/routes/playlist.es6";
import invite from "./app/routes/user/invite.es6";
import notification from "./app/routes/user/notification.es6";
import search from "./app/routes/search.es6";

// Locale Configuration
import LocaleManager from "./app/classes/localeManager.es6";

// Setup LocaleManager as Global Variable
process.localeManager = new LocaleManager('pl_PL');
process.localeManager.load();

// Setup database as GlobalVariable
process.db = db;

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/user/notification', notification);
app.use('/user/invite', invite);
app.use('/user', user);
app.use('/media', media);
app.use('/playlist', playlist);
app.use('/search', search);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

export default app;
