const Recipe = require('./../models/Recipe');

exports.index = async (req, res, next) => {
	try {
		const recipes = await Recipe.find({});
		res.render('recipes', { recipes });
	} catch (error) {
		next(error);
	}
};

exports.single = async (req, res, next) => {
	try {
		const recipe = await Recipe.findById(req.params.id).populate('creator');
		res.render('recipe', { recipe });
	} catch (error) {
		next(error);
		th;
	}
};
