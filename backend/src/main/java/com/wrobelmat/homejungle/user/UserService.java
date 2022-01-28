package com.wrobelmat.homejungle.user;

import com.wrobelmat.homejungle.confirmation_token.ConfirmationToken;
import com.wrobelmat.homejungle.confirmation_token.ConfirmationTokenService;
import com.wrobelmat.homejungle.email.EmailSender;
import com.wrobelmat.homejungle.exceptions.confirmation_token.ConfirmationTokenExpiredException;
import com.wrobelmat.homejungle.exceptions.confirmation_token.ConfirmationTokenNotExpiredException;
import com.wrobelmat.homejungle.exceptions.user.UserAlreadyConfirmedException;
import com.wrobelmat.homejungle.exceptions.user.UserAlreadyRegisteredException;
import com.wrobelmat.homejungle.exceptions.user.UserNotFoundException;
import com.wrobelmat.homejungle.plant_img.PlantImgService;
import com.wrobelmat.homejungle.user.projections.UserRegisterModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static com.wrobelmat.homejungle.email.EmailNotificationContentFactory.createNotificationMailContent;
import static com.wrobelmat.homejungle.email.EmailNotificationMessages.*;
import static com.wrobelmat.homejungle.email.EmailNotificationMessages.Theme.*;
import static com.wrobelmat.homejungle.user.UserRole.ROLE_USER;

@Service
public class UserService {

    @Value("${app.domain.uri-prefix}")
    private String uriPrefix;
    @Value("${app.domain.name}")
    private String domainName;

    @Value("${app.user-registration.confirmation-token-expiration-time-min}")
    private Long confirmationTokenExpirationTime;

    private final UserRepository userRepository;
    private final ConfirmationTokenService confirmationTokenService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final EmailSender emailSender;
    private final PlantImgService plantImgService;

    public UserService(UserRepository userRepository, ConfirmationTokenService confirmationTokenService, BCryptPasswordEncoder bCryptPasswordEncoder, EmailSender emailSender, PlantImgService plantImgService) {
        this.userRepository = userRepository;
        this.confirmationTokenService = confirmationTokenService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.emailSender = emailSender;
        this.plantImgService = plantImgService;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(UserNotFoundException::new);
    }

    public User registerUser(UserRegisterModel userRegisterModel, String lang) {
        if (userRepository.existsByEmail(userRegisterModel.getEmail())) {
            throw new UserAlreadyRegisteredException();
        } else {
            final String encryptedPassword = bCryptPasswordEncoder.encode(userRegisterModel.getPassword());
            User user = new User(
                    userRegisterModel.getEmail(),
                    encryptedPassword,
                    userRegisterModel.getName(),
                    ROLE_USER.name());
            final User createdUser =
                    userRepository.save(user);
            final ConfirmationToken confirmationToken =
                    confirmationTokenService.save(new ConfirmationToken(createdUser, confirmationTokenExpirationTime));
            sendRegisterConfirmationMail(confirmationToken, lang);
            return createdUser;
        }
    }

    public User confirmUser(String token, String lang) {
        ConfirmationToken confirmationToken = confirmationTokenService.findByToken(token);
        if (confirmationToken.getConfirmationDate() != null
                && confirmationToken.getUser().isEnabled())
            throw new UserAlreadyConfirmedException();
        else if (confirmationToken.getExpirationDate().isBefore(LocalDateTime.now()))
            throw new ConfirmationTokenExpiredException(confirmationToken.getUser().getId());
        else {
            final User user = confirmationToken.getUser();
            user.setEnabled(true);
            User confirmedUser = userRepository.save(user);
            confirmationToken.setConfirmationDate(LocalDateTime.now());
            confirmationTokenService.save(confirmationToken);
            sendConfirmationSuccessMail(confirmedUser.getEmail(), lang);
            return confirmedUser;
        }
    }

    public void deleteOldTokenAndResendConfirmationMail(boolean resend, String userId, String lang) {
        if (resend) {
            ConfirmationToken oldToken = confirmationTokenService.findByUserId(userId);
            if (oldToken.getConfirmationDate() != null && oldToken.getUser().isEnabled())
                throw new UserAlreadyConfirmedException();
            if (oldToken.getExpirationDate().isAfter(LocalDateTime.now()))
                throw new ConfirmationTokenNotExpiredException();
            User user = oldToken.getUser();
            confirmationTokenService.delete(oldToken);
            ConfirmationToken newToken = confirmationTokenService
                    .save(new ConfirmationToken(user, confirmationTokenExpirationTime));
            sendRegisterConfirmationMail(newToken, lang);
        }
    }

    public void editUserName(String id, String name) {
        User user = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);
        user.setName(name);
        userRepository.save(user);
    }

    public User editUserEmail(String id, String email, String lang) {
        if (userRepository.existsByEmail(email))
            throw new UserAlreadyRegisteredException();
        User user = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);
        user.setEmail(email);
        User editedUser = userRepository.save(user);
        sendUserEmailUpdateConfirmationMail(editedUser.getEmail(), lang);
        return editedUser;
    }

    public User editUserPassword(String id, String password, String lang) {
        User user = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);
        String encryptedPassword = bCryptPasswordEncoder.encode(password);
        user.setPassword(encryptedPassword);
        User editedUser = userRepository.save(user);
        sendUserPasswordUpdateConfirmationMail(editedUser.getEmail(), lang);
        return editedUser;
    }

    @Transactional
    public void deleteUser(String email, String lang) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(UserNotFoundException::new);
        user.getPlants().forEach(plant ->
                plantImgService
                        .deleteAllPlantImages(plant.getPlantImgDetailsList()));
        userRepository.delete(user);
        sendAccountDeleteConfirmationMail(email, lang);
    }

    private void sendRegisterConfirmationMail(ConfirmationToken token, String lang) {
        String receiver = token.getUser().getEmail();
        String btnUrl = uriPrefix + domainName + "/user/confirm?token=" + token.getToken();
        sendNotificationMail(receiver, ACCOUNT_REGISTRATION, lang, btnUrl);
    }

    private void sendConfirmationSuccessMail(String receiver, String lang) {
        String btnUrl = uriPrefix + domainName;
        sendNotificationMail(receiver, ACCOUNT_CONFIRMATION, lang, btnUrl);
    }

    private void sendUserEmailUpdateConfirmationMail(String receiver, String lang) {
        String btnUrl = uriPrefix + domainName;
        sendNotificationMail(receiver, EMAIL_UPDATE, lang, btnUrl);
    }

    private void sendUserPasswordUpdateConfirmationMail(String receiver, String lang) {
        String btnUrl = uriPrefix + domainName;
        sendNotificationMail(receiver, PASSWORD_UPDATE, lang, btnUrl);
    }

    private void sendAccountDeleteConfirmationMail(String receiver, String lang) {
        String btnUrl = uriPrefix + domainName;
        sendNotificationMail(receiver, ACCOUNT_DELETE, lang, btnUrl);
    }

    private void sendNotificationMail(String receiver, Theme notificationMessagesTheme, String lang, String btnUrl) {
        String subject = getLocalizedNotificationSubject(notificationMessagesTheme, lang);
        String notificationMessage = getLocalizedNotificationMessage(notificationMessagesTheme, lang);
        String btnText = getLocalizedNotificationButtonText(notificationMessagesTheme, lang);
        String notificationMailContent = createNotificationMailContent(notificationMessage, btnText, btnUrl);
        emailSender.send(receiver, subject, notificationMailContent);
    }
}
