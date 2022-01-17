package com.wrobelmat.homejungle.validation;

import com.wrobelmat.homejungle.plant.TempRange;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class MinMaxRuleValidator implements ConstraintValidator<MinMaxRule, TempRange> {
    @Override
    public void initialize(MinMaxRule constraintAnnotation) {
    }

    @Override
    public boolean isValid(TempRange value, ConstraintValidatorContext context) {
        if (value != null)
            return (value.getMinTemp() == 0 && value.getMaxTemp() == 0) || (value.getMinTemp() < value.getMaxTemp());
        return true;
    }
}
