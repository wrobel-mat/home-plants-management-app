package com.wrobelmat.homejungle.plant_img;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.wrobelmat.homejungle.plant.Plant;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Calendar;

@Entity
@Table(name = "plant_img_details")
public class PlantImgDetails {

    @Id
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "uuid2")
    private String id;
    @ManyToOne
    @JoinColumn(nullable = false, name = "plant_id")
    @JsonBackReference
    private Plant plant;
    private Long dateCreated;
    @Size(max = 50, message = "Max length of image type is 50")
    @NotNull
    private String imgType;

    public PlantImgDetails(){}

    public PlantImgDetails(Plant plant, PlantImgType imgType) {
        this.plant = plant;
        this.imgType = imgType.toString();
        this.dateCreated = Calendar.getInstance().getTimeInMillis();
    }

    public Plant getPlant() {
        return plant;
    }

    public String getId() {
        return id;
    }

    public Long getDateCreated() {
        return dateCreated;
    }

    public void setPlant(Plant plant) {
        this.plant = plant;
    }

    public String getImgType() {
        return imgType;
    }

    public void setImgType(String imgType) {
        this.imgType = imgType;
    }
}
