package com.wrobelmat.homejungle.plant.projections;

import com.wrobelmat.homejungle.plant.Plant;
import com.wrobelmat.homejungle.user.User;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class AddPlantForm {

    @NotEmpty(message = "Plant should have a name.")
    @Size(max = 50, message = "Max length for name is 50")
    private final String name;
    @Size(max = 50, message = "Max length for species is 50")
    private final String species;

    public AddPlantForm(String name, String species) {
        this.name = name;
        this.species = species;
    }

    public String getName() {
        return name;
    }

    public String getSpecies() {
        return species;
    }

    public Plant toPlant(User user) {
        Plant plant = new Plant(user, name, species);
        return plant;
    }
}
