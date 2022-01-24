package com.wrobelmat.homejungle.plant_img.storage;

import com.wrobelmat.homejungle.plant_img.PlantImgDetails;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImgStorage {

    String saveImage(MultipartFile imgFile, PlantImgDetails persistedImg) throws IOException;
    void deleteImage(PlantImgDetails plantImgDetails);
    String getImgUri(PlantImgDetails plantImgDetails);
}
