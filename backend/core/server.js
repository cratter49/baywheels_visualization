// Built using example: https://medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274

'use strict';

// Middleware
const mongoose = require('mongoose');
const express = require('express');

// Utilities
const bodyParser = require('body-parser');
const cors = require('cors');
const cors_proxy = require('cors-anywhere');
const fs = require('fs');
const logger = require('morgan');
const path = require('path');

const API_PORT = 3001 || process.env.port;
const app = express();
app.use(cors());

const router = express.Router();

// this is our MongoDB database from "MongoDB Atlas"
const dbRoute =
  'mongodb+srv://djwisema:viyrCAxnv9bxuFx1@clusterofwisdom-10ezm.mongodb.net/test?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// loop through all routes and dynamically require them – passing router
fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
  // This statement is like a function call
  require('./routes/' + file)(router);
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
var server = app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

// TODO for real time data
// app.get('/proxy', function(req, res) {
//   req.url = req.url.replace('/proxy/', '/'); // Strip "/proxy" from the front of the URL.
//   cors_proxy.emit('request', req, res);
// });

module.exports = server;