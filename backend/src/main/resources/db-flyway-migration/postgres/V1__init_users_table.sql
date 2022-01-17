DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users
(
    id           VARCHAR(36) PRIMARY KEY NOT NULL,
    email        VARCHAR(100) NOT NULL,
    password     VARCHAR(100) NOT NULL,
    name         VARCHAR(100) NOT NULL,
    enabled      BOOLEAN,
    locked       BOOLEAN,
    date_created BIGINT,
    role         VARCHAR(50)
);