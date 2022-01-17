package com.wrobelmat.homejungle.exceptions.plant;

import org.springframework.http.HttpStatus;

public class PlantImgSaveException extends RuntimeException {

    private final HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    public PlantImgSaveException() {
        super("Plant Image Save Exception");
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
