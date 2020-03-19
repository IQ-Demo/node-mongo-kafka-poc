import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const leaseSchema = new Schema({
	term: {
		type: String,
		unique: false,
		required: true
	},
	termLength: {
		type: Number
	}
})
