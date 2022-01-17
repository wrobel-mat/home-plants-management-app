DROP TABLE IF EXISTS plants CASCADE;
CREATE TABLE plants
(
    id               VARCHAR(36) PRIMARY KEY NOT NULL,
    user_id          VARCHAR(36) REFERENCES users (id) ON DELETE CASCADE,
    name             VARCHAR(50) NOT NULL,
    species          VARCHAR(50),
    location         VARCHAR(50),
    description      VARCHAR(200),
    soil_type        VARCHAR(50),
    min_temp         INT,
    max_temp         INT,
    air_humidity     INT,
    sunlight         INT,
    watering         INT,
    fertilize_freq   INT,
    air_purification BOOLEAN,
    toxicity         BOOLEAN,
    date_created     BIGINT,
    img_uri          VARCHAR(300)
);