const Recipe = require('./../models/Recipe');

exports.index = async (req, res, next) => {
	try {
		let recipes = await Recipe.find({});
		if (req.user) {
			recipes.forEach((recipe) => {
				if (recipe.creator.toString() == req.user._id.toString()) {
					recipe.owner = true;
				}
			});
		}
		recipes = await recipes.map((recipe) => {
			return {
				images: recipe.images,
				owner: recipe.owner,
				_id: recipe._id,
				name: recipe.name,
				ingredientsList: recipe.ingredients.split('\r\n'),
			};
		});
		res.render('recipes', { recipes });
	} catch (error) {
		next(error);
	}
};

exports.single = async (req, res, next) => {
	try {
		let recipe = await Recipe.findById(req.params.id).populate('creator');
		if (req.user && recipe.creator._id.toString() === req.user._id.toString()) {
			recipe.creator.owner = true;
		}
		recipe = {
			type: recipe.type,
			cuisine: recipe.cuisine,
			creator: recipe.creator,
			images: recipe.images,
			owner: recipe.owner,
			_id: recipe._id,
			name: recipe.name,
			ingredients: recipe.ingredients,
			ingredientsList: recipe.ingredients.split('\r\n'),
			preparation: recipe.preparation,
			steps: recipe.preparation.split('\r\n'),
		};
		res.render('recipe', { recipe });
	} catch (error) {
		next(error);
	}
};
