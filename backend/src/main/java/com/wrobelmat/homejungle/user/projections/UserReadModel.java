package com.wrobelmat.homejungle.user.projections;

import com.wrobelmat.homejungle.user.User;

public class UserReadModel {

    private final String id;
    private final String email;
    private final String name;
    private final Long dateCreated;
    private final Integer plantsCount;
    private final String role;

    public UserReadModel(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.name = user.getName();
        this.dateCreated = user.getDateCreated();
        this.plantsCount = user.getPlants().size();
        this.role = user.getRole();
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public Long getDateCreated() {
        return dateCreated;
    }

    public Integer getPlantsCount() {
        return plantsCount;
    }

    public String getRole() {
        return role;
    }
}
