const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		description: { type: String },
		cuisine: { type: String },
		likes: { type: Number },
		type: { type: String, enum: ['Entree', 'Appetizer', 'Soup', 'Salad'] },
		preparation: { type: String },
		comments: [
			{
				user: { type: Schema.Types.ObjectId, ref: 'user' },
				text: { type: String },
			},
		],
		images: [{ type: String }],
	},
	{
		timestamps: true,
	},
);

const Recipe = mongoose.model('Recipe', userSchema);
module.exports = Recipe;
