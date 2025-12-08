import express from 'express';
import request from 'supertest';

const app = express();

//simple routing
app.get('/page/product', (req, res) => {
    res.json({
        path: req.path,
        originalUrl: req.originalUrl,
        hostname: req.hostname,
        protocol: req.protocol
    });
});

test('Test Request Url', async () => {
    const response = await request(app)
        .get('/page/product')
        .query({name: 'Paper'});

    expect(response.body).toEqual({
        path: '/page/product',
        originalUrl: '/page/product?name=Paper',
        hostname: '127.0.0.1',
        protocol: 'http'
    });
});