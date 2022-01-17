package com.wrobelmat.homejungle.exceptions.confirmation_token;

import org.springframework.http.HttpStatus;

public class ConfirmationTokenExpiredException extends RuntimeException {

    private final HttpStatus httpStatus = HttpStatus.FORBIDDEN;
    private final String resendQuery;

    public ConfirmationTokenExpiredException(String userId) {
        super("Confirmation Token Expired");
        this.resendQuery = "?resend=true&userId=" + userId;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public String getResendQuery() {
        return resendQuery;
    }
}
