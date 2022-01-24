package com.wrobelmat.homejungle.plant.projections;

import com.wrobelmat.homejungle.plant.Plant;
import com.wrobelmat.homejungle.plant_treatments.plant_fertilization.PlantFertilization;
import com.wrobelmat.homejungle.plant_treatments.plant_replant.PlantReplant;
import com.wrobelmat.homejungle.plant_treatments.plant_watering.PlantWatering;

public class PlantReadModel {

    private final String id;
    private final String name;
    private final String species;
    private final String location;
    private final String description;
    private final String soilType;
    private final int minTemp;
    private final int maxTemp;
    private final int airHumidity;
    private final int sunlight;
    private final int watering;
    private final int fertilizeFreq;
    private final boolean airPurification;
    private final boolean toxicity;
    private final Long dateCreated;
    private String mainImgUri;
    private PlantWatering lastWatering;
    private PlantReplant lastReplant;
    private PlantFertilization lastFertilization;

    public PlantReadModel(Plant plant) {
        this.id = plant.getId();
        this.name = plant.getName();
        this.species = plant.getSpecies();
        this.location = plant.getLocation();
        this.description = plant.getDescription();
        this.soilType = plant.getSoilType();
        this.minTemp = plant.getTempRange() != null ? plant.getTempRange().getMinTemp() : 0;
        this.maxTemp = plant.getTempRange() != null ? plant.getTempRange().getMaxTemp() : 0;
        this.airHumidity = plant.getAirHumidity();
        this.sunlight = plant.getSunlight();
        this.watering = plant.getWatering();
        this.fertilizeFreq = plant.getFertilizeFreq();
        this.airPurification = plant.isAirPurification();
        this.toxicity = plant.isToxicity();
        this.dateCreated = plant.getDateCreated();
    }

    public String getId() {
        return id;
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

    public int getMinTemp() {
        return minTemp;
    }

    public int getMaxTemp() {
        return maxTemp;
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

    public Long getDateCreated() {
        return dateCreated;
    }

    public String getMainImgUri() {
        return mainImgUri;
    }

    public PlantWatering getLastWatering() {
        return lastWatering;
    }

    public PlantReplant getLastReplant() {
        return lastReplant;
    }

    public PlantFertilization getLastFertilization() {
        return lastFertilization;
    }

    public void setMainImgUri(String mainImgUri) {
        this.mainImgUri = mainImgUri;
    }

    public void setLastWatering(PlantWatering lastWatering) {
        this.lastWatering = lastWatering;
    }

    public void setLastReplant(PlantReplant lastReplant) {
        this.lastReplant = lastReplant;
    }

    public void setLastFertilization(PlantFertilization lastFertilization) {
        this.lastFertilization = lastFertilization;
    }
}
