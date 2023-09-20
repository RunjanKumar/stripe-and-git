/* eslint-disable import/no-extraneous-dependencies */

'use strict';

const express = require('express');
const cors = require('cors');
const { migerateDatabase } = require('../Utils/dbMigarations.js');
const routes = require('../routes');
const routeUtils = require('../Utils/routeUtils.js');
const { log, logger } = require('../Utils/utils.js');
// const { MESSAGES, ERROR_TYPES } = require('../utils/constants');

global.maintenanceMode = false;

module.exports = async (app, isSwaggerWrite) => {
    app.use(cors());
    app.use(require('body-parser').json({ limit: '50mb' }));
    app.use(require('body-parser').urlencoded({ limit: '50mb', extended: true }));

    app.use('/public', express.static('public'));
    // app.use('/loaderio-497f95070cee790a863bd98f98aa7f1d.txt', express.static('loaderio-497f95070cee790a863bd98f98aa7f1d.txt'));
    // Middleware function to check maintenance mode
    function checkMaintenanceMode(req, res, next) {
        if (global.maintenanceMode) {
            res.redirect('/maintenance');
        } else {
            next();
        }
    }
                   
    app.get('/maintenance', (req, res) => {
        if (global.maintenanceMode) {
            res.status(503).json({ message: 'Server under maintenance. Please try again later.' });
        } else {
            res.status(200).json({ message: 'Server is up and running.' });
        }
    });

    // Route handler to set maintenance mode
    app.post('/maintenance', (req, res) => {
        if (req.headers['maintenance-mode-secret'] === process.env.MAINTENANCE_MODE_SECRET) {
            global.maintenanceMode = true;
            res.status(200).send({ message: MESSAGES.MAINTENANCE_MODE_ON });
        } else {
            res.status(401).send({ message: ERROR_TYPES.UNAUTHORIZED });
        }
    });

    // Route handler to unset maintenance mode
    app.delete('/maintenance', (req, res) => {
        if (req.headers['maintenance-mode-secret'] === process.env.MAINTENANCE_MODE_SECRET) {
            global.maintenanceMode = false;
            res.status(200).send({ message: MESSAGES.MAINTENANCE_MODE_OFF });
        } else {
            res.status(401).send({ message: ERROR_TYPES.UNAUTHORIZED });
        }
    });

    /** middleware for each api call to logging* */
    app.use((request, response, next) => {
        const start = process.hrtime.bigint();

        response.on('finish', () => {
            const end = process.hrtime.bigint();
            const seconds = Number(end - start) / 1000000000;
            const message = `${request.method} ${response.statusCode} ${request.url} took ${seconds} seconds`;

            if (response.statusCode >= 200 && response.statusCode <= 299) {
                log.success(message);
            } else if (response.statusCode >= 400) {
                log.error(message);

                const payload = {
                    body: ((request.body || {}).value || {}),
                    params: ((request.params || {}).value || {}),
                    query: ((request.query || {}).value || {}),
                };
                const apiRequestData = `${request.method} ${request.route.path} ${response.statusCode} | 
          ${response.statusMessage} ${request.body.error ? request.body.error.message : ''} | ${JSON.stringify(payload)}`;

                logger.error(apiRequestData);
            } else {
                log.info(message);
            }
        });
        next();
    });

    app.use(checkMaintenanceMode);
    /** ******************************
      ***** For handling CORS Error ***
      ******************************** */
    app.all('/*', (request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header(
            'Access-Control-Allow-Headers',
            'Content-Type, api_key, Authorization,x-requested-with, Total-Count, Total-Pages, Error-Message',
        );
        response.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, OPTIONS');
        response.header('Access-Control-Max-Age', 1800);
        response.header('Cache-Control', 'no-store');
        next();
    });

    await migerateDatabase(); // run database migrations.                  

    await routeUtils.route(app, routes, isSwaggerWrite); // initalize routes.
};
