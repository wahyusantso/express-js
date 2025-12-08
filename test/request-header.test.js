import express from 'express';
import request from 'supertest';

const app = express();

//simple routing
app.get('/', (req, res) => {
    const type = req.get('accept'); //mendapatkan header, karena menggunakan get type penulisan tidak terlalu sensitif seperti header
    res.send(`response type: ${type}`);
});

test('Test Request header', async () => {
    const response = await request(app)
        .get('/')
        .set('Accept', 'text/plain'); //sisipkan type header
    expect(response.text).toBe('response type: text/plain');
});