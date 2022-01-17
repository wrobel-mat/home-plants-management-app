package com.wrobelmat.homejungle.exceptions.user;

import org.springframework.http.HttpStatus;

public class UserNotFoundException extends RuntimeException {

    private final HttpStatus httpStatus = HttpStatus.NOT_FOUND;

    public UserNotFoundException() {
        super("User Not Found");
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
