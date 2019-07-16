const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/recipes.controller');

router.get('/', recipeController.index);
router.get('/:id', recipeController.single);
// router.get('/category', recipeController.category);
// router.get('/type', recipeController.index);

module.exports = router;
