/* eslint-disable no-console */

'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { MONGODB } = require('../config');

module.exports = async () => {
    try {
        const options = {
            useNewUrlParser: true,
        //     useCreateIndex: true,
        //     useUnifiedTopology: true,
        //     useFindAndModify: false,
        };
        await mongoose.connect(MONGODB.URL, options);
        console.log('MongoDB connected at', MONGODB.URL);
        
    } catch (error) {
        console.log(error);
    }
};
