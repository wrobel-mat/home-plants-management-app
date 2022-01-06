DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users
(
    id           INT PRIMARY KEY AUTO_INCREMENT,
    email        VARCHAR(100) NOT NULL,
    password     VARCHAR(100) NOT NULL,
    name         VARCHAR(100) NOT NULL,
    enabled      BOOLEAN,
    locked       BOOLEAN,
    date_created BIGINT,
    role         VARCHAR(50)
);