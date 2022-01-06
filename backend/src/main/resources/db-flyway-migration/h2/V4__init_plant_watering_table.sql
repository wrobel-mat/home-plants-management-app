DROP TABLE IF EXISTS plant_watering CASCADE;
CREATE TABLE plant_watering
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    plant_id   INT REFERENCES plants (id) ON DELETE CASCADE,
    event_date BIGINT
);