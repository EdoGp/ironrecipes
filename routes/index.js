const express = require('express');
const router = express.Router();

const Recipe = require('./../models/Recipe');

router.get('/', async (req, res, next) => {
	let appetizers = await Recipe.find({ type: 'Appetizer' });
	let entrees = await Recipe.find({ type: 'Entree' });
	let soupsAndSalads = await Recipe.find({
		$or: [{ type: 'Soup' }, { type: 'Salad' }],
	});
	appetizers = await appetizers.map((appetizer) => {
		return {
			images: appetizer.images,
			owner: appetizer.owner,
			type: appetizer.type,
			cousine: appetizer.cousine,
			_id: appetizer._id,
			name: appetizer.name,
			ingredientsList: appetizer.ingredients.split('\r\n'),
		};
	});
	entrees = await entrees.map((entree) => {
		return {
			type: entree.type,
			cousine: entree.cousine,
			images: entree.images,
			owner: entree.owner,
			_id: entree._id,
			name: entree.name,
			ingredientsList: entree.ingredients.split('\r\n'),
		};
	});
	soupsAndSalads = await soupsAndSalads.map((salad) => {
		return {
			type: salad.type,
			cousine: salad.cousine,
			images: salad.images,
			owner: salad.owner,
			_id: salad._id,
			name: salad.name,
			ingredientsList: salad.ingredients.split('\r\n'),
		};
	});
	res.render('index', {
		appetizers,
		entrees,
		soupsAndSalads,
	});
});

module.exports = router;
