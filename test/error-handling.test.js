import express from 'express';
import request from 'supertest';

const app = express();

//error handling
const errorMiddleware = (err, req, res, next) => {
    res.status(500).send(err.message);
};

//simple routing
app.get('/', (req, res) => {
    throw new Error("something went wrong");
});

//error handling dengan middleware
app.use(errorMiddleware);

test('Test Error Handling', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(500);
    expect(response.text).toBe('something went wrong');
});