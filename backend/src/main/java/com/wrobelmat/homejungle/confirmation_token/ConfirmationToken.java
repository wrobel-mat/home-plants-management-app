package com.wrobelmat.homejungle.confirmation_token;

import com.wrobelmat.homejungle.user.User;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table (name = "confirmation_tokens")
public class ConfirmationToken {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    Long id;

    @NotNull
    private String token;

    private LocalDateTime dateCreated;

    private LocalDateTime expirationDate;
    private LocalDateTime confirmationDate;

    @OneToOne (targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn (nullable = false, name = "user_id")
    private User user;

    public ConfirmationToken(User user, Long tokenExpirationTime) {
        this.user = user;
        this.token = UUID.randomUUID().toString();
        this.dateCreated = LocalDateTime.now();
        this.expirationDate = dateCreated.plusMinutes(tokenExpirationTime);
    }

    public ConfirmationToken(){}

    public String getToken() {
        return token;
    }

    public User getUser() {
        return user;
    }

    public LocalDateTime getCreatedDate() {
        return dateCreated;
    }

    public LocalDateTime getExpirationDate() {
        return expirationDate;
    }

    public LocalDateTime getConfirmationDate() {
        return confirmationDate;
    }

    public void setConfirmationDate(LocalDateTime confirmationDate) {
        this.confirmationDate = confirmationDate;
    }
}
