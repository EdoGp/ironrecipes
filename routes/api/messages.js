const express = require('express');
const router = express.Router();

const messagesController = require('../../controllers/messages.api.controller');
const loggedin = require('./../../middlewares/auth/loggedin');

router.get('/', loggedin.isUserLogged, messagesController.index);

router.post('/', loggedin.isUserLogged, messagesController.create);

router.get('/:id', loggedin.isUserLogged, messagesController.index);

router.post('/:id/reply', loggedin.isUserLogged, messagesController.reply);

module.exports = router;
