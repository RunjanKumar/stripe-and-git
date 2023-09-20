'use strict'

const mongoose = require('mongoose');

const dbVersionSchema = new mongoose.Schema({
    version: { type: Number },
}, { collection: 'dbVsersion' });

module.exports = mongoose.model('dbVersion', dbVersionSchema);