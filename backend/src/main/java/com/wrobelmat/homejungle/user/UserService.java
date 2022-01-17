package com.wrobelmat.homejungle.user;

import com.wrobelmat.homejungle.confirmation_token.ConfirmationToken;
import com.wrobelmat.homejungle.confirmation_token.ConfirmationTokenService;
import com.wrobelmat.homejungle.email.EmailSender;
import com.wrobelmat.homejungle.exceptions.confirmation_token.ConfirmationTokenExpiredException;
import com.wrobelmat.homejungle.exceptions.confirmation_token.ConfirmationTokenNotExpiredException;
import com.wrobelmat.homejungle.exceptions.user.UserAlreadyConfirmedException;
import com.wrobelmat.homejungle.exceptions.user.UserAlreadyRegisteredException;
import com.wrobelmat.homejungle.exceptions.user.UserNotFoundException;
import com.wrobelmat.homejungle.user.projections.RegisterUserForm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import static com.wrobelmat.homejungle.user.UserRole.ROLE_USER;

@Service
public class UserService {

    @Value("${DOMAIN_URI_PREFIX}")
    private String uriPrefix;
    @Value("${app.domain.name}")
    private String domainName;
    private final String userConfirmationEndpoint = "/user/confirm";

    @Value("${app.user-registration.confirmation-token-expiration-time-min}")
    private Long confirmationTokenExpirationTime;

    private final UserRepository userRepository;
    private final ConfirmationTokenService confirmationTokenService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final EmailSender emailSender;

    //TODO: rework email notifications template (make it prettier and add localization maybe?)

    public UserService(UserRepository userRepository, ConfirmationTokenService confirmationTokenService, BCryptPasswordEncoder bCryptPasswordEncoder, EmailSender emailSender) {
        this.userRepository = userRepository;
        this.confirmationTokenService = confirmationTokenService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.emailSender = emailSender;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public void updateUser(String userId, User user) {
        User toUpdate = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        toUpdate.updateFrom(user);
        userRepository.save(toUpdate);
    }

    public void deleteById(String userId) {
        userRepository.deleteById(userId);
    }

    public User findById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(UserNotFoundException::new);
    }

    public User registerUser(RegisterUserForm registerUserForm) {
        if (userRepository.existsByEmail(registerUserForm.getEmail())) {
            throw new UserAlreadyRegisteredException();
        } else {
            final String encryptedPassword = bCryptPasswordEncoder.encode(registerUserForm.getPassword());
            User user = new User(
                    registerUserForm.getEmail(),
                    encryptedPassword,
                    registerUserForm.getName(),
                    ROLE_USER.name());
            final User createdUser =
                    userRepository.save(user);
            final ConfirmationToken confirmationToken =
                    confirmationTokenService.save(new ConfirmationToken(createdUser, confirmationTokenExpirationTime));
            sendConfirmationMail(confirmationToken);
            return createdUser;
        }
    }

    public User confirmUser(String token) {
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
            emailSender.send(confirmedUser.getEmail(),
                    "Home Jungle - Confirmation Successful",
                    "Hello,\n" +
                            "Your account has been confirmed successfully.\n" +
                            "You can now log in with your e-mail and password: " + uriPrefix + domainName);
            return confirmedUser;
        }
    }

    public void deleteOldTokenAndResendConfirmationMail(boolean resend, String userId) {
        if (resend) {
            ConfirmationToken oldToken = confirmationTokenService.findByUserId(userId);
            if (oldToken.getConfirmationDate() != null && oldToken.getUser().isEnabled())
                throw new UserAlreadyConfirmedException();
            if (oldToken.getExpirationDate().isAfter(LocalDateTime.now()))
                throw new ConfirmationTokenNotExpiredException();
            User user = oldToken.getUser();
            confirmationTokenService.delete(oldToken);
            ConfirmationToken newToken = confirmationTokenService.save(new ConfirmationToken(user, confirmationTokenExpirationTime));
            sendConfirmationMail(newToken);
        }
    }

    public User addUser(User user) {
        String encryptedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
        return userRepository.save(user);
    }

    public void editUserName(String id, String name) {
        User user = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);
        user.setName(name);
        userRepository.save(user);
    }

    public User editUserEmail(String id, String email) {
        if (userRepository.existsByEmail(email))
            throw new UserAlreadyRegisteredException();
        User user = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);
        user.setEmail(email);
        User editedUser = userRepository.save(user);
        emailSender.send(editedUser.getEmail(),
                "Home Jungle - Your Account Details Has Changed",
                "Hello,\n" +
                        "Your e-mail address has been updated successfully.\n" +
                        "You can now log in with your new e-mail: " + uriPrefix + domainName);
        return editedUser;
    }

    public User editUserPassword(String id, String password) {
        User user = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);
        String encryptedPassword = bCryptPasswordEncoder.encode(password);
        user.setPassword(encryptedPassword);
        User editedUser = userRepository.save(user);
        emailSender.send(editedUser.getEmail(),
                "Home Jungle - Your Account Details Has Changed",
                "Hello,\n" +
                        "Your password has been updated successfully.\n" +
                        "Your can now log in with your new password: " + uriPrefix + domainName);
        return editedUser;
    }

    private void sendConfirmationMail(ConfirmationToken token) {
        String receiver = token.getUser().getEmail();
        String subject = "Home Jungle - Confirm Your Registration";
        String messageContent = "Thank you for registering to Home Jungle App.\n" +
                "Please confirm your registration by clicking on the link below:\n" +
                uriPrefix + domainName + userConfirmationEndpoint + "?token=" + token.getToken() + "\n " +
                "The link is active for 30 minutes.";
        emailSender.send(receiver, subject, messageContent);
    }
}
