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

    try {
      const result = await pgPool.query('SELECT * FROM genre');

      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching genres:', error.message);
      res.status(500).send(`Internal server error: ${error.message}`);
    }
});

app.get('/movie', async (req, res)=> {
  const { genre_id } = req.query;

  try {
    let queryText = 'SELECT * FROM movie';
    const queryParams = [];

    if (genre_id) {
      queryText += ' WHERE genre_id = $1';
      queryParams.push(genre_id);
    }

    const result = await pgPool.query(queryText, queryParams);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
});

   /*vanha koodi
   const result = await pgPool.query('SELECT * FROM movie');

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
});*/

app.get('/users', async (req, res) => {
  const { user_id } = req.query; // Accept user_id as a query parameter
  
  try {
    let queryText = 'SELECT * FROM users';
    const queryParams = [];

    if (user_id) {
      queryText += ' WHERE user_id = $1';
      queryParams.push(user_id);
    }

    const result = await pgPool.query(queryText, queryParams);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
});

/*vanha koodi
app.get('/users', async (req, res)=> {
  try {
    const result = await pgPool.query('SELECT * FROM users');

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
});*/

app.get('/review', async (req, res)=> {
  try {
    const result = await pgPool.query('SELECT * FROM review');

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
});

app.get('/favorite', async (req, res)=> {
  try {
    const result = await pgPool.query('SELECT * FROM favorite');

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching favorites:', error.message);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
});