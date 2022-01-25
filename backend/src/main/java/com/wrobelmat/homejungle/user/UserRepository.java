package com.wrobelmat.homejungle.user;

import java.util.Optional;

public interface UserRepository {

    Optional<User> findById(String userId);

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    User save(User user);

    void delete(User user);
}
