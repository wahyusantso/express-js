import express from 'express';
import request from 'supertest';

const app = express();

//simple routing
app.get('/', (req, res) => {
    res.send('Hello response!');
});

//not found handle via middleware, posisi middleware harus paling bawah
app.use((req, res, next) => {
    res.status(404).send('Not found 404 oy!');
});

test('Test Response', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Hello response!');
});

test('Test Not Found Route', async () => {
    const response = await request(app).get('/product');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Not found 404 oy!');
});