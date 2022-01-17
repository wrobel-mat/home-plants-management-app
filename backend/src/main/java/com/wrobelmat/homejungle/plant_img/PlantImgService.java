package com.wrobelmat.homejungle.plant_img;

import com.wrobelmat.homejungle.exceptions.plant.PlantImgSaveException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class PlantImgService {

    private final String mainImgPrefix = "_main_img_";
    private final ImgStorage imgStorage;

    public PlantImgService(GCloudStorage imgStorage) {
        this.imgStorage = imgStorage;
    }

    public String saveImage(MultipartFile plantImg, String plantId) {
        if (plantImg == null || plantImg.isEmpty()) return "";
        String imgFileExtension = getExtension(plantImg.getOriginalFilename());
        String imgName = getImgName(imgFileExtension);
        try {
            return imgStorage.saveImage(plantImg, plantId, imgName);
        } catch (IOException e) {
            throw new PlantImgSaveException();
        }
    }

    public void deleteImage(String imgUri) {
        imgStorage.deleteImage(imgUri);
    }

    private String getExtension(String originalFilename) {
        return originalFilename.substring(originalFilename.lastIndexOf("."));
    }

    private String getImgName(String imgFileExtension) {
        return mainImgPrefix + UUID.randomUUID() + imgFileExtension;
    }
}
