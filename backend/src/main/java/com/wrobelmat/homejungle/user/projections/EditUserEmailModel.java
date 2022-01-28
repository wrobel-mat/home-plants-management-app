package com.wrobelmat.homejungle.user.projections;

import com.wrobelmat.homejungle.validation.Email;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class EditUserEmailModel {

    @NotNull
    private String userId;
    @NotEmpty(message = "E-mail should not be empty.")
    @Email
    @Size(max = 100, message = "Max length for email is 100")
    private String email;

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }
}
