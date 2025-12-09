import express from 'express';
import request from 'supertest';

const app = express();

const logger = (req, res, next) => {
    //middleware ini akan menampilkan log http method yang digunakan dan full url yang diakses.
    console.info(`Receive request: ${req.method} : ${req.originalUrl}`);
    next();
};

const addPoweredHeader = (req, res, next) => {
    //middleware ini akan menambahkan header pada response.
    res.set('X-Powered-By', 'Me');
    next();
};

const apiKeyMiddleware = (req, res, next) => {
    if(req.query.apiKey) { //jika diparameter terdapat apiKey maka lanjutkan requestnya
        next();
    } else {
        return res.status(401).end();
    }
}

const requestTimeMiddleware = (req, res, next) => {
    //manipulasi object yang dikirim melalui request, untuk digunakan ke middleware/response selanjutnya
    req.requestTime = Date.now(); //sebelumnya data ini tidak ada.
    next();
};

//gunakan middleware seperti dibawah ini, agar middleware berjalan berurutan
app.use(logger);
app.use(apiKeyMiddleware);
app.use(addPoweredHeader);
app.use(requestTimeMiddleware);


//simple routing
app.get('/', (req, res) => {
    res.send('Hello response!');
});

app.get('/product', (req, res) => {
    res.send('new Product');
});

app.get('/today', (req, res) => {
    const time = req.requestTime;
    res.send(`Hello, Today is ${time}`);
});

test('Test Response Middleware', async () => {
    const response = await request(app).get('/').query({apiKey: 'djao121kapd'});
    expect(response.get('X-Powered-By')).toBe('Me'); //memastikan response sudah ditambahkan header melalui middleware.
    expect(response.text).toBe('Hello response!');
});

//karena kita gunakan middleware secara global, maka url yang lainnya juga sama middlewarenya.
test('Test Response Middleware 2', async () => {
    const response = await request(app).get('/product').query({apiKey: 'djao121kapd'});
    expect(response.get('X-Powered-By')).toBe('Me');
    expect(response.text).toBe('new Product');
});

test('Test Response Middleware Unauthorized', async () => {
    const response = await request(app).get('/product');
    expect(response.status).toBe(401); //status harus 401, karena tidak mengirim query di request.
});

test('Test Response Middleware Time', async () => {
    const response = await request(app).get('/today').query({apiKey: 'djao121kapd'});
    expect(response.get('X-Powered-By')).toBe('Me');
    expect(response.text).toContain('Hello, Today is');//ekspektasi seperti ini karena time selalu berubah
});