const mongoose = require('mongoose');
const Message = require('./../models/Message');

exports.index = async (req, res, next) => {
	try {
		const data = {};
		if (
			req.query &&
			req.query.user &&
			mongoose.Types.ObjectId.isValid(req.query.user)
		) {
			data.rUser = req.query.user;
		}
		const messages = await Message.find({
			$or: [
				{ creator: mongoose.Types.ObjectId(req.user._id) },
				{ receiver: mongoose.Types.ObjectId(req.user._id) },
			],
		});
		messages.forEach((message) => {
			if (message.creator.toString() === req.user._id.toString()) {
				message.owned = true;
			}
		});
		data.messages = messages;
		res.render('messages', data);
	} catch (error) {
		next(error);
	}
};

exports.create = async (req, res, next) => {
	const message = {
		creator: req.user._id,
		receiver: req.body.reciever,
		content: [{ message: req.body.message }],
	};
	try {
		const messageDocument = new Message(message);
		messageDocument.save((err) => {
			if (err) {
				req.flash('error', 'Something went wrong saving the recipe ');
				next(err);
			} else {
				res.redirect('/');
				// res.status(201).json({ status: 'success', data: messageDocument });
				return;
			}
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
};

exports.single = async (req, res, next) => {
	const data = {};
	const message = await Message.findById(req.params.id)
		.populate('creator')
		.populate('receiver')
		.populate('content.user');
	data.message = message;
	res.render('message', data);
};
exports.addComment = async (req, res, next) => {};
exports.delete = async (req, res, next) => {};
