import express from 'express';
import request from 'supertest';

const app = express();

//simple routing
app.get('/', (req, res) => {
    res.send(`Hello ${req.query.firstname} ${req.query.lastname}`);
});

test('Test Query parameter', async () => {
    const response = await request(app)
        .get('/')
        .query({firstname: 'Wahyu', lastname: 'Santoso'}); //sisipkan query pada http request
    expect(response.text).toBe("Hello Wahyu Santoso");
});