const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message.controller');
const loggedin = require('./../middlewares/auth/loggedin');
router.get('/', loggedin.isUserLogged, messageController.index);
router.post('/', loggedin.isUserLogged, messageController.create);
router.get('/:id', loggedin.isUserLogged, messageController.single);
router.post('/:id', loggedin.isUserLogged, messageController.addComment);
router.post('/:id/delete', loggedin.isUserLogged, messageController.delete);

module.exports = router;
