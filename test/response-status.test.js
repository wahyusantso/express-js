import express from 'express';
import request from 'supertest';

const app = express();

//simple routing
app.get('/', (req, res) => {
    if(req.query.name) {
        //mengembalikan status dan response data
        res.status(200).send(`Hello ${req.query.name}`);
    } else {
        //hanya mengembalikan response status
        res.status(400).end();
    }
});

test('Test Response status', async () => {
    let response = await request(app).get('/').query({name: 'Ricard'}); //melakukan request dengan parameter
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello Ricard');

    response = await request(app).get('/');
    expect(response.status).toBe(400);
});