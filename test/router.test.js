import express from 'express';
import request from 'supertest';

const app = express();
const router = express.Router();

//membuat middleware dari router
router.use((req, res, next) => {
    console.info(`Receive request to: ${req.originalUrl}`);
    next();
});

//membuat routing
router.get('/feature/product', (req, res) => {
    res.send('Feature product');
});

test('Test Router Disabled', async () => {
    let response = await request(app).get('/feature/product');
    expect(response.status).toBe(404); //mengembalikan status 404 karena router belum ditambahkan ke app.
});

test('Test Router Enabled', async () => {
    app.use(router); //menambahkan router ke app.
    let response = await request(app).get('/feature/product');
    expect(response.text).toBe('Feature product');
});