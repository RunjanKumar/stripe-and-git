'use strict';

const { Joi } = require('../Utils/joiUtil');
const { userController } = require('../controller');
const { USER_TYPE } = require('../Utils/constant');

module.exports = [
    {
        method: 'POST',
        path: '/user/register',
        joiSchemaForSwagger: {
            body: {
                name: Joi.string().required().description('name of the user'),
                type: Joi.number().valid(USER_TYPE.PARTNER, USER_TYPE.COMPANY).required().description('type of the user'),
                userName: Joi.string().required().description('userName of the user'),
                age: Joi.number().min(13).max(100).required().description('age of the user'),
                email: Joi.string().email().required().description('email of the user'),
                state: Joi.string().description('state of the user'),
                country: Joi.string().description('country of the user'),
            },
            group: 'USER',
            description: 'Route for register a user',
            model: 'USER_REGISTER',
        },
        handler: userController.register,
    },
    {
        method: 'PUT',
        path: '/user/update',
        joiSchemaForSwagger: {
            body: {
                userId: Joi.string().objectId().required().description('userId of the user'),
                name: Joi.string().required().description('name of the user'),
                age: Joi.number().min(13).max(100).required().description('age of the user'),
                state: Joi.string().description('state of the user'),
                country: Joi.string().description('country of the user'),
            },
            group: 'USER',
            description: 'Route for update a user',
            model: 'USER_UPDATE',
        },
        handler: userController.updateUser,
    },
];
