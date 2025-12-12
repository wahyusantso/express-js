import cookieParser from 'cookie-parser';
import express from 'express';
import request from 'supertest';

const app = express();
//menggunakan cookie pada middleware
//set key untuk signed cookie
app.use(cookieParser('inirahasia')); 
app.use(express.json());

//simple routing
app.get('/', (req, res) => {
    const name = req.signedCookies['login']; //ambil data cookie yang sudah di signed
    res.send(`Hello ${name}`);
});

//membuat cookie dari sisi server, agar dapat digunakan client saat request.
app.post('/login', (req, res) => {
    const name = req.body.name;
    //tentukan path agar cookie bisa digunakan di seluruh url
    //tambahkan signed pada cookie agar tidak bisa diedit di browser/client pada value cookie
    res.cookie('login', name, {path: '/', signed: true}); 
    res.send(`Hello ${name}`);
});

test('Test Cookie Read', async () => {
    const response = await request(app).get('/')
        .set('Cookie', 'login=s%3Aws.gMTPpOaDes0DTUOLsfVL5%2BV2tB7ivJmD5HivI1IjOQI; Path=/'); //kirim cookie yang sudah di signed, bisanya tersimpan di browser
    expect(response.text).toBe('Hello ws');
});

test('Test Cookie Write', async () => {
    const response = await request(app).post('/login')
        .send({name: 'ws'});

    console.info(response.get('Set-Cookie'));
    expect(response.get('Set-Cookie').toString()).toContain('ws');
    expect(response.text).toBe('Hello ws');
});