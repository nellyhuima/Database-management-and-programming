import express from 'express';
const app = express();

const port = process.env.PORT || 3001;





const { Client } = require('pg');

// Creating a new PostgreSQL client
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '',
  database: '-Database-management-and-programming'
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Connected to the PostgreSQL database');
  }
});





app.listen(port, ()=>{
    console.log(`server running in port ${port}`) //console.log if wanting to write something in terminal
});

app.get('/', (req, res)=> res.send("Hello world!")); //res.send if wanting to write something on the page

app.get('/genre', (req, res)=> {
    res.send("genres go here!");
    res.send()
});

app.get('/movie', (req, res)=> {
    res.send("movies go here!");
});

app.get('/users', (req, res)=> {
    res.send("users go here!");
});

app.get('/review', (req, res)=> {
    res.send("reviews go here!");
});

app.get('/favorite', (req, res)=> {
    res.send("favorites go here!");
});