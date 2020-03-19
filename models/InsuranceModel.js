import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const insuranceSchema = new Schema({
	quote: {
		type: String,
		unique: false,
		required: true
	},
	termLength: {
		type: Number
	}
})
