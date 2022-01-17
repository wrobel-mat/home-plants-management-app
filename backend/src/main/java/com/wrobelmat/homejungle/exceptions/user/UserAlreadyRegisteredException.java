package com.wrobelmat.homejungle.exceptions.user;

import org.springframework.http.HttpStatus;

public class UserAlreadyRegisteredException extends RuntimeException {

    private final HttpStatus httpStatus = HttpStatus.FORBIDDEN;

    public UserAlreadyRegisteredException() {
        super("User Already Registered");
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
