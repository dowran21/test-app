DROP DATABASE IF EXISTS to_do;

CREATE DATABASE to_do;

\c to_do;

CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    "name" VARCHAR(13),
    "password" VARCHAR (150)
);

CREATE TABLE to_do_list(
    id SERIAL PRIMARY KEY NOT NULL,
    "name" VARCHAR (150) NOT NULL,
    email VARCHAR (150) NOT NULL,
    "text" TEXT NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    status_id SMALLINT NOT NULL DEFAULT 1
);

