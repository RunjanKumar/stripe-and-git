const BCRYPT = require('bcrypt');
const fs = require('fs');
const pino = require('pino');
const CONSTANTS = require('../Utils/constant.js');
const { PINO, LIVE_LOGGER_ENABLE } = require('../config');

const commonFunctions = {}; 
/**
 * incrypt password in case user login implementation
 * @param {*} payloadString
 */
commonFunctions.hashPassword = (payloadString) => BCRYPT.hashSync(payloadString, CONSTANTS.SECURITY.BCRYPT_SALT);

/**
 * Logger for error and success
 */
commonFunctions.log = {
    info: (data) => {
        console.log(`\x1b[33m${data}`, '\x1b[0m');
    },
    success: (data) => {
        console.log(`\x1b[32m${data}`, '\x1b[0m');
    },
    error: (data) => {
        console.log(`\x1b[31m${data}`, '\x1b[0m');
    },
    default: (data) => {
        console.log(data, '\x1b[0m');
    },
};

/**
 * Variable to create logging
 */
commonFunctions.logger = (() => {
    if (LIVE_LOGGER_ENABLE) {
        return pino({
            browser: {
                transmit: {
                    send,
                },
            },
        }, stream);
    }

    if (!fs.existsSync('./error.log')) {
        fs.writeFileSync('./error.log', '');
    }
    return pino(pino.destination('./error.log'));
})();


/**
 * @param {string} plainText
 * @param {string} hash
 */
commonFunctions.compareHash = (payloadPassword, userPassword) => BCRYPT.compareSync(payloadPassword, userPassword);

module.exports = commonFunctions;