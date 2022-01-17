package com.wrobelmat.homejungle.plant_treatments.plant_replant;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
interface SqlPlantReplantRepository extends PlantReplantRepository, JpaRepository<PlantReplant, Long> {
}
