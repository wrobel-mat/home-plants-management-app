package com.wrobelmat.homejungle.exception_handler;

import com.wrobelmat.homejungle.exceptions.confirmation_token.ConfirmationTokenExpiredException;
import com.wrobelmat.homejungle.exceptions.confirmation_token.ConfirmationTokenNotExpiredException;
import com.wrobelmat.homejungle.exceptions.confirmation_token.ConfirmationTokenNotFoundException;
import com.wrobelmat.homejungle.exceptions.email.MailSendException;
import com.wrobelmat.homejungle.exceptions.plant.PlantImgSaveException;
import com.wrobelmat.homejungle.exceptions.plant.PlantNotFoundException;
import com.wrobelmat.homejungle.exceptions.user.UserAlreadyConfirmedException;
import com.wrobelmat.homejungle.exceptions.user.UserAlreadyRegisteredException;
import com.wrobelmat.homejungle.exceptions.user.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.net.ConnectException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice(annotations = ExceptionHandlerProcessing.class)
public class ExceptionHandlerAdvice {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<?> handleUserNotFoundException(UserNotFoundException e) {
        return ResponseEntity
                .status(e.getHttpStatus())
                .header("message", e.getMessage())
                .build();
    }

    @ExceptionHandler(UserAlreadyRegisteredException.class)
    public ResponseEntity<?> handleUserAlreadyRegisteredException(UserAlreadyRegisteredException e) {
        return ResponseEntity
                .status(e.getHttpStatus())
                .header("message", e.getMessage())
                .build();
    }

    @ExceptionHandler(UserAlreadyConfirmedException.class)
    public ResponseEntity<?> handleUserConfirmationException(UserAlreadyConfirmedException e) {
        return ResponseEntity
                .status(e.getHttpStatus())
                .header("message", e.getMessage())
                .build();
    }

    @ExceptionHandler(ConfirmationTokenExpiredException.class)
    public ResponseEntity<?> handleConfirmationTokenExpiredException(ConfirmationTokenExpiredException e) {
        Map<String, String> data = new HashMap<>();
        data.put("query", e.getResendQuery());
        return ResponseEntity
                .status(e.getHttpStatus())
                .header("message", e.getMessage())
                .body(data);
    }

    @ExceptionHandler(ConfirmationTokenNotFoundException.class)
    public ResponseEntity<?> handleConfirmationTokenNotFoundException(ConfirmationTokenNotFoundException e) {
        return ResponseEntity
                .status(e.getHttpStatus())
                .header("message", e.getMessage())
                .build();
    }

    @ExceptionHandler(ConfirmationTokenNotExpiredException.class)
    public ResponseEntity<?> handleConfirmationTokenNotExpiredException(ConfirmationTokenNotExpiredException e) {
        return ResponseEntity
                .status(e.getHttpStatus())
                .header("message", e.getMessage())
                .build();
    }

    @ExceptionHandler(PlantNotFoundException.class)
    public ResponseEntity<?> handlePlantNotFoundException(PlantNotFoundException e) {
        return ResponseEntity
                .status(e.getHttpStatus())
                .header("message", e.getMessage())
                .build();
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        List<ObjectError> allErrors = e.getAllErrors();
        StringBuilder errorMessage = new StringBuilder();
        for (ObjectError error : allErrors) {
            errorMessage.append(error.getDefaultMessage()).append(";");
        }
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .header("message", errorMessage.toString())
                .build();
    }

    @ExceptionHandler(PlantImgSaveException.class)
    public ResponseEntity<?> handlePlantImgSaveException(PlantImgSaveException e) {
        return ResponseEntity
                .status(e.getHttpStatus())
                .header("message", e.getMessage())
                .build();
    }

    @ExceptionHandler(ConnectException.class)
    public ResponseEntity<?> handleConnectException(ConnectException e) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .header("message", "Email Connection Refused")
                .build();
    }

    @ExceptionHandler(MailSendException.class)
    public ResponseEntity<?> handleMailSendException(MailSendException e) {
        return ResponseEntity
                .status(e.getHttpStatus())
                .header("message", e.getMessage())
                .build();
    }
}
