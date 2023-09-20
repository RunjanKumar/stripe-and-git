'use strict';

/** *********** Modules ********** */
const mongoose = require('mongoose');

const { Schema } = mongoose;

/** *********** User Model ********** */
const userSchema = new Schema({
   isDeleted: { type: String },
   type: { type: Number },
   name: { type: String, required: [true, 'must be a string'], lowercase: true },
   userName: { type: String, required: [true, 'must be a string'], uppercase: true },
   age: { type: Number, required: [true, 'must be a number'], min: 13, max: 100 },
   age: { type: Number, required: [true, 'must be a number'] },
   email: { type: String, required: [true, 'must be a string'], unique: true, uniqueCaseInsensitive: true },
   address: { type: String },
}, { timestamps: true, versionKey: false, collection: 'users' });

module.exports = mongoose.model('users', userSchema);
