require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const express = require('express');
const routes = require('./routes');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');

require('./database');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(routes);

module.exports = app