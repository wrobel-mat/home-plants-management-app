package com.wrobelmat.homejungle.plant_img;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImgStorage {

    String saveImage(MultipartFile imgFile, String plantId, String imgName) throws IOException;
    void deleteImage(String imgURI);
}
