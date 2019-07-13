const express = require('express');
const router = express.Router();

const userController = require('./../controllers/user.controller');
const loggedin = require('./../middlewares/auth/loggedin');

// router.get('/login');
router.get('/profile', loggedin.isUserLogged, userController.profile);

module.exports = router;
