const express = require('express');
const app = express();
const passport = require('passport');

require('./startup/middlewares')(app);

// Require database connection with giving blank func
require('./startup/database');

require('./startup/passport')();

// Require route func with giving app func
require('./startup/routes')(app);

// Require server func with giving app func
require('./startup/server')(app);
