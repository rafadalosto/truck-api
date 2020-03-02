const sqlite = require('spatialite');
const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../utils/truncate');

sqlite.Database.prototype.run_cp = sqlite.Database.prototype.run;
sqlite.Database.prototype.run = function run(...args) {
  this.spatialite(err => {
    return this.run_cp(...args);  
  })
}

describe('Truck Postions Actions', () => {

    beforeEach(async() => {
        await truncate();
    });

    it('Register a Truck Position', async () => {
        const truckResponse = await request(app)
            .post('/truck')
            .send({
                plate: 'ABC1215',
                alias: 'Azul Cargo'
            });

        expect(truckResponse.status).toBe(200);
        const truck_id = truckResponse.body.id

        const truckPositionResponse = await request(app)
            .post('/truckPosition/' + truck_id)
            .send({
                lat: '-26.2919701',
                lng: '-48.8498027'
            });
        
        expect(truckPositionResponse.status).toBe(200);    
    });

    it('Register a Truck Position with no coordenate lat', async () => {
        const truckResponse = await request(app)
            .post('/truck')
            .send({
                plate: 'ABC1298',
                alias: 'Azul Cargo'
            });

        expect(truckResponse.status).toBe(200);
        const truck_id = truckResponse.body.id

        const truckPositionResponse = await request(app)
            .post('/truckPosition/' + truck_id)
            .send({
                lat: '',
                lng: '45'
            });
        
        expect(truckPositionResponse.status).toBe(422);    
    });

    it('Register a Truck Position with no coordenate lng', async () => {
        const truckResponse = await request(app)
            .post('/truck')
            .send({
                plate: 'ABC1210',
                alias: 'Azul Cargo'
            });

        expect(truckResponse.status).toBe(200);
        const truck_id = truckResponse.body.id

        const truckPositionResponse = await request(app)
            .post('/truckPosition/' + truck_id)
            .send({
                lat: '45',
                lng: null
            });
        
        expect(truckPositionResponse.status).toBe(422);    
    });

    it('Register a Truck Position with invalid coordenate', async () => {
        const truckResponse = await request(app)
            .post('/truck')
            .send({
                plate: 'ABC1299',
                alias: 'Azul Cargo'
            });

        expect(truckResponse.status).toBe(200);
        const truck_id = truckResponse.body.id

        const truckPositionResponse = await request(app)
            .post('/truckPosition/' + truck_id)
            .send({
                lat: '45',
                lng: 'A21'
            });
        
        expect(truckPositionResponse.status).toBe(422);    
    });

    it('Register a Truck Position with invalid truck', async () => {
        const truckResponse = await request(app)
            .post('/truck')
            .send({
                plate: 'ABC1299',
                alias: 'Azul Cargo'
            });

        expect(truckResponse.status).toBe(200);
        const truck_id = truckResponse.body.id

        const truckPositionResponse = await request(app)
            .post('/truckPosition/INVALID_TRUCK')
            .send({
                lat: '45',
                lng: '45'
            });
        
        expect(truckPositionResponse.status).toBe(422);    
    });


    it('find all positions from a Truck', async () => {
        const truckResponse = await request(app)
            .post('/truck')
            .send({
                plate: 'BBC1222',
                alias: 'Azul Cargo'
            });

        expect(truckResponse.status).toBe(200);
        const truck_id = truckResponse.body.id

        const truckPositionResponse1 = await request(app)
            .post('/truckPosition/' + truck_id)
            .send({
                lat: '46',
                lng: '47'
            });
        
        expect(truckPositionResponse1.status).toBe(200);  
        
        const truckPositionResponse2 = await request(app)
            .post('/truckPosition/' + truck_id)
            .send({
                lat: '46',
                lng: '46'
            });
        
        expect(truckPositionResponse2.status).toBe(200);

        const listPositionsResponse = await request(app)
            .get('/truckPosition/' + truck_id)
            .send();
        
        expect(listPositionsResponse.status).toBe(200);  
        expect(listPositionsResponse.body.length).toBe(2);  
    });

    it('find a specific positions from a Truck', async () => {
        const truckResponse = await request(app)
            .post('/truck')
            .send({
                plate: 'BBC1222',
                alias: 'Azul Cargo'
            });

        expect(truckResponse.status).toBe(200);
        const truck_id = truckResponse.body.id

        const truckPositionResponse1 = await request(app)
            .post('/truckPosition/' + truck_id)
            .send({
                lat: '46',
                lng: '47'
            });
        
        expect(truckPositionResponse1.status).toBe(200);  
        const truckPositionId = truckPositionResponse1.body.id
        
        const truckPositionResponse2 = await request(app)
            .post('/truckPosition/' + truck_id)
            .send({
                lat: '46',
                lng: '46'
            });
        
        expect(truckPositionResponse2.status).toBe(200);

        const getPositionResponse = await request(app)
            .get('/truckPosition/' + truck_id + '/' + truckPositionId)
            .send();
        
        expect(getPositionResponse.status).toBe(200);  
        expect(getPositionResponse.body.id).toBe(truckPositionId);  
    });

    it('find a specific positions from a Truck with invalid truck', async () => {
        const truckResponse = await request(app)
            .post('/truck')
            .send({
                plate: 'BBC1222',
                alias: 'Azul Cargo'
            });

        expect(truckResponse.status).toBe(200);
        const truck_id = truckResponse.body.id

        const truckPositionResponse1 = await request(app)
            .post('/truckPosition/' + truck_id)
            .send({
                lat: '46',
                lng: '47'
            });
        
        expect(truckPositionResponse1.status).toBe(200);  
        const truckPositionId = truckPositionResponse1.body.id
        
        const truckPositionResponse2 = await request(app)
            .post('/truckPosition/' + truck_id)
            .send({
                lat: '46',
                lng: '46'
            });
        
        expect(truckPositionResponse2.status).toBe(200);

        const getPositionResponse = await request(app)
            .get('/truckPosition/INVALID_TRUCK/' + truckPositionId)
            .send();
        
        expect(getPositionResponse.status).toBe(404);  
    });

    it('find a specific positions from a Truck with invalid position ID', async () => {
        const truckResponse = await request(app)
            .post('/truck')
            .send({
                plate: 'BBC1222',
                alias: 'Azul Cargo'
            });

        expect(truckResponse.status).toBe(200);
        const truck_id = truckResponse.body.id

        const truckPositionResponse1 = await request(app)
            .post('/truckPosition/' + truck_id)
            .send({
                lat: '46',
                lng: '47'
            });
        
        expect(truckPositionResponse1.status).toBe(200);  

        const getPositionResponse = await request(app)
            .get('/truckPosition/' + truck_id + '/INVALID')
            .send();
        
        expect(getPositionResponse.status).toBe(404);  
    });

    it('Delete a truck position', async () => {
        const truckResponse = await request(app)
            .post('/truck')
            .send({
                plate: 'BBC1222',
                alias: 'Azul Cargo'
            });

        expect(truckResponse.status).toBe(200);
        const truckId = truckResponse.body.id;

        const truckPositionResponse1 = await request(app)
            .post('/truckPosition/' + truckId)
            .send({
                lat: '46',
                lng: '47'
            });
        
        expect(truckPositionResponse1.status).toBe(200);
        const truckPositionId = truckPositionResponse1.body.id;

        const deletePositionsResponse = await request(app)
            .delete('/truckPosition/' + truckId + '/' + truckPositionId)
            .send();
        
        expect(deletePositionsResponse.status).toBe(200);  
    });

    it('Delete a truck position with invalid truck', async () => {
        const truckResponse = await request(app)
            .post('/truck')
            .send({
                plate: 'BBC1222',
                alias: 'Azul Cargo'
            });

        expect(truckResponse.status).toBe(200);
        const truckId = truckResponse.body.id;

        const truckPositionResponse1 = await request(app)
            .post('/truckPosition/' + truckId)
            .send({
                lat: '46',
                lng: '47'
            });
        
        expect(truckPositionResponse1.status).toBe(200);
        const truckPositionId = truckPositionResponse1.body.id;

        const deletePositionsResponse = await request(app)
            .delete('/truckPosition/INVALID_TRUC/' + truckPositionId)
            .send();
        
        expect(deletePositionsResponse.status).toBe(404);  
    });

    it('Delete a truck position with invalid position id', async () => {
        const truckResponse = await request(app)
            .post('/truck')
            .send({
                plate: 'BBC1222',
                alias: 'Azul Cargo'
            });

        expect(truckResponse.status).toBe(200);
        const truckId = truckResponse.body.id;

        const truckPositionResponse1 = await request(app)
            .post('/truckPosition/' + truckId)
            .send({
                lat: '46',
                lng: '47'
            });
        
        expect(truckPositionResponse1.status).toBe(200);
        const truckPositionId = truckPositionResponse1.body.id;

        const deletePositionsResponse = await request(app)
            .delete('/truckPosition/' + truckId + '/INVALID_POSITION_ID')
            .send();
        
        expect(deletePositionsResponse.status).toBe(404);  
    });
});