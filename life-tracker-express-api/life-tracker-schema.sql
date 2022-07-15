CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    first_name      TEXT NOT NULL,
    last_name       TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN EMAIL) > 1),
    username        TEXT NOT NULL UNIQUE,
    password        TEXT NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE exercises (
    id              SERIAL PRIMARY KEY,
    username        TEXT NOT NULL REFERENCES users (username) ON DELETE CASCADE,
    name            TEXT NOT NULL, 
    category        TEXT NOT NULL,
    duration        INTEGER NOT NULL,
    intensity       INTEGER NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE nutrition (
    id              SERIAL PRIMARY KEY,
    username        TEXT NOT NULL REFERENCES users (username) ON DELETE CASCADE,
    name            TEXT NOT NULL, 
    category        TEXT NOT NULL,
    quantity        INTEGER NOT NULL,
    calories        INTEGER NOT NULL,
    image_url       TEXT NOT NULL DEFAULT "https://us.123rf.com/450wm/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016/167492439-no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-comin.jpg?ver=6",
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE sleep (
    id              SERIAL PRIMARY KEY,
    username        TEXT NOT NULL REFERENCES users (username) ON DELETE CASCADE,
    start_time      TIMESTAMP NOT NULL DEFAULT NOW(),
    end_time        TIMESTAMP NOT NULL DEFAULT NOW()
);