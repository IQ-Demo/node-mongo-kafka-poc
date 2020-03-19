import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const disclaimerSchema = new Schema({
	title: {
		type: String,
		unique: false,
		required: true
	},
	body: {
		type: String,
		unique: false,
		required: true
	}
})

