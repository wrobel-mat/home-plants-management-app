package com.wrobelmat.homejungle.confirmation_token;

import java.util.Optional;

public interface ConfirmationTokenRepository {

    Optional<ConfirmationToken> findByToken(String token);

    Optional<ConfirmationToken> findByUser_Id(String userId);

    ConfirmationToken save(ConfirmationToken confirmationToken);

    void delete(ConfirmationToken confirmationToken);
}
