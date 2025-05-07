CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user'
);

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    poster_url TEXT,
    genre VARCHAR(50)
);

CREATE TABLE showtimes (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
    show_date DATE NOT NULL,
    show_time TIME NOT NULL,
    capacity INTEGER NOT NULL
);

CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    showtime_id INTEGER REFERENCES showtimes(id) ON DELETE CASCADE,
    seat_id INTEGER REFERENCSE seats(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'active'
);

CREATE TABLE seats (
    id SERIAL PRIMARY KEY,
    showtime_id INTEGER REFERENCES showtimes(id) ON DELETE CASCADE,
    seat_number VARCHAR(10),
    is_reserved BOOLEAN DEFAULT FALSE
);