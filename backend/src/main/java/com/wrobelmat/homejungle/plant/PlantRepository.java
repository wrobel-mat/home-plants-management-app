package com.wrobelmat.homejungle.plant;

import com.wrobelmat.homejungle.user.User;

import java.util.List;
import java.util.Optional;

interface PlantRepository {

    Optional<Plant> findByIdAndUser(String id, User user);

    List<Plant> findAllByUser(User user);

    void deleteByIdAndUser(String id, User user);

    List<Plant> findAll();

    Plant save(Plant plant);
}
