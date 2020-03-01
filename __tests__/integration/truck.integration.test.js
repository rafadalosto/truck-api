const request = require('supertest');
const app = require('../../src/app');
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
            .get('/truck')
            .send();

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(0);
    });

    it('List all trucks (2)', async () => {

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
                plate: 'ABC1233',
                alias: 'Azul Cargo 2'
            });
            
        expect(response2.status).toBe(200);
        
        const response = await request(app)
            .get('/truck')
            .send();

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });

    it('Get a truck by id', async () => {

        const response1 = await request(app)
            .post('/truck')
            .send({
                plate: 'ABC1212',
                alias: 'Azul Cargo'
            });

        expect(response1.status).toBe(200);

        const truckId = response1.body.id;
        
        const response = await request(app)
            .get('/truck/' + truckId)
            .send();

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(truckId);
    });

    it('Get a truck by with a invalid id', async () => {
        const response = await request(app)
            .get('/truck/INVALID_ID')
            .send();

        expect(response.status).toBe(404);
    });

    it('Update a truck', async () => {
        const response1 = await request(app)
            .post('/truck')
            .send({
                plate: 'ABC1212',
                alias: 'Azul Cargo'
            });

        expect(response1.status).toBe(200);

        const truckId = response1.body.id;
        
        const response = await request(app)
            .put('/truck/' + truckId)
            .send({
                plate: 'ABC1212',
                alias: 'Latam Cargo'
            });

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(truckId);
        expect(response.body.alias).toBe('Latam Cargo');
        expect(response.body.plate).toBe('abc1212');
    });

    it('Update a truck with a invalid Truck Id', async () => {
        const response = await request(app)
            .put('/truck/TRUCK_INVALID')
            .send({
                plate: 'ABC1212',
                alias: 'Latam Cargo'
            });

        expect(response.status).toBe(404);
    });

    it('Update a truck with plate null', async () => {
        const response1 = await request(app)
            .post('/truck')
            .send({
                plate: 'ABC1212',
                alias: 'Azul Cargo'
            });

        expect(response1.status).toBe(200);

        const truckId = response1.body.id;
        
        const response = await request(app)
            .put('/truck/' + truckId)
            .send({
                plate: null,
                alias: 'Latam Cargo'
            });

        expect(response.status).toBe(422);
    });

    it('Update a truck with a plate already registered', async () => {
        const response1 = await request(app)
            .post('/truck')
            .send({
                plate: 'ABC1212',
                alias: 'Azul Cargo'
            });

        expect(response1.status).toBe(200);

        const truckId = response1.body.id;

        const response2 = await request(app)
            .post('/truck')
            .send({
                plate: 'GOL0001',
                alias: 'Gol Cargo'
            });

        expect(response2.status).toBe(200);
        
        const response = await request(app)
            .put('/truck/' + truckId)
            .send({
                plate: 'GOL0001',
                alias: 'Latam Cargo'
            });

        expect(response.status).toBe(422);
    });


    it('Delete a truck', async () => {
        const response1 = await request(app)
            .post('/truck')
            .send({
                plate: 'ABC1212',
                alias: 'Azul Cargo'
            });

        expect(response1.status).toBe(200);

        const truckId = response1.body.id;
        
        const response = await request(app)
            .delete('/truck/' + truckId)
            .send();

        expect(response.status).toBe(200);
    });

    it('Delete a truck with a invalid ID', async () => {
        const response = await request(app)
            .delete('/truck/INVALID_ID')
            .send();

        expect(response.status).toBe(404);
    });
});