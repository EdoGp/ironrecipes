const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		firstName: { type: String },
		familyName: { type: String },
		username: { type: String, unique: true },
		password: { type: String, select: false },
		googleID: { type: String },
		recipes: { type: Schema.Types.ObjectId, ref: 'Recipe' },
		level: {
			type: String,
			enum: [
				'Dishwasher',
				'Kitchen Porter',
				'Commis Chef',
				'Chef de Partie',
				'Sous Chef',
				'Head Chef',
				'Executive Chef',
			],
		},
		// location: {
		// 	city: { type: String },
		// 	state: { type: String },
		// },
		image: { type: String },
		chats: { type: Schema.Types.ObjectId, ref: 'Message' },
		email: {
			type: String,
			unique: true,
			match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		},
	},
	{
		timestamps: true,
	},
);

const User = mongoose.model('User', userSchema);
module.exports = User;
