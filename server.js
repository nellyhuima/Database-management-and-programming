import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

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

//gets//

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

//posts//

app.post('/movie', async (req, res) => {
  const { movie_name, publishing_year, genre_id } = req.body;

  if (!movie_name || !publishing_year || !genre_id) {
    return res.status(400).send('All fields are required');
  }

  try {
    const result = await pgPool.query(
      'INSERT INTO movie (movie_name, publishing_year, genre_id) VALUES ($1, $2, $3) RETURNING *',
      [movie_name, publishing_year, genre_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting movie:', error.message);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
});

app.post('/users', async (req, res) => {
  const { name, username, password, year_of_birth } = req.body;

  if (!name || !username || !password || !year_of_birth) {
    return res.status(400).send('All fields are required');
  }

  try {

    const result = await pgPool.query(
      'INSERT INTO users (name, username, password, year_of_birth) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, username, password, year_of_birth]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting user:', error.message);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
});

app.post('/review', async (req, res) => {
  const { user_id, movie_id, stars, review_text } = req.body;

  if (!user_id || !movie_id || !stars || !review_text) {
    return res.status(400).send('All fields are required');
  }

  if (stars < 1 || stars > 5) {
    return res.status(400).send('Stars should be between 1 and 5');
  }

  try {
    const result = await pgPool.query(
      'INSERT INTO review (user_id, movie_id, stars, review_text) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, movie_id, stars, review_text]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting review:', error.message);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
});

app.post('/favorite', async (req, res) => {
  const { user_id, movie_id } = req.body;

  if (!user_id || !movie_id) {
    return res.status(400).send('Both user_id and movie_id are required');
  }

  try {
    const result = await pgPool.query(
      'INSERT INTO favorite (user_id, movie_id) VALUES ($1, $2) RETURNING *',
      [user_id, movie_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting favorite:', error.message);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
});

// Puts//

app.put('/movie/:movie_id', async (req, res) => {
  const movie_id = req.params.movie_id;
  const { movie_name, publishing_year, genre_id } = req.body;

  if (!movie_name || !publishing_year || !genre_id) {
    return res.status(400).send('All fields are required');
  }

  try {
    const result = await pgPool.query(
      'UPDATE movie SET movie_name = $1, publishing_year = $2, genre_id = $3 WHERE movie_id = $4 RETURNING *',
      [movie_name, publishing_year, genre_id, movie_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Movie not found');
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating movie:', error.message);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
});

app.put('/users/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  const { name, username, password, year_of_birth } = req.body;

  if (!name || !username || !password || !year_of_birth) {
    return res.status(400).send('All fields are required');
  }

  try {
    const result = await pgPool.query(
      'UPDATE users SET name = $1, username = $2, password = $3, year_of_birth = $4 WHERE user_id = $5 RETURNING *',
      [name, username, password, year_of_birth, user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('User not found');
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
});

app.put('/favorite/:favorite_id', async (req, res) => {
  const favorite_id = req.params.favorite_id;
  const { user_id, movie_id } = req.body;

  if (!user_id || !movie_id) {
    return res.status(400).send('User ID and Movie ID are required');
  }

  try {
    const result = await pgPool.query(
      'UPDATE favorite SET user_id = $1, movie_id = $2 WHERE favorite_id = $3 RETURNING *',
      [user_id, movie_id, favorite_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Favorite not found');
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating favorite:', error.message);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
});

app.put('/review/:review_id', async (req, res) => {
  const review_id = req.params.review_id;
  const { user_id, movie_id, stars, review_text } = req.body;

  if (!user_id || !movie_id || !stars || !review_text) {
    return res.status(400).send('All fields are required');
  }

  try {
    const result = await pgPool.query(
      'UPDATE review SET user_id = $1, movie_id = $2, stars = $3, review_text = $4 WHERE review_id = $5 RETURNING *',
      [user_id, movie_id, stars, review_text, review_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Review not found');
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating review:', error.message);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
});

//Deletes//
app.delete('/movie/:movie_id', async (req, res) => {
  const movie_id = req.params.movie_id;

  try {
    const result = await pgPool.query(
      'DELETE FROM movie WHERE movie_id = $1 RETURNING *',
      [movie_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Movie not found');
    }

    res.send('Movie deleted successfully');
  } catch (error) {
    console.error('Error deleting movie:', error.message);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
});

app.delete('/users/:user_id', async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const result = await pgPool.query(
      'DELETE FROM users WHERE user_id = $1 RETURNING *',
      [user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('User not found');
    }

    res.send('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
});

app.delete('/favorite/:favorite_id', async (req, res) => {
  const favorite_id = req.params.favorite_id;

  try {
    const result = await pgPool.query(
      'DELETE FROM favorite WHERE favorite_id = $1 RETURNING *',
      [favorite_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Favorite not found');
    }

    res.send('Favorite deleted successfully');
  } catch (error) {
    console.error('Error deleting favorite:', error.message);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
});

app.delete('/review/:review_id', async (req, res) => {
  const review_id = req.params.review_id;

  try {
    const result = await pgPool.query(
      'DELETE FROM review WHERE review_id = $1 RETURNING *',
      [review_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Review not found');
    }

    res.send('Review deleted successfully');
  } catch (error) {
    console.error('Error deleting review:', error.message);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
});