package com.wrobelmat.homejungle.user.projections;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class EditUserPasswordModel {

    @NotNull
    private String userId;
    @NotEmpty(message = "Password should not be empty.")
    @Size(max = 100, message = "Max length for password is 100")
    private String password;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
