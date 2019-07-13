const mongoose = require('mongoose');
const Message = require('./../models/Message');

exports.index = async (req, res, next) => {
	try {
		// const document = await Messages.find({ creator: req.user._id });
		const messages = await Message.find({ creator: req.query.user });
		res.status(200).json({ status: 'sucess', data: { messages } });
	} catch (error) {
		next(error);
	}
};

exports.create = async (req, res, next) => {
	if (
		// mongoose.Types.ObjectId.isValid(req.user._id) &&
		mongoose.Types.ObjectId.isValid(req.query.creator) &&
		mongoose.Types.ObjectId.isValid(req.query.reciever)
	) {
		const message = {
			creator: req.query.creator,
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
	} else {
		res.status(401).json({
			status: 'failed',
			message: 'Invalid id of one the message participants',
		});
	}
};

exports.reply = async (req, res, next) => {
	if (
		mongoose.Types.ObjectId.isValid(req.params.id)
		// &&
		// mongoose.Types.ObjectId.isValid(req.query.creator) &&
		// mongoose.Types.ObjectId.isValid(req.query.reciever)
	) {
		try {
			const message = await Message.findByIdAndUpdate(req.params.id, {
				$push: { content: { message: req.body.message } },
			});
			res.status(201).json({ status: 'success', data: message });
		} catch (error) {
			console.log(error);
			next(error);
		}
	} else {
		res.status(401).json({
			status: 'failed',
			message: 'Invalid id of one the message participants or message',
		});
	}
};
