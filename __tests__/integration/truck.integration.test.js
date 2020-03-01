const request = require('supertest');
const app = require('../../src/app');

const connection = require('../../src/database/index');
const Truck = connection.models.Truck;
const truncate = require('../utils/truncate');

describe('Truck Actions', () => {

    beforeEach(async() => {
        await truncate();
    });

    it('Create a Truck', async () => {
        const response = await request(app)
            .post('/truck')
            .send({
                plate: 'ABC1212',
                alias: 'Azul Cargo'
            });

        expect(response.status).toBe(200);
        expect(response.body.plate).toBe('abc1212');
    });

    it('Create a second Truck with the same plate', async () => {
        const response1 = await request(app)
            .post('/truck')
            .send({
                plate: 'ABC1212',
                alias: 'Azul Cargo'
            });

        expect(response1.status).toBe(200);

        const response2 = await request(app)
            .post('/truck')
            .send({
                plate: 'ABC1212',
                alias: 'Azul Cargo'
            });
            
        expect(response2.status).toBe(422);
    });

    it('Create a truck without plate', async () => {
        const response = await request(app)
            .post('/truck')
            .send({
                plate: '',
                alias: 'Azul Cargo'
            });

        expect(response.status).toBe(422);
    });

    it('List all trucks and return a empty list', async () => {
        const response = await request(app)
            .get('/')
            .send();

        expect(response.status).toBe(200);
        expect(response.body).toBe(200);
    });
});