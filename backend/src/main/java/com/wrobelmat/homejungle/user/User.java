package com.wrobelmat.homejungle.user;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.wrobelmat.homejungle.plant.Plant;
import com.wrobelmat.homejungle.validation.Email;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.Calendar;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class User {

    @Id
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "uuid2")
    @Column(length = 36, nullable = false, updatable = false)
    private String id;

    @NotEmpty(message = "Please enter e-mail.")
    @Email
    @Size(max = 100)
    private String email;

    @NotEmpty(message = "Please enter password.")
    @Size(max = 100)
    // TODO: add proper password validation
    private String password;

    @NotEmpty(message = "Please enter name.")
    @Size(max = 100)
    private String name;

    private boolean enabled;

    private boolean locked;

    private Long dateCreated;

    @OneToMany(orphanRemoval = true, mappedBy = "user", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Plant> plants;

    private String role;

    public User(String email, String password, String name, String role) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
        enabled = false;
        locked = false;
        dateCreated = Calendar.getInstance().getTimeInMillis();
    }

    public User() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public boolean isLocked() {
        return locked;
    }

    public void setLocked(boolean locked) {
        this.locked = locked;
    }

    public List<Plant> getPlants() {
        return plants;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public long getDateCreated() {
        return dateCreated;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return enabled == user.enabled && locked == user.locked && id.equals(user.id) && email.equals(user.email) && password.equals(user.password) && dateCreated.equals(user.dateCreated);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email, password, enabled, locked, dateCreated);
    }
}
