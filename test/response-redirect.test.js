import express from 'express';
import request from 'supertest';

const app = express();

//simple routing
app.get('/', (req, res) => {
    //saat ada request ke path ini, maka akan redirect ke endpoint lainnya
    res.redirect('/to-next-page');
});

test('Test Response', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(302);//secara default status code 302
    expect(response.get('location')).toBe('/to-next-page');
});