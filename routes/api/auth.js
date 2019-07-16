const passport = require('passport');
const express = require('express');
const router = express.Router();

const multer = require('./../../components/multer/multer');

const authController = require('./../../controllers/auth/auth.controller');

router.get('/profile', authController.profileGet);

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/profile',
		failureRedirect: '/',
		failureFlash: true,
		passReqToCallback: true,
	}),
);
router.post('/signup', authController.signup);
router.get('/logout', authController.logout);
router.post('/profile', multer.single('image'), authController.profilePut);

router.get(
	'/google',
	passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/plus.login',
			'https://www.googleapis.com/auth/userinfo.email',
		],
	}),
);

router.get(
	'/google/success',
	passport.authenticate('google', {
		failureRedirect: '/',
		successRedirect: '/auth/private-page',
	}),
);

router.get('/facebook/login', passport.authenticate('facebook'));

router.get(
	'/facebook/success',
	passport.authenticate('facebook', {
		successRedirect: '/',
		failureRedirect: '/login',
	}),
);

module.exports = router;
