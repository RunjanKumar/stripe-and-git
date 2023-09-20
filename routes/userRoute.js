'use strict';

const { Joi } = require('../Utils/joiUtil');
const { userController } = require('../controller');

module.exports = [
    {
        method: 'POST',
        path: '/user/register',
        joiSchemaForSwagger: {
            body: {
                name: Joi.string().required().description('name of the user'),
            },
            group: 'ADMIN',
            description: 'Route to edit Child Post.',
            model: 'ADD_CHILD_POST',
        },
        // auth: AVAILABLE_AUTHS.ALL_ADMINS,
        handler: userController.register,
    },
    {
        method: 'POST',
        path: '/user/register/2',
        joiSchemaForSwagger: {
            body: {
                name: Joi.string().required().description('name of the user'),
            },
            group: 'ADMIN',
            description: 'Route to edit Child Post.',
            model: 'ADD_CHILD_POST',
        },
        // auth: AVAILABLE_AUTHS.ALL_ADMINS,
        handler: userController.register,
    }
];
