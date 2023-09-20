'use strict';

const defaults = {
    PORT : process.env.PORT || 8001,
    swagger: require('./swagger.js'),
    SWAGGER_AUTH: {
        USERNAME: process.env.SWAGGER_AUTH_USERNAME || 'username',
        PASSWORD: process.env.SWAGGER_AUTH_PASSWORD || 'password',
    },
    SERVER: {
        PORT: process.env.PORT || 8001,
        URL: process.env.URL || '0.0.0.0', 
    },
    MONGODB: {
        PROTOCOL: process.env.DB_PROTOCOL || 'mongodb',
        HOST: process.env.DB_HOST || '127.0.0.1',
        PORT: process.env.DB_PORT || 27017,
        NAME: process.env.DB_NAME || 'project',
        USER: process.env.DB_USER || 'username',
        PASSWORD: process.env.DB_PASS || 'password',
        get URL() { return process.env.DB_URL || `${this.PROTOCOL}://${this.HOST}:${this.PORT}/${this.NAME}`; },
    },
    PINO: {
        API_KEY: process.env.PINO_API_KEY || 'pino api key',
        API_SECRET: process.env.PINO_API_SECRET || 'pino secret key',
    },
    LIVE_LOGGER_ENABLE: process.env.LIVE_LOGGER_ENABLE || false,
};

module.exports = defaults;