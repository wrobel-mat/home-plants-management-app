package com.wrobelmat.homejungle.exceptions.confirmation_token;

import org.springframework.http.HttpStatus;

public class ConfirmationTokenNotExpiredException extends RuntimeException {

    private final HttpStatus httpStatus = HttpStatus.FORBIDDEN;

    public ConfirmationTokenNotExpiredException() {
        super("Confirmation Token Not Expired");
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
