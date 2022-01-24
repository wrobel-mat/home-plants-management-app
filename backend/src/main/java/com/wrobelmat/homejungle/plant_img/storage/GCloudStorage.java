package com.wrobelmat.homejungle.plant_img.storage;


import com.google.cloud.storage.*;
import com.wrobelmat.homejungle.plant_img.PlantImgDetails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

@Component
public class GCloudStorage implements ImgStorage {

    @Value("${app.gcloud.project-id}")
    private String projectId;
    @Value("${app.gcloud.bucket-name}")
    private String bucketName;
    @Value("${app.gcloud.sign-url-duration-days}")
    private Integer signUrlDurationDays;

    private final Storage storage;

    public GCloudStorage() {
        storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();
    }

    @Override
    public String saveImage(MultipartFile imgFile, PlantImgDetails persistedImg) throws IOException {
        String blobName = getBlobName(persistedImg);
        BlobId blobId = BlobId.of(bucketName, blobName);
        String contentType = getContentType(Objects.requireNonNull(imgFile.getOriginalFilename()));
        BlobInfo blobInfo =
                BlobInfo
                        .newBuilder(blobId)
                        .setContentType(contentType)
                        .build();
        Blob imgBlob = storage.createFrom(blobInfo, imgFile.getInputStream());
        return imgBlob.signUrl(signUrlDurationDays, TimeUnit.DAYS).toString();
    }

    @Override
    public void deleteImage(PlantImgDetails plantImgDetails) {
        String blobName = getBlobName(plantImgDetails);
        storage.delete(bucketName, blobName);
    }

    @Override
    public String getImgUri(PlantImgDetails plantImgDetails) {
        String blobName = getBlobName(plantImgDetails);
        BlobId blobId = BlobId.of(bucketName, blobName);
        Blob imgBlob = storage.get(blobId);
        return imgBlob.signUrl(signUrlDurationDays, TimeUnit.DAYS).toString();
    }

    private String getBlobName(PlantImgDetails plantImgDetails) {
        return plantImgDetails.getPlant().getId() + "/" + plantImgDetails.getId();
    }

    private String getContentType(String imgName) {
        if (imgName.endsWith("jpeg") || imgName.endsWith("jpg")) {
            return "image/jpeg";
        } else if (imgName.endsWith("png")) {
            return "image/png";
        }
        return "";
    }
}
