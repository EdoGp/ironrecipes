const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema(
	{
		creator: { type: String },
		participants: [{ type: Schema.Types.ObjectId, ref: 'user' }],
		content: [
			{
				message: { type: String },
				timestamp: { type: Date, default: Date.now },
			},
		],
	},
	{
		timestamps: true,
	},
);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
