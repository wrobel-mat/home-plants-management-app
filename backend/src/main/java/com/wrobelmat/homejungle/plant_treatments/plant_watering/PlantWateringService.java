package com.wrobelmat.homejungle.plant_treatments.plant_watering;

import org.springframework.stereotype.Service;

@Service
public class PlantWateringService {

    private final PlantWateringRepository repository;

    public PlantWateringService(PlantWateringRepository repository) {
        this.repository = repository;
    }

    public PlantWatering addPlantWatering(PlantWatering plantWatering) {
        return repository.save(plantWatering);
    }
}
