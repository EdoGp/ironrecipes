require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const hbs = require('hbs');
const path = require('path');
const favicon = require('serve-favicon');

const app = express();

app.use(
	session({
		secret: 'our-passport-local-strategy-app',
		resave: true,
		saveUninitialized: true,
	}),
);
app.use(flash());
require('./../components/passport')(app);
const index = require('./../routes/index');
const authRoute = require('./../routes/api/auth');
const userRoutes = require('./../routes/user');
const recipesApiRoutes = require('./../routes/api/recipes');

const logger = require('../components/log/log.controller');

app.set('views', path.join(__dirname, './../views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, './../public')));
app.use(favicon(path.join(__dirname, './../public', 'images', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.locals.user = req.user;
	res.locals.error = req.flash('error');
	res.locals.msg = req.flash('success');
	next();
});

app.use(logger);
app.use('/', index);
app.use('/', userRoutes);
app.use('/auth', authRoute);
app.use('/api/v1/recipes', recipesApiRoutes);

app.use((req, res, next) => {
	res.status(404).json({ error: 'page not found' });
});

app.use((err, req, res, next) => {
	console.error('ERROR', req.method, req.path, err);

	if (!res.headersSent) {
		res.status(500);
		res.json({ error: err });
	}
});

module.exports = app;
