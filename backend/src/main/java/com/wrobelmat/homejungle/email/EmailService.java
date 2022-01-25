package com.wrobelmat.homejungle.email;

import com.wrobelmat.homejungle.config.RabbitMQConfig;
import com.wrobelmat.homejungle.exception_handler.ExceptionHandlerProcessing;
import com.wrobelmat.homejungle.exceptions.email.MailSendException;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

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
    public void send(String receiver, String subject, String notificationMailContent) {
        MimeMessage mimeMailMessage = mailSender.createMimeMessage();
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        try {
            mimeMailMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(receiver));
            mimeMailMessage.setSubject(subject);
            mimeMailMessage.setContent(notificationMailContent, "text/html; charset=UTF-8");
            mimeMailMessage.writeTo(os);
        } catch (MessagingException | IOException e) {
            throw new MailSendException();
        }

        rabbitTemplate.convertAndSend(
                RabbitMQConfig.topicExchangeName,
                "email.home-jungle",
                os.toByteArray());
    }

    @Override
    public void receiveEmail(byte[] mimeByteArray) {
        ByteArrayInputStream is = new ByteArrayInputStream(mimeByteArray);
        MimeMessage mimeMailMessage = mailSender.createMimeMessage(is);
        mailSender.send(mimeMailMessage);
    }
}
