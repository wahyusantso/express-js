import express from 'express';
import request from 'supertest';

const app = express();

//simple routing
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/contoh.txt'); //mengirimkan file untuk di render dibrowser, bisa juga berupa file html
});

test('Test Response Send File', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('This is sample text');
});