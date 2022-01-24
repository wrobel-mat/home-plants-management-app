package com.wrobelmat.homejungle.exceptions.plant_treatments;

import org.springframework.http.HttpStatus;

public class SubmitPlantTreatmentException extends RuntimeException {

    private final HttpStatus httpStatus = HttpStatus.FORBIDDEN;

    public SubmitPlantTreatmentException(String message) {
        super(message);
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
