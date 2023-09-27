'use strict';

const { dbService, stripeService } = require('../service');
const { userModel } = require('../models');                  
const { createSuccessResponse, createErrorResponse } = require('../helpers');
const userController = {};

/* function to create a customer */
userController.register = async (payload) => {
    const { name, age, state, country, type, userName, email  } = payload;
    let user = await dbService.create(userModel, { ...payload });
    const users = await stripeService.createCustomer(user);
    user = await dbService.findOneAndUpdate(userModel, { email, isDeleted: { $ne: true } }, { stripeCutomerId: users.id });
    return createSuccessResponse('done', user);
};

/* function to update a customer */
userController.updateUser = async (payload) => {
    const { name, age, state, country, userId  } = payload;
    const user = await dbService.findOneAndUpdate(userModel, { _id: userId, isDeleted: { $ne: true } }, { ... payload });
    stripeService.updateCustomer(user.stripeCutomerId, user);
    return createSuccessResponse('done', user);
};

module.exports = userController;