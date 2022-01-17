package com.wrobelmat.homejungle.plant_treatments.plant_replant;

import com.wrobelmat.homejungle.plant.Plant;
import com.wrobelmat.homejungle.plant_treatments.PlantTreatment;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "plant_replant")
public class PlantReplant extends PlantTreatment {

    @Size(max = 200, message = "Max length for note is 200")
    private String note;

    public PlantReplant() {
    }

    public PlantReplant(Plant plant, String note) {
        super(plant);
        this.note = note;
    }
}
