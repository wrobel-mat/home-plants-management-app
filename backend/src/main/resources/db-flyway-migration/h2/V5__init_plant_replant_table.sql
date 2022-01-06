DROP TABLE IF EXISTS plant_replant CASCADE;
CREATE TABLE plant_replant
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    plant_id   INT REFERENCES plants (id) ON DELETE CASCADE,
    event_date BIGINT,
    note       VARCHAR(200)
);