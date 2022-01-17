package com.wrobelmat.homejungle.confirmation_token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SqlConfirmationTokenRepository extends ConfirmationTokenRepository, JpaRepository<ConfirmationToken, Long> {
}
