package com.wrobelmat.homejungle.exceptions.confirmation_token;

import org.springframework.http.HttpStatus;

public class ConfirmationTokenNotFoundException extends RuntimeException {

    private final HttpStatus httpStatus = HttpStatus.NOT_FOUND;

    public ConfirmationTokenNotFoundException() {
        super("Confirmation Token Not Found");
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
