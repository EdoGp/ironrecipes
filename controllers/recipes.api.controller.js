const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

exports.index = async (req, res, next) => {
	try {
		const documents = await Recipe.find();
		res.status(200).json(documents);
	} catch (error) {
		console.log(error);
		next(error);
	}
};

exports.create = (req, res, next) => {
	const { name, description, type } = req.body;
	const file = req.file.url;
	if (name !== '' || description !== '' || type !== '')
		try {
			const recipe = new Recipe({
				name,
				creator: req.user._id,
				description,
				type,
				images: file,
			});
			recipe.save((err) => {
				if (err) {
					req.flash('error', 'Something went wrong saving the recipe ');
					next(err);
				} else {
					res.redirect('/recipes');
					// res.status(201).json({ status: 'success', data: recipe });
				}
			});
		} catch (error) {
			next(error);
		}
	else {
		res.status(400).json({
			status: 'failed',
			mesage: 'Name, creator, description and type fields should be filled',
		});
	}
};

exports.getType = async (req, res, next) => {
	if (['Entree', 'Appetizer', 'Soup', 'Salad'].includes(req.params.type)) {
		try {
			const documents = await Recipe.find({ type: req.params.type });
			res.status(200).json(documents);
		} catch (error) {
			console.log(error);
			next(error);
		}
	} else {
		res.status(401).json({ status: 'failed', message: 'Invalid recipe type' });
	}
};

exports.getCreator = async (req, res, next) => {
	if (mongoose.Types.ObjectId.isValid(req.params.id)) {
		try {
			const documents = await Recipe.find({ creator: req.params.id });
			res.status(200).json(documents);
		} catch (error) {
			console.log(error);
			next(error);
		}
	} else {
		res
			.status(401)
			.json({ status: 'failed', message: 'Invalid id of creator' });
	}
};

exports.single = async (req, res, next) => {
	if (mongoose.Types.ObjectId.isValid(req.params.id)) {
		try {
			const documents = await Recipe.findById(req.params.id);
			res.status(200).json(documents);
		} catch (error) {
			console.log(error);
			next(error);
		}
	} else {
		res.status(401).json({ status: 'failed', message: 'Invalid object id' });
	}
};

exports.update = async (req, res, next) => {
	if (mongoose.Types.ObjectId.isValid(req.params.id)) {
		try {
			const documents = await Recipe.findByIdAndUpdate(req.params.id, req.body);
			res.redirect(`/recipes/${req.params.id}`);
			console.log('something is getting changed');
			// res.status(200).json(documents);
		} catch (error) {
			console.log(error);
			next(error);
		}
	} else {
		res.status(401).json({ status: 'failed', message: 'Invalid object id' });
	}
};

exports.delete = async (req, res, next) => {
	if (mongoose.Types.ObjectId.isValid(req.params.id)) {
		try {
			const documents = await Recipe.findByIdAndDelete(req.params.id);
			res.status(200).json(documents);
		} catch (error) {
			console.log(error);
			next(error);
		}
	} else {
		res.status(401).json({ status: 'failed', message: 'Invalid object id' });
	}
};
