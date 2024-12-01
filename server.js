import express from 'express';

const app = express();

app.listen(3001, () => {
    console.log('server running in port 3001');
});

app.get('/genre/:genre_id', (req, res) => { //path parameter
    const genreId = req.params.genre_id; // gets genre ID from the URL
    res.json({
        genre_id: genreId, // Fake response
        genre_name: "Action" // Dummy
    });
});

app.get('/movie/:movie_id', (req, res) => { //path parameter
    const movieId = req.params.movie_id;
    res.json({
        movie_id: movieId, //fake response
        movie_name: "title", //dummy
        publishing_year: 2002, //dummy
        genre: "action", //dummy, foreignKey
    });
});

app.get('/user/:user_id', (req, res) => { //path parameter
    const userId = req.params.user_id;
    res.json({
        user_id: userId,
        name: "Jane Doe", //dummy
        username: "JaneDoe", //dummy
        password: "monkey123", //dummy
        year_of_birth: 2000 //dummy
    });
});

app.get('/review/:review_id', (req, res) => { //path parameter
    const reviewId = req.params.review_id;
    res.json({
        review_id: reviewId,
        user_id: 3, //dummy, foreignKey
        movie_id: 7, //dummy, foreignKey
        stars: 3, //dummy
        review_text: "The movie was ok" //dummy
    });
});

app.get('/favorite/:favorite_id', (req, res) => { //path parameter
    const favoriteId = req.params.favorite_id;
    res.json({
        favorite_id: favoriteId,
        user_id: 3, //dummy, foreignKey
        movie_id: 9 //dummy, foreignKey
    })
});