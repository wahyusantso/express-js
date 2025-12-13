import express from 'express';
import request from 'supertest';
import mustacheExpress from 'mustache-express';

const app = express();

//gunakan template engine jika ingin mengembalikan response berupa html

app.set('views', __dirname + '/views'); //menetapkan lokasi folder template
app.set('view engine', 'html'); //menentukan tipe template
app.engine('html', mustacheExpress()); //proses jika tipe templatenya html

//simple routing
app.get('/', (req, res) => {
    //parsing data ke template html
    res.render('index', { //index merupakan nama file yang dituju
        title: 'Hello Javasctipt',
        say: 'Good Day!'
    });
});

test('Test Template Engine', async () => {
    const response = await request(app).get('/');
    console.info(response.text);
    expect(response.text).toContain('Hello Javasctipt');
    expect(response.text).toContain('Good Day!');
});