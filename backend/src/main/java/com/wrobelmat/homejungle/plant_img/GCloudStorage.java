package com.wrobelmat.homejungle.plant_img;


import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
public class GCloudStorage implements ImgStorage {

    @Value("${app.gcloud.storage-base-uri}")
    private String storageBaseUri;
    @Value("${app.gcloud.project-id}")
    private String projectId;
    @Value("${app.gcloud.bucket-name}")
    private String bucketName;

    private final Storage storage;

    public GCloudStorage() {
        storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();
    }

    @Override
    public String saveImage(MultipartFile imgFile, String plantId, String imgName) throws IOException {
        String imgFilePath = plantId + "/" + imgName;
        BlobId blobId = BlobId.of(bucketName, imgFilePath);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(getContentType(imgName)).build();
        storage.createFrom(blobInfo, imgFile.getInputStream());
        return getImgUri(imgFilePath);
    }

    @Override
    public void deleteImage(String imgUri) {
        String imgFilePath = getImgFilePath(imgUri);
        storage.delete(bucketName, imgFilePath);
    }

    private String getContentType(String imgName) {
        if (imgName.endsWith("jpeg") || imgName.endsWith("jpg")) {
            return "image/jpeg";
        } else if (imgName.endsWith("png")) {
            return "image/png";
        }
        return "";
    }

    private String getImgUri(String imgFilePath) {
        return storageBaseUri + "/" + bucketName + "/" + imgFilePath;
    }

    private String getImgFilePath(String imgUri) {
        return imgUri.replace(storageBaseUri + "/" + bucketName + "/", "");
    }
}
