package com.wrobelmat.homejungle.plant.projections;

import com.wrobelmat.homejungle.plant.Plant;
import com.wrobelmat.homejungle.plant.TempRange;
import com.wrobelmat.homejungle.user.User;
import com.wrobelmat.homejungle.validation.MinMaxRule;
import org.hibernate.validator.constraints.Range;

import javax.persistence.Embedded;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class PlantWriteModel {

    @NotEmpty(message = "Plant should have a name.")
    @Size(max = 50, message = "Max length for name is 50")
    private final String name;
    @Size(max = 50, message = "Max length for species is 50")
    private final String species;
    @Size(max = 50, message = "Max length for location is 50")
    private final String location;
    @Size(max = 200, message = "Max length for description is 200")
    private final String description;
    @Size(max = 50, message = "Max length for soilType is 50")
    private final String soilType;
    @Embedded
    @MinMaxRule
    private final TempRange tempRange;
    @Range(min = 0, max = 3, message = "Air humidity level should be between 0 and 3")
    private final int airHumidity;
    @Range(min = 0, max = 3, message = "Sunlight level should be between 0 and 3")
    private final int sunlight;
    @Range(min = 0, max = 3, message = "Watering level should be between 0 and 3")
    private final int watering;
    @Range(min = 0, max = 4, message = "Fertilizing frequency level should be between 0 and 4")
    private final int fertilizeFreq;
    private final boolean airPurification;
    private final boolean toxicity;

    public PlantWriteModel(String name, String species, String location,
                           String description, String soilType, TempRange tempRange,
                           int airHumidity, int sunlight, int watering,
                           int fertilizeFreq, boolean airPurification, boolean toxicity) {
        this.name = name;
        this.species = species;
        this.location = location;
        this.description = description;
        this.soilType = soilType;
        this.tempRange = tempRange;
        this.airHumidity = airHumidity;
        this.sunlight = sunlight;
        this.watering = watering;
        this.fertilizeFreq = fertilizeFreq;
        this.airPurification = airPurification;
        this.toxicity = toxicity;
    }

    public String getName() {
        return name;
    }

    public String getSpecies() {
        return species;
    }

    public String getLocation() {
        return location;
    }

    public String getDescription() {
        return description;
    }

    public String getSoilType() {
        return soilType;
    }

    public TempRange getTempRange() {
        return tempRange;
    }

    public int getAirHumidity() {
        return airHumidity;
    }

    public int getSunlight() {
        return sunlight;
    }

    public int getWatering() {
        return watering;
    }

    public int getFertilizeFreq() {
        return fertilizeFreq;
    }

    public boolean isAirPurification() {
        return airPurification;
    }

    public boolean isToxicity() {
        return toxicity;
    }

    public Plant toPlant(User user) {
        return new Plant(user, name, species, location,
                description, soilType, tempRange, airHumidity,
                sunlight, watering, fertilizeFreq,
                airPurification, toxicity);
    }
}
