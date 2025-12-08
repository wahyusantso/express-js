import express from 'express';

const app = express();

//simple routing
app.get('/', (req, res) => {
    res.send('First code express js.');
});

app.listen(3000, () => {
    console.info('Server started on port 3000');
});