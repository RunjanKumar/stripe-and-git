'use strict';
const { hashPassword } = require('./utils');
const dbService = require('../service/dbService');
const dbVersionModel = require('../models/dbVersionModel');
const userModel = require('../models/userModel');

const dbMigrations = {}

dbMigrations.migerateDatabase = async () => {
    let dbVersion = await dbService.findOne(dbVersionModel, {});
    if (!dbVersion || dbVersion.version < 1) {
        console.log('Running initial migration...');
        await dbMigrations.createAdmin();
        dbVersion = await dbService.findOneAndUpdate(dbVersionModel,{}, { version: 1 }, { upsert: true, new: true });
    }
   
};

dbMigrations.createAdmin = async () => {
    try {
        const data = [
            {
                name: 'runjan',
                age: 20,
                email: 'Riunjan@yopmail.com', /* CONFIG.ADMIN.EMAIL, */
                password: hashPassword('runjan22'),
                userName: 'runjan', /* CONFIG.ADMIN.USERNAME, */
                type:/*  USER_TYPE.SUPER_ADMIN || */ 1,
            },
            {
                name: 'runjan',
                age: 21,
                email: 'sahil@yopmail.com', /* CONFIG.ADMIN.EMAIL, */
                password: hashPassword('runjan22'),
                userName: 'sahil', /* CONFIG.ADMIN.USERNAME, */
                type:/*  USER_TYPE.SUPER_ADMIN || */ 1,
            }
        ];
        await dbService.insertMany(userModel, data);
    } catch (e) {
        console.log(e)
    }
   
};

module.exports = dbMigrations;