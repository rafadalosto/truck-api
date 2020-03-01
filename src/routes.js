const express = require('express');
const TruckController = require('./controllers/TruckController')
const TruckPositionController = require('./controllers/TruckPositionController')
const routes = express.Router();

routes.get('/truck', TruckController.list)
routes.get('/truck/:id', TruckController.get)
routes.post('/truck', TruckController.save);
routes.put('/truck/:id', TruckController.update);
routes.delete('/truck/:id', TruckController.delete);

routes.get('/truckPosition/:truck_id/', TruckPositionController.list);
routes.get('/truckPosition/:truck_id/:id', TruckPositionController.get);
routes.post('/truckPosition/:truck_id/', TruckPositionController.save);
routes.delete('/truckPosition/:truck_id/:id', TruckPositionController.delete);

module.exports = routes;