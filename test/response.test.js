import express from 'express';
import request from 'supertest';

const app = express();

//simple routing
app.get('/', (req, res) => {
    res.send('Hello response!');
});

test('Test Response', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Hello response!');
});