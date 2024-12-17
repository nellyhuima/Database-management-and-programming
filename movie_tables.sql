CREATE TABLE genre (
  genre_id INT PRIMARY KEY,
  genre_name VARCHAR(50) NOT NULL
);

CREATE TABLE movie (
    movie_id SERIAL PRIMARY KEY,
    movie_name VARCHAR(50) NOT NULL,
    publishing_year INT,
    genre_id INT NOT NULL,
    Foreign Key (genre_id) REFERENCES genre(genre_id)
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    year_of_birth INT
);

CREATE TABLE review (
    review_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    Foreign Key (user_id) REFERENCES users(user_id),
    movie_id INT NOT NULL,
    Foreign Key (movie_id) REFERENCES movie(movie_id),
    stars INT CHECK (stars >=1 AND stars <= 5) NOT NULL,
    review_text TEXT NOT NULL
);

CREATE TABLE favorite (
    favorite_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    Foreign Key (user_id) REFERENCES users(user_id),
    movie_id INT NOT NULL,
    Foreign Key (movie_id) REFERENCES movie(movie_id)
);

--test data for genre--
INSERT INTO genre (genre_id, genre_name)
VALUES
    (1, 'Drama'),
    (2, 'Comedy'),
    (3, 'Sci-Fi'),
    (4, 'Fantasy'),
    (5, 'Action'),
    (6, 'Thriller');

--test data for movies--
INSERT INTO movie (movie_name, publishing_year, genre_id)
VALUES
    ('Inception', 2010, 5),
    ('The Terminator', 1984, 5),
    ('Tropic Thunder', 2008, 2),
    ('Borat', 2006, 2),
    ('Interstellar', 2014, 1),
    ('Joker', 2019, 1);

--test data for users--
INSERT INTO users (name, username, password, year_of_birth)
VALUES
    ('Reima Riihimäki', 'reimarii', 'qwerty123', 1986),
    ('Lisa Simpson', 'lizzy', 'abcdef', 1991),
    ('Ben Bossy', 'boss', 'salasana', 1981);

--test data for reviews--
INSERT INTO review (user_id, movie_id, stars, review_text)
VALUES
    (5, 10, 5, 'Amazing movie!'),
    (4, 13, 4, 'A very inspirational movie.');

--test data for favorites--
INSERT INTO favorite (user_id, movie_id)
VALUES
    (4, 10),
    (5, 15);