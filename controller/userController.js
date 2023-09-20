'use strict';

const userController = {};
const { dbService } = require('../service/dbService.js');
const { userModel } = require('../models');
const { createSuccessResponse, createErrorResponse } = require('../helpers');
console.log(createErrorResponse, createSuccessResponse);
userController.register = async (payload) => {
    const { name } = payload;
    console.log(name);
    createSuccessResponse('done')
};

module.exports = userController;