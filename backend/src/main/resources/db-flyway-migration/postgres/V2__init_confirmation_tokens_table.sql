DROP TABLE IF EXISTS confirmation_tokens CASCADE;
CREATE TABLE confirmation_tokens
(
    id                INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    token             VARCHAR(100) NOT NULL,
    date_created      TIMESTAMP,
    user_id           INT REFERENCES users (id) ON DELETE CASCADE,
    expiration_date   TIMESTAMP,
    confirmation_date TIMESTAMP
);