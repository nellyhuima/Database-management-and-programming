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

--test code--
select * from users;
