package com.wrobelmat.homejungle.exceptions.user;

import org.springframework.http.HttpStatus;

public class UserAlreadyConfirmedException extends RuntimeException {

    private final HttpStatus httpStatus = HttpStatus.FORBIDDEN;

    public UserAlreadyConfirmedException() {
        super("User Already Confirmed");
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
