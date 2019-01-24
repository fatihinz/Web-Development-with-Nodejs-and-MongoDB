'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const config = require('./config/config');
const flash = require('express-flash');
const handlebarsIntl = require('handlebars-intl');
const hbs = require('hbs');
const helmet = require('helmet');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('./config/passport');
const gracefulExit = require('./lib/gracefulExit');
const _ = require('lodash');

/**
 * Controllers (route handlers)
 */
const apiController = require('./controllers/api');
const authController = require('./controllers/auth');
const eventController = require('./controllers/event');
const homeController = require('./controllers/home');
const userController = require('./controllers/user');

/**
 * Create Express server
 */
const app = express();

/**
 * Connect to MongoDB
 */
mongoose.connect(config.database);
mongoose.connection.on('error', function () {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running');
    process.exit(1);
});

/**
 * Graceful exit
 */
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

/**
 * Express configuration
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(helmet());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: config.sessionSecret,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {
        // secure: true // uncomment if using HTTPS
        httpOnly: true
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
hbs.registerPartials(__dirname + '/views/partials');
handlebarsIntl.registerWith(hbs);
app.use(function (request, response, next) {
    response.locals.user = request.user;

    next();
});

app.use(function (request, response, next) {
    response.locals.workerId = process.pid;

    next();
});
app.get('/kill', function (request, response) {
    response.send('Killing...');

    process.exit(0);
});
app.get('/russian-roulette', function (request, response) {
    const click = !!_.random(0, 1);

    if (click) {
        return response.send('Lucky you!');
    }

    response.status(500).send('BAM!!!');

    setTimeout(function () {process.exit(0);}, 1);
});
app.get('/cpu', function (request, response, next) {
    let until = new Date().getTime() + 100;

    while (new Date().getTime() < until) {
    }

    response.send('Done');
});

/**
 * Application routes
 */
app.use('/api', apiController);
app.use('/', homeController);
app.use('/', authController);
app.use('/users', userController);
app.use('/events', eventController);

/**
 * Handle 404 errors
 */
app.use(function (request, response, next) {
    const error = new Error('Not Found');
    error.status = 404;

    next(error);
});

/**
 * Development error handler
 * Prints the stack trace
 */
if ('development' === app.get('env')) {
    app.use(function (error, request, response, next) {
        response.status(error.status || 500);

        response.render('error', {
            message: error.message,
            error: error
        });
    });
}

/**
 * Production error handler
 * Doesn't print the stack tract
 */
app.use(function (error, request, response, next) {
    response.status(error.status || 500);

    response.render('error', {
        message: error.message,
        error: {}
    });
});

module.exports = app;
