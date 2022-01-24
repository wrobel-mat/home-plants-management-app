package com.wrobelmat.homejungle.plant_img;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SqlPlantImgDetailsRepository extends PlantImgDetailsRepository, JpaRepository<PlantImgDetails, String> {
}
