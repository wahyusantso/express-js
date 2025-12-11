import express, { json } from 'express';
import request from 'supertest';

const app = express();
app.use(express.json()); //menggunakan built-in middleware untuk konversi data body ke json.
app.use(express.urlencoded({extended: false})); //konversi ke form, set ke false supaya tidak membaca data dari query parameter

//simple routing
app.post('/json', (req, res) => {
    const name = req.body.name; //ambil data body
    //konversi json
    res.json({
        name: `Hello ${name}`
    });
});

app.post('/form', (req, res) => {
    const name = req.body.name; //ambil data body
    //konversi json
    res.json({
        name: `Hello ${name}`
    });
});

test('Test Request Json', async () => {
    const response = await request(app)
        .post('/json')
        .set('Content-Type', 'application/json')
        .send({name: 'Royes'}); //kirim data melalui body
    expect(response.body).toEqual({
        name: 'Hello Royes'
    });
});

test('Test Request Form', async () => {
    const response = await request(app)
        .post('/form')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send('name=Royes'); //kirim data melalui body, dalam bentuk form
    expect(response.body).toEqual({
        name: 'Hello Royes'
    });
});