CREATE TABLE genre (
  genre_id INT PRIMARY KEY,
  genre_name VARCHAR(50) NOT NULL
);

CREATE TABLE movie (
    movie_id INT PRIMARY KEY,
    movie_name VARCHAR(50) NOT NULL,
    publishing_year INT,
    genre_id INT NOT NULL,
    Foreign Key (genre_id) REFERENCES genre(genre_id)
);

CREATE TABLE users (
    user_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    year_of_birth INT
);

CREATE TABLE review (
    review_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    Foreign Key (user_id) REFERENCES "user"(user_id),
    movie_id INT NOT NULL,
    Foreign Key (movie_id) REFERENCES movie(movie_id),
    stars INT CHECK (stars >=1 AND stars <= 5) NOT NULL,
    review_text TEXT NOT NULL
);

CREATE TABLE favorite (
    favorite_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    Foreign Key (user_id) REFERENCES "user"(user_id),
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
INSERT INTO movie (movie_id, movie_name, publishing_year, genre_id)
VALUES
    (1, 'Inception', 2010, 5),
    (2, 'The Terminator', 1984, 5),
    (3, 'Tropic Thunder', 2008, 2),
    (4, 'Borat', 2006, 2),
    (5, 'Interstellar', 2014, 1),
    (6, 'Joker', 2019, 1);

--test data for users--
INSERT INTO users (user_id, name, username, password, year_of_birth)
VALUES
    (1, 'Reima Riihimäki', 'reimarii', 'qwerty123', 1986),
    (2, 'Lisa Simpson', 'lizzy', 'abcdef', 1991),
    (3, 'Ben Bossy', 'boss', 'salasana', 1981);

--test data for reviews--
INSERT INTO review (user_id, movie_id, stars, review_text)
VALUES
    (1, 1, 5, 'Amazing movie!'),
    (2, 3, 4, 'A very inspirational movie.');

--test data for favorites--
INSERT INTO favorite (user_id, movie_id)
VALUES
    (1, 1),
    (2, 2);