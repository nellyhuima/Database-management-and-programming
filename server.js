import express from 'express';

const app = express();

app.listen(3001, () => {
    console.log('server running in port 3001');
});

app.get('/genre', (req, res) => {
    res.send('This is genre page')
});

app.get('/movie', (req, res) => {
});

app.get('/review', (req, res) => {
});

app.get('/user', (req, res) => {
});

app.get('/favorite', (req, res) => {
});