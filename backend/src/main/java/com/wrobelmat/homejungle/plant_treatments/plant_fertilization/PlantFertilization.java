package com.wrobelmat.homejungle.plant_treatments.plant_fertilization;

import com.wrobelmat.homejungle.plant.Plant;
import com.wrobelmat.homejungle.plant_treatments.PlantTreatment;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "plant_fertilization")
public class PlantFertilization extends PlantTreatment {

    @Size(max = 200, message = "Max length for note is 200")
    private String note;

    public PlantFertilization() {
    }

    public PlantFertilization(Plant plant, String note) {
        super(plant);
        this.note = note;
    }
}
