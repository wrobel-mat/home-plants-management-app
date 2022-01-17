package com.wrobelmat.homejungle.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class EmailValidator implements ConstraintValidator<Email, String> {

    // pattern from OWASP Regex Validation Repository
    private static final Pattern EMAIL_REGEXP =
            Pattern.compile(
                    "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$");

    @Override
    public void initialize(Email constraintAnnotation) {
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        if (email != null)
            return EMAIL_REGEXP.matcher(email).matches();
        else
            return false;
    }
}
