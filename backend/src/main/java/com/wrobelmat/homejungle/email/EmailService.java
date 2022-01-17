package com.wrobelmat.homejungle.email;

import com.wrobelmat.homejungle.config.RabbitMQConfig;
import com.wrobelmat.homejungle.exception_handler.ExceptionHandlerProcessing;
import com.wrobelmat.homejungle.exceptions.email.MailSendException;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@ExceptionHandlerProcessing
public class EmailService implements EmailSender, EmailReceiver {

    private final JavaMailSender mailSender;
    private final RabbitTemplate rabbitTemplate;

    public EmailService(JavaMailSender mailSender, RabbitTemplate rabbitTemplate) {
        this.mailSender = mailSender;
        this.rabbitTemplate = rabbitTemplate;
    }

    @Override
    public void send(String receiver, String subject, String messageContent) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(receiver);
        mailMessage.setSubject(subject);
        mailMessage.setText(messageContent);
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.topicExchangeName,
                "email.home-jungle",
                mailMessage);
    }

    @Override
    public void receiveEmail(SimpleMailMessage mailMessage) {
        try {
            mailSender.send(mailMessage);
        } catch (MailException e) {
            throw new MailSendException();
        }
    }
}
