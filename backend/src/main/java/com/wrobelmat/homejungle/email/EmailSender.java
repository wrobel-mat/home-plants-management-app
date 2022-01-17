package com.wrobelmat.homejungle.email;

public interface EmailSender {
    void send(String receiver, String subject, String mailMessage);
}
