package com.wrobelmat.homejungle.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@Constraint(validatedBy = EmailValidator.class)
public @interface Email {
    String message() default "Please provide a valid email address.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
