package com.wrobelmat.homejungle.plant_treatments.plant_watering;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
interface SqlPlantWateringRepository extends PlantWateringRepository, JpaRepository<PlantWatering, Long> {
}
