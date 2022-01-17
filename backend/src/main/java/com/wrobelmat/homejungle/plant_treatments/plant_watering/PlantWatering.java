package com.wrobelmat.homejungle.plant_treatments.plant_watering;

import com.wrobelmat.homejungle.plant.Plant;
import com.wrobelmat.homejungle.plant_treatments.PlantTreatment;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "plant_watering")
public class PlantWatering extends PlantTreatment {

    public PlantWatering() {}

    public PlantWatering(Plant plant) {
        super(plant);
    }
}
