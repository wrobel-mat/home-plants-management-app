package com.wrobelmat.homejungle.exceptions.email;

import org.springframework.http.HttpStatus;

public class MailSendException extends RuntimeException {

    private final HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    public MailSendException() {
        super("Mail Send Exception");
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
