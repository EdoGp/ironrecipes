const Recipe = require('./../models/Recipe');

exports.index = async (req, res, next) => {
	try {
		const recipes = await Recipe.find({});
		if (req.user) {
			recipes.forEach((recipe) => {
				if (recipe.creator.toString() == req.user._id.toString()) {
					recipe.owner = true;
				}
			});
		}
		res.render('recipes', { recipes });
	} catch (error) {
		next(error);
	}
};

exports.single = async (req, res, next) => {
	try {
		const recipe = await Recipe.findById(req.params.id).populate('creator');
		if (req.user && recipe.creator._id.toString() === req.user._id.toString()) {
			recipe.creator.owner = true;
		}
		res.render('recipe', { recipe });
	} catch (error) {
		next(error);
	}
};
