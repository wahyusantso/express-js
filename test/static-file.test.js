import express from 'express';
import request from 'supertest';

const app = express();

// app.use(express.static(__dirname + '/static')); //expose static folder
app.use('/asset', express.static(__dirname + '/static')); //menambahkan route pada middleware untuk akses file/folder static

//simple routing
app.get('/', (req, res) => {
    res.send('Hello response!');
});

test('Test Static', async () => {
    const response = await request(app).get('/contoh.txt'); //akses folder static untuk mendapatkan file
    expect(response.text).toBe('This is sample text');
});

test('Test Static dengan route', async () => {
    const response = await request(app).get('/asset/contoh.txt'); //akses file
    expect(response.text).toBe('This is sample text');
});