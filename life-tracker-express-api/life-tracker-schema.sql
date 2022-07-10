CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    first_name      TEXT NOT NULL,
    last_name       TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN EMAIL) > 1),
    password        TEXT NOT NULL,
    created_at       TIMESTAMP NOT NULL DEFAULT NOW()   
);