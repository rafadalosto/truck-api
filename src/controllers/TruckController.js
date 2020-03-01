const Truck = require('../models/Truck')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    async list(req, res) {
        const trucks = await Truck.findAll();
        return res.json(trucks);
    },

    async get(req, res) {
        const { id } = req.params;
        const truck = await Truck.findOne({where: {id: id}});

        if (!truck) {
            return res.status(404).json({error:"Truck not found!"});
        }

        return res.json(truck);
    },
    
    async save(req, res) {
        const { plate, alias } = req.body;
        try {
            if (!plate) {
                return res.status(422).json({error: "You need to inform the plate of the Truck"});
            }
            
            if (await Truck.findOne({where: {plate: plate}})) {
                return res.status(422).json({error: "You can't create  two trucks with the same plate"});
            }

            const truck = await Truck.create({plate, alias});
            return res.json(truck);
        } catch(error) {
            console.log(error)
            return res.status(500).json({error: "An unexpected error has occurred. Please try again or contact the support"});
        }  
    },

    async update(req, res) {
        const { id } = req.params;
        const { plate, alias } = req.body;
        
        if (!plate) {
            return res.status(422).json({error: "You need to inform the plate of the Truck"});
        }
        
        if (await Truck.findOne({where: {plate: plate, id: { [Op.ne]: id }}})) {
            return res.status(422).json({error: "This plate is already registred!"});
        }
        
        const truck = await Truck.findByPk(id);

        if (!truck) {
            return res.status(404).json({error:"Truck not found!"});
        }
    
        truck.plate = plate;
        truck.alias = alias;
        truck.save();
        return res.json(truck);
    },

    async delete(req, res) {
        const { id } = req.params;
        const truck = await Truck.findByPk(id);
        if (!truck) {
            return res.status(404).json({error:"Truck not found!"});
        }

        truck.destroy();
        return res.json({message:"Truck removed with success!"});
    }
}