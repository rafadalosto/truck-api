const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Truck = require('../models/Truck')
const TruckPosition = require('../models/TruckPosition')

const connection = new Sequelize(dbConfig);

Truck.init(connection);
TruckPosition.init(connection);

TruckPosition.associate(connection.models);
Truck.associate(connection.models);

module.exports = connection;