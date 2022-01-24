DROP TABLE IF EXISTS plant_img_details CASCADE;
CREATE TABLE plant_img_details
(
    id              VARCHAR(36) PRIMARY KEY NOT NULL,
    plant_id        VARCHAR(36) REFERENCES plants (id) ON DELETE CASCADE,
    date_created    BIGINT,
    img_type        VARCHAR(50) NOT NULL
);