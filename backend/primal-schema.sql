CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    favorites VARCHAR[]
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    target TEXT NOT NULL,
    secondary TEXT[],
    gif TEXT
    instructions TEXT[]
);