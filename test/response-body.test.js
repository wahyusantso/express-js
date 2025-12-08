import express from 'express';
import request from 'supertest';

const app = express();

//simple routing
app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');//set content-type ke text/html karena response yang dikembalikan berupa html
    res.send('<html><body>good day!</body></html>');
});

test('Test Response Body', async () => {
    const response = await request(app).get('/');
    expect(response.get('Content-Type')).toContain('text/html');
    expect(response.text).toBe('<html><body>good day!</body></html>');
});