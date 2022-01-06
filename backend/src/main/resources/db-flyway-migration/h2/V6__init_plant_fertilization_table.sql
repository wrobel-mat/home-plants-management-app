DROP TABLE IF EXISTS plant_transplant CASCADE;
CREATE TABLE plant_fertilization
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    plant_id   INT REFERENCES plants (id) ON DELETE CASCADE,
    event_date BIGINT,
    note       VARCHAR(200)
);