package com.wrobelmat.homejungle.user.projections;

import com.wrobelmat.homejungle.validation.Email;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class RegisterUserForm {

    @NotEmpty(message = "Please enter e-mail.")
    @Email
    @Size(max = 100, message = "Max length for email is 100")
    private final String email;
    @NotEmpty(message = "Please enter password.")
    @Size(max = 100, message = "Max length for password is 100")
    // TODO: add proper password validation
    private final String password;
    @NotEmpty(message = "Please enter name.")
    @Size(max = 100, message = "Max length for name is 100")
    private final String name;

    public RegisterUserForm(String email, String password, String name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }
}
