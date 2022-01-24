package com.wrobelmat.homejungle.plant_img;

public interface PlantImgDetailsRepository {
    PlantImgDetails save(PlantImgDetails plantImgDetails);
    void deleteById(String id);
}
