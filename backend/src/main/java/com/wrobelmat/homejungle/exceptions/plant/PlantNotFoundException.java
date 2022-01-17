package com.wrobelmat.homejungle.exceptions.plant;

import org.springframework.http.HttpStatus;

public class PlantNotFoundException extends RuntimeException {

    private final HttpStatus httpStatus = HttpStatus.NOT_FOUND;

    public PlantNotFoundException() {
        super("Plant Not Found");
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
