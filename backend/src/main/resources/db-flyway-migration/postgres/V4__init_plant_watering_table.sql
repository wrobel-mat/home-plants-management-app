DROP TABLE IF EXISTS plant_watering CASCADE;
CREATE TABLE plant_watering
(
    id         INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    plant_id   VARCHAR(36) REFERENCES plants (id) ON DELETE CASCADE,
    event_date BIGINT
);