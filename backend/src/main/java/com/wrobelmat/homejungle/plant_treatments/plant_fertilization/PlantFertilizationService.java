package com.wrobelmat.homejungle.plant_treatments.plant_fertilization;

import org.springframework.stereotype.Service;

@Service
public class PlantFertilizationService {

    private final PlantFertilizationRepository repository;


    public PlantFertilizationService(PlantFertilizationRepository repository) {
        this.repository = repository;
    }

    public PlantFertilization addPlantFertilization(PlantFertilization plantFertilization) {
        return repository.save(plantFertilization);
    }
}
