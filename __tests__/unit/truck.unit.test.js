const connection = require('../../src/database/index');
const Truck = connection.models.Truck;
const truncate = require('../utils/truncate');

describe('Truck', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('should validate if plate is converted to LowerCase before save a Truck', async () => {
        const truck = await Truck.create({plate: 'ABC1234', alias: 'Azul Cargo'});
        expect(truck.plate).toBe('abc1234');
    });

    it('should validate if plate is converted to LowerCase before update a Truck', async () => {
        const createTruck = await Truck.create({plate: 'ABC1234', alias: 'Azul Cargo'});
        const truck = await Truck.findOne({where: {
            plate:'abc1234'
        }})

        truck.plate = "AAA1122";
        await truck.save();        
        expect(truck.plate).toBe('aaa1122');
    });
});