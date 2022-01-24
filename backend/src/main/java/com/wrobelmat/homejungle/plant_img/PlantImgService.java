package com.wrobelmat.homejungle.plant_img;

import com.wrobelmat.homejungle.exceptions.plant.PlantImgSaveException;
import com.wrobelmat.homejungle.plant_img.storage.GCloudStorage;
import com.wrobelmat.homejungle.plant_img.storage.ImgStorage;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class PlantImgService {

    private final ImgStorage imgStorage;
    private final PlantImgDetailsRepository plantImgDetailsRepository;

    public PlantImgService(GCloudStorage imgStorage,
                           PlantImgDetailsRepository plantImgDetailsRepository) {
        this.imgStorage = imgStorage;
        this.plantImgDetailsRepository = plantImgDetailsRepository;
    }

    public String saveImage(MultipartFile imgFile, PlantImgDetails plantImgDetails) {
        if (imgFile != null && !imgFile.isEmpty()) {
            PlantImgDetails persistedImgDetails = plantImgDetailsRepository.save(plantImgDetails);
            try {
                return imgStorage.saveImage(imgFile, persistedImgDetails);
            } catch (IOException e) {
                plantImgDetailsRepository.deleteById(persistedImgDetails.getId());
                throw new PlantImgSaveException();
            }
        }
        return "";
    }

    public void deleteImage(PlantImgDetails plantImgDetails) {
        plantImgDetailsRepository.deleteById(plantImgDetails.getId());
        imgStorage.deleteImage(plantImgDetails);
    }

    public void deleteAllPlantImages(List<PlantImgDetails> plantImgDetailsList) {
        plantImgDetailsList.forEach(plantImgDetails -> {
            imgStorage.deleteImage(plantImgDetails);
            plantImgDetailsRepository.deleteById(plantImgDetails.getId());
        });
    }

    public String getImgUri(PlantImgDetails plantImgDetails) {
        return imgStorage.getImgUri(plantImgDetails);
    }
}
