import express from 'express';
import request from 'supertest';

const app = express();

//menyisipkan data pada parameter
app.get('/category/:product', (req, res) => {
    const category = req.params.product; //sesuaikan dengan nama parameter
    res.send(`Category product ${category}`);
});

//route dibawah ini sudah tidak di dukung di Express 5
// app.get('/quantity/:qty(\\d+)', (req, res) => { //harus integer
//     const quantity = req.params.qty;
//     res.send(`Quantity stock ${quantity}`);
// });

test('Test Route Parameter', async () => {
    let response = await request(app).get('/category/book');
    expect(response.text).toBe('Category product book');
});