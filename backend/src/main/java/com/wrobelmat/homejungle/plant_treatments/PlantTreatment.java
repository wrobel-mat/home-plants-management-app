package com.wrobelmat.homejungle.plant_treatments;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.wrobelmat.homejungle.plant.Plant;

import javax.persistence.*;
import java.util.Calendar;

@MappedSuperclass
public abstract class PlantTreatment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false, name = "plant_id")
    @JsonBackReference
    private Plant plant;

    private Long eventDate;

    public Long getId() {
        return id;
    }

    public Plant getPlant() {
        return plant;
    }

    public long getEventDate() {
        return eventDate;
    }

    protected PlantTreatment(Plant plant) {
        this.plant = plant;
        this.eventDate = Calendar.getInstance().getTimeInMillis();
    }

    protected PlantTreatment() {
    }

    @Override
    public String toString() {
        return String.format("PlantEvent: %s, id: %d, plant_id: %d, timestamp: %d", this.getClass().getSimpleName(), this.id, this.plant.getId(), this.eventDate);
    }
}
