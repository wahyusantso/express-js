import express from 'express';
import request from 'supertest';

const app = express();

//dinamis route path dengan regex
app.get('/product/:path', (req, res) => { //bebas menentukan path
    res.send(req.originalUrl);
});

test('Test Route Path', async () => {
    const response = await request(app).get('/product/shirt');
    expect(response.text).toBe('/product/shirt');
});