const express = require('express');
const router = express.Router();

const recipesController = require('../../controllers/recipes.api.controller');
const loggedin = require('./../../middlewares/auth/loggedin');

router.get('/', recipesController.index);
router.post('/', loggedin.isUserLogged, recipesController.create);
router.get('/type/:type', recipesController.getType);
router.get('/creator/:id', recipesController.getCreator);
router.get('/:id', recipesController.single);
router.post('/:id/update', loggedin.isUserLogged, recipesController.update);
router.post('/:id/delete', loggedin.isUserLogged, recipesController.delete);

module.exports = router;
