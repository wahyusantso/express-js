import cookieParser from 'cookie-parser';
import express from 'express';
import request from 'supertest';

const app = express();
app.use(cookieParser()); //menggunakan cookie pada middleware
app.use(express.json());

//simple routing
app.get('/', (req, res) => {
    const name = req.cookies['name']; //ambil data cookie melalui header
    res.send(`Hello ${name}`);
});

//membuat cookie dari sisi server, agar dapat digunakan client saat request.
app.post('/login', (req, res) => {
    const name = req.body.name;
    res.cookie('login', name, {path: '/'}); //tentukan path agar cookie bisa digunakan di seluruh url
    res.send(`Hello ${name}`);
});

test('Test Cookie Read', async () => {
    const response = await request(app).get('/')
        .set('Cookie', 'name=ws;author=wahyu'); //gunakan ; untuk mengirim lebih dari 1 data cookie
    expect(response.text).toBe('Hello ws');
});

test('Test Cookie Write', async () => {
    const response = await request(app).post('/login')
        .send({name: 'ws'});
    expect(response.get('Set-Cookie').toString()).toBe('login=ws; Path=/'); //memastikan cookie yang didapat dari server sesuai
    expect(response.text).toBe('Hello ws');
});