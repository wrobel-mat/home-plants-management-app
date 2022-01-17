package com.wrobelmat.homejungle.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@Constraint(validatedBy = MinMaxRuleValidator.class)
public @interface MinMaxRule {
    String message() default "The minimum value must be less than the maximum value.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
