require('dotenv').config();
const http = require('http');
const process = require('process');
const express = require('express');
const { SERVER } = require('./config/index.js');

const app = express();

const server = http.Server(app);
const startNodeserver = async () => {
    await require('./startup/db_mongodb.js')() // make connectoin with database
    await require('./startup/expressStartup.js')(app); // express startup
    return new Promise((resolve, reject) => {
        server.listen(SERVER.PORT, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
};

startNodeserver().then(() => {
    console.log('Node server running on', SERVER.URL , 'at', SERVER.PORT);
}).catch((err) => {
    console.log('Error in starting server', err);
    process.exit(1);
});