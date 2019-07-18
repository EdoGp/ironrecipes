const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema(
	{
		creator: { type: Schema.Types.ObjectId, ref: 'User' },
		receiver: { type: Schema.Types.ObjectId, ref: 'User' },
		topic: { type: String },
		content: [
			{
				message: { type: String },
				timestamp: { type: Date, default: Date.now },
				user: { type: Schema.Types.ObjectId, ref: 'User' },
			},
		],
	},
	{
		timestamps: true,
	},
);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
