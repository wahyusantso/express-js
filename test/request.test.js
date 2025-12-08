import express from 'express';
import request from 'supertest';

const app = express();

//simple routing
app.get('/', (req, res) => {
    res.send('First code express js.');
});

test('Test Express JS endpoit /', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200); //memastikan status code yang diterima 200
});