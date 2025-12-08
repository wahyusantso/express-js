import express from 'express';
import request from 'supertest';

const app = express();

//simple routing
app.get('/', (req, res) => {
    res.send(`Great Job ${req.query.name}!`);
});

test('Test Query parameter', async () => {
    const response = await request(app).get('/').query({name: 'Wahyu'}); //sisipkan query pada http request
    expect(response.text).toBe('Great Job Wahyu!');
});