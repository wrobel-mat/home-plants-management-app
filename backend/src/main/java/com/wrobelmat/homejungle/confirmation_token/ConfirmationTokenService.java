package com.wrobelmat.homejungle.confirmation_token;

import com.wrobelmat.homejungle.exceptions.confirmation_token.ConfirmationTokenNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ConfirmationTokenService {

    private final ConfirmationTokenRepository confirmationTokenRepository;

    public ConfirmationTokenService (ConfirmationTokenRepository confirmationTokenRepository) {
        this.confirmationTokenRepository = confirmationTokenRepository;
    }

    public ConfirmationToken save(ConfirmationToken confirmationToken) {
        return confirmationTokenRepository.save(confirmationToken);
    }

    public void delete(ConfirmationToken confirmationToken) {
        confirmationTokenRepository.delete(confirmationToken);
    }

    public ConfirmationToken findByToken(String token) {
        return confirmationTokenRepository.findByToken(token)
                .orElseThrow(ConfirmationTokenNotFoundException::new);
    }

    public ConfirmationToken findByUserId(String userId) {
        return confirmationTokenRepository.findByUser_Id(userId)
                .orElseThrow(ConfirmationTokenNotFoundException::new);
    }
}
