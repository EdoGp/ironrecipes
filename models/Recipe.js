const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: { type: String },
	},
	{
		timestamps: true,
	},
);

const Recipe = mongoose.model('Recipe', userSchema);
module.exports = Recipe;
