package com.wrobelmat.homejungle.plant_treatments.plant_replant;

import org.springframework.stereotype.Service;

@Service
public class PlantReplantService {

    private final PlantReplantRepository repository;

    public PlantReplantService(PlantReplantRepository repository) {
        this.repository = repository;
    }

    public PlantReplant addPlantReplant(PlantReplant plantReplant) {
        return repository.save(plantReplant);
    }
}
