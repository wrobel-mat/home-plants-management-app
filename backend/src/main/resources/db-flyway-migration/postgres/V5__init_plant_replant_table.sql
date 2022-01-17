DROP TABLE IF EXISTS plant_replant CASCADE;
CREATE TABLE plant_replant
(
    id         INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    plant_id   VARCHAR(36) REFERENCES plants (id) ON DELETE CASCADE,
    event_date BIGINT,
    note       VARCHAR(200)
);