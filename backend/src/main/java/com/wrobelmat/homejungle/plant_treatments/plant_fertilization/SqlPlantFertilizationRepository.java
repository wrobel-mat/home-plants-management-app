package com.wrobelmat.homejungle.plant_treatments.plant_fertilization;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
interface SqlPlantFertilizationRepository extends PlantFertilizationRepository, JpaRepository<PlantFertilization, Long> {
}
