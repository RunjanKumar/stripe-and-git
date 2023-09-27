'use strict';

/** *********** Modules ********** */
const mongoose = require('mongoose');

const { Schema } = mongoose;

/** *********** User Model ********** */
const userSchema = new Schema({
   isDeleted: { type: String },
   name: { type: String, required: [true, 'must be a string'], lowercase: true },
   type: { type: Number, required: [true, 'must be a string'] },
   userName: { type: String, required: [true, 'must be a string'], uppercase: true, unique: true, },
   age: { type: Number, required: [true, 'must be a number'], min: 13, max: 100 },
   email: { type: String, required: [true, 'must be a string'], unique: true, uniqueCaseInsensitive: true },
   state: { type: String },
   country: { type: String },
   stripeCutomerId: { type: String },
}, { timestamps: true, versionKey: false, collection: 'users' });

module.exports = mongoose.model('users', userSchema);
