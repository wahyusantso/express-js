import express from 'express';
import request from 'supertest';

const app = express();

//simple routing
app.get('/', (req, res) => {
    res.set({ //mengembalikan response berupa data header
        'X-Powered-By': 'Me',
        'X-Author': 'Codeer'
    });
    res.send('Hello response!');
});

test('Test Response', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Hello response!');

    expect(response.get('X-Powered-By')).toBe('Me');
    expect(response.get('X-Author')).toBe('Codeer');//memastikan nilai header sesuai
});