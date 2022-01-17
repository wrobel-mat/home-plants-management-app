package com.wrobelmat.homejungle.email;

import org.springframework.mail.SimpleMailMessage;

public interface EmailReceiver {
    void receiveEmail(SimpleMailMessage mailMessage);
}
