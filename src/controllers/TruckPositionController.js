const TruckPosition = require('../models/TruckPosition');
const Truck = require('../models/Truck');
const Sequelize = require('sequelize');

module.exports = {
    async list(req, res) {
        const { truck_id } = req.params;
        const truck = await Truck.findByPk(truck_id, {
            include: {association: "positions"}
        })

        return res.json(truck.positions);
    },

    async get(req, res) {
        const { truck_id, id } = req.params;
        const truckPosition = await TruckPosition.findOne({where: {id: id, truck_id : truck_id}});
        if (!truckPosition) {
            return res.status(404).json({error:"Truck Position not found!"});
        }

        return res.json(truckPosition);
    },
    
    async save(req, res) {
        const { truck_id } = req.params;
        const { lat, lng } = req.body;
        try {
            if (!lat || !lng) {
                return res.status(422).json({error: "The parameters lat and lng needs to be informed!"});
            }
        
            if (! await Truck.findOne({where: {id: truck_id}})) {
                return res.status(422).json({error: "Truck doesn't exists!"});
            }
            const position = {
                type: 'Point',
                coordinates: [lat, lng]
            }

            const truckPosition = await TruckPosition.create({position, truck_id});
            return res.json(truckPosition);
        } catch(error) {
            console.log(error)
            return res.status(422).json({error: "An error has ocurred. Please, confirm the value of lat: " + lat + " and lnt: " + lng });
        }  
    },

    async delete(req, res) {
        const { truck_id, id } = req.params;
        const truckPosition = await TruckPosition.findOne({where: {id: id, truck_id : truck_id}});
        if (!truckPosition) {
            return res.status(404).json({error:"Truck Position not found!"});
        }

        truckPosition.destroy();

        return res.json({message: "Position removed with success!"});
    }
}