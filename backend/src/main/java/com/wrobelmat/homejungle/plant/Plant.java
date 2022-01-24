package com.wrobelmat.homejungle.plant;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.wrobelmat.homejungle.plant_img.PlantImgDetails;
import com.wrobelmat.homejungle.plant_treatments.plant_fertilization.PlantFertilization;
import com.wrobelmat.homejungle.plant_treatments.plant_replant.PlantReplant;
import com.wrobelmat.homejungle.plant_treatments.plant_watering.PlantWatering;
import com.wrobelmat.homejungle.user.User;
import com.wrobelmat.homejungle.validation.MinMaxRule;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.Range;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.Calendar;
import java.util.List;

@Entity
@Table(name = "plants")
@EntityListeners(AuditingEntityListener.class)
public class Plant {

    @Id
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "uuid2")
    @Column(length = 36, nullable = false, updatable = false)
    private String id;
    @ManyToOne
    @JoinColumn(nullable = false, name = "user_id")
    @JsonBackReference
    private User user;
    @NotEmpty(message = "Plant should have a name.")
    @Size(max = 50, message = "Max length for name is 50")
    private String name;
    @Size(max = 50, message = "Max length for species is 50")
    private String species;
    @Size(max = 50, message = "Max length for location is 50")
    private String location;
    @Size(max = 200, message = "Max length for description is 200")
    private String description;
    @Size(max = 50, message = "Max length for soilType is 50")
    private String soilType;
    @Embedded
    @MinMaxRule
    private TempRange tempRange;
    @Range(min = 0, max = 3, message = "Air humidity level should be between 0 and 3")
    private int airHumidity;
    @Range(min = 0, max = 3, message = "Sunlight level should be between 0 and 3")
    private int sunlight;
    @Range(min = 0, max = 3, message = "Watering level should be between 0 and 3")
    private int watering;
    @Range(min = 0, max = 4, message = "Fertilizing frequency level should be between 0 and 4")
    private int fertilizeFreq;
    private boolean airPurification;
    private boolean toxicity;
    private Long dateCreated;
    @OneToMany(orphanRemoval = true, mappedBy = "plant")
    @JsonManagedReference
    private List<PlantImgDetails> plantImgDetailsList;
    @OneToMany(orphanRemoval = true, mappedBy = "plant")
    @JsonManagedReference
    private List<PlantWatering> plantWateringTreatments;
    @OneToMany(orphanRemoval = true, mappedBy = "plant")
    @JsonManagedReference
    private List<PlantReplant> plantReplantTreatments;
    @OneToMany(orphanRemoval = true, mappedBy = "plant")
    @JsonManagedReference
    private List<PlantFertilization> plantFertilizationTreatments;

    public Plant() {
    }

    public Plant(User user, String name, String species,
                 String location, String description, String soilType,
                 TempRange tempRange, int airHumidity, int sunlight, int watering,
                 int fertilizeFreq, boolean airPurification, boolean toxicity) {
        this.user = user;
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
        this.dateCreated = Calendar.getInstance().getTimeInMillis();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String type) {
        this.species = type;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String origin) {
        this.location = origin;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSoilType() {
        return soilType;
    }

    public void setSoilType(String soilType) {
        this.soilType = soilType;
    }

    public TempRange getTempRange() {
        return tempRange;
    }

    public void setTempRange(TempRange tempRange) {
        this.tempRange = tempRange;
    }

    public int getAirHumidity() {
        return airHumidity;
    }

    public void setAirHumidity(int airHumidity) {
        this.airHumidity = airHumidity;
    }

    public int getSunlight() {
        return sunlight;
    }

    public void setSunlight(int sunlight) {
        this.sunlight = sunlight;
    }

    public int getWatering() {
        return watering;
    }

    public void setWatering(int watering) {
        this.watering = watering;
    }

    public int getFertilizeFreq() {
        return fertilizeFreq;
    }

    public void setFertilizeFreq(int fertilizeFreq) {
        this.fertilizeFreq = fertilizeFreq;
    }

    public boolean isAirPurification() {
        return airPurification;
    }

    public void setAirPurification(boolean airPurification) {
        this.airPurification = airPurification;
    }

    public boolean isToxicity() {
        return toxicity;
    }

    public void setToxicity(boolean toxicity) {
        this.toxicity = toxicity;
    }

    public long getDateCreated() {
        return dateCreated;
    }

    public List<PlantImgDetails> getPlantImgDetailsList() {
        return plantImgDetailsList;
    }

    public List<PlantWatering> getPlantWateringTreatments() {
        return plantWateringTreatments;
    }

    public List<PlantReplant> getPlantReplantTreatments() {
        return plantReplantTreatments;
    }

    public List<PlantFertilization> getPlantFertilizationTreatments() {
        return plantFertilizationTreatments;
    }

    @Override
    public String toString() {
        return String.format(
                "Plant: %s, id: %s, user_id: %s, watering_treatments: %s, transplant_treatments: %s",
                this.name, this.id, this.user.getId(),
                this.plantWateringTreatments.toString(),
                this.plantReplantTreatments.toString());
    }
}
