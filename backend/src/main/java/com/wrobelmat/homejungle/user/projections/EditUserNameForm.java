package com.wrobelmat.homejungle.user.projections;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class EditUserNameForm {

    @NotNull
    private String userId;
    @NotEmpty(message = "Name should not be empty.")
    @Size(max = 100, message = "Max length for name is 100")
    private String name;

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
