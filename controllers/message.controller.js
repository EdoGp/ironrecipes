const mongoose = require('mongoose');
const Messages = require('./../models/Message');

exports.index = async (req, res, next) => {
	try {
		const data = {};
		if (
			req.query &&
			req.query.user &&
			mongoose.Types.ObjectId.isValid(req.query.user)
		) {
			data.mUser = req.query.user;
		}
		const messages = await Messages.find({ creator: req.user._id });
		data.messages = messages;
		res.render('messages', data);
	} catch (error) {
		next(error);
	}
};
exports.create = async (req, res, next) => {
	console.log(req.body);
	const message = {
		creator: req.user_id,
		receiver: req.query.reciever,
		content: [{ message: req.query.message }],
	};
	try {
		const messageDocument = new Message(message);
		messageDocument.save((err) => {
			if (err) {
				req.flash('error', 'Something went wrong saving the recipe ');
				next(err);
			} else {
				res.status(201).json({ status: 'success', data: messageDocument });
				return;
			}
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
	res.redirect('/');
};
exports.single = async (req, res, next) => {};
exports.addComment = async (req, res, next) => {};
exports.delete = async (req, res, next) => {};
