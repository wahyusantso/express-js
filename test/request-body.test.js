import express, { json } from 'express';
import request from 'supertest';
import expressFileUpload from 'express-fileupload';

const app = express();
app.use(express.json()); //menggunakan built-in middleware untuk konversi data body ke json.
app.use(express.urlencoded({extended: false})); //konversi ke form, set ke false supaya tidak membaca data dari query parameter
app.use(expressFileUpload()); //tambahkan lib file upload

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

app.post('/file', async (req, res) => {
    //untuk mendapatkan file yang dikirim. gunakan files bukan body dan pastikan key sesuai dengan yang di kirim (article).
    const file = req.files.article;
    await file.mv(__dirname + '/upload/' + file.name); //set lokasi file disimpan. menggunakan await karena return promise.

    res.send(`File ${file.name} Uploaded by user ${req.body.name}`);
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

test('Test Request File', async () => {
    const response = await request(app)
        .post('/file')
        .set('Content-Type', 'multipart/form-data') //header untuk upload file
        .field('name', 'Andrew') //sisipkan data ke body
        .attach('article', __dirname + '/contoh.txt');//file yang dikirim
        
    expect(response.text).toBe('File contoh.txt Uploaded by user Andrew');
});