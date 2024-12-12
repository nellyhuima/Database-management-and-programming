import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.listen(port, ()=>{
    console.log(`server running in port ${port}`) //console.log if wanting to write something in terminal
});

const pgPool = new pg.Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

export {pgPool};



app.get('/', (req, res)=> res.send("Hello world!")); //res.send if wanting to write something on the page.

app.get('/genre', async (req, res)=> {
  res.send("genres go here!");
    try {
      const result = await pgPool.query('SELECT * FROM genre');

      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching genres:', error.message);
      res.status(500).send(`Internal server error: ${error.message}`);
    }
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