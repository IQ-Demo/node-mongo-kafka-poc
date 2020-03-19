import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const paymentSchema = new Schema({
	termInterval: {
		type: String,
		unique: false,
		required: true
	},
	amount: {
		type: Number
	}
})
