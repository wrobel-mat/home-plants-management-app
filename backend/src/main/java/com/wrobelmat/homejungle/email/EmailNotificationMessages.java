package com.wrobelmat.homejungle.email;

import java.util.HashMap;
import java.util.Map;

public class EmailNotificationMessages {

    public enum Theme {
        ACCOUNT_REGISTRATION,
        ACCOUNT_CONFIRMATION,
        EMAIL_UPDATE,
        PASSWORD_UPDATE,
        ACCOUNT_DELETE
    }

    private static final Map<String, String> ACCOUNT_REGISTRATION_SUBJECT;
    private static final Map<String, String> ACCOUNT_CONFIRMATION_SUBJECT;
    private static final Map<String, String> EMAIL_UPDATE_SUBJECT;
    private static final Map<String, String> PASSWORD_UPDATE_SUBJECT;
    private static final Map<String, String> ACCOUNT_DELETE_SUBJECT;

    private static final Map<Theme, Map<String, String>> LOCALIZED_SUBJECTS;

    private static final Map<String, String> ACCOUNT_REGISTRATION_MESSAGE;
    private static final Map<String, String> ACCOUNT_CONFIRMATION_MESSAGE;
    private static final Map<String, String> EMAIL_UPDATE_MESSAGE;
    private static final Map<String, String> PASSWORD_UPDATE_MESSAGE;
    private static final Map<String, String> ACCOUNT_DELETE_MESSAGE;

    private static final Map<Theme, Map<String, String>> LOCALIZED_MESSAGES;

    private static final Map<String, String> ACCOUNT_REGISTRATION_BUTTON_TEXT;
    private static final Map<String, String> DEFAULT_BUTTON_TEXT;

    private static final Map<Theme, Map<String, String>> LOCALIZED_BUTTON_TEXTS;

    static {
        ACCOUNT_REGISTRATION_SUBJECT = new HashMap<>();
        ACCOUNT_REGISTRATION_SUBJECT.put("en", "Home Jungle - Confirm Your Registration");
        ACCOUNT_REGISTRATION_SUBJECT.put("pl", "Home Jungle - Potwierdź Rejestrację Konta");

        ACCOUNT_CONFIRMATION_SUBJECT = new HashMap<>();
        ACCOUNT_CONFIRMATION_SUBJECT.put("en", "Home Jungle - Account Confirmation Successful!");
        ACCOUNT_CONFIRMATION_SUBJECT.put("pl", "Home Jungle - Rejestracja Potwierdzona Pomyślnie!");

        EMAIL_UPDATE_SUBJECT = new HashMap<>();
        EMAIL_UPDATE_SUBJECT.put("en", "Home Jungle - E-mail Address Update Successful!");
        EMAIL_UPDATE_SUBJECT.put("pl", "Home Jungle - Aktualizacja Adresu E-mail");

        PASSWORD_UPDATE_SUBJECT = new HashMap<>();
        PASSWORD_UPDATE_SUBJECT.put("en", "Home Jungle - Password Update Successful!");
        PASSWORD_UPDATE_SUBJECT.put("pl", "Home Jungle - Aktualizacja Hasła");

        ACCOUNT_DELETE_SUBJECT = new HashMap<>();
        ACCOUNT_DELETE_SUBJECT.put("en", "Home Jungle - Account Delete Successful");
        ACCOUNT_DELETE_SUBJECT.put("pl", "Home Jungle - Pomyślne Usunięcie Konta");

        LOCALIZED_SUBJECTS = new HashMap<>();
        LOCALIZED_SUBJECTS.put(Theme.ACCOUNT_REGISTRATION, ACCOUNT_REGISTRATION_SUBJECT);
        LOCALIZED_SUBJECTS.put(Theme.ACCOUNT_CONFIRMATION, ACCOUNT_CONFIRMATION_SUBJECT);
        LOCALIZED_SUBJECTS.put(Theme.EMAIL_UPDATE, EMAIL_UPDATE_SUBJECT);
        LOCALIZED_SUBJECTS.put(Theme.PASSWORD_UPDATE, PASSWORD_UPDATE_SUBJECT);
        LOCALIZED_SUBJECTS.put(Theme.ACCOUNT_DELETE, ACCOUNT_DELETE_SUBJECT);

        ACCOUNT_REGISTRATION_MESSAGE = new HashMap<>();
        ACCOUNT_REGISTRATION_MESSAGE.put("en",
                "<p>Hello!</p>\n" +
                "<p>Thank you for registering to Home Jungle!</p>\n" +
                "<p>Please confirm your registration to login to our site.</p>\n");
        ACCOUNT_REGISTRATION_MESSAGE.put("pl",
                "<p>Cześć!</p>\n" +
                "<p>Dziękujemy za rejestrację w Home Jungle!</p>\n" +
                "<p>Proszę potwierdź swoją rejestrację aby zalogować się do serwisu.</p>\n");

        ACCOUNT_CONFIRMATION_MESSAGE = new HashMap<>();
        ACCOUNT_CONFIRMATION_MESSAGE.put("en",
                "<p>Your account has been confirmed successfully!</p>\n" +
                "<p>You can now login with your email and password.</p>\n");
        ACCOUNT_CONFIRMATION_MESSAGE.put("pl",
                "<p>Twoje konto zostało potwierdzone pomyślnie!</p>\n" +
                "<p>Możesz teraz zalogować się do serwisu używając swojego adresu e-mail i hasła.</p>\n");

        EMAIL_UPDATE_MESSAGE = new HashMap<>();
        EMAIL_UPDATE_MESSAGE.put("en", "<p>Your e-mail address has been updated successfully.</p>\n");
        EMAIL_UPDATE_MESSAGE.put("pl", "<p>Twój adres e-mail został zaktualizowany pomyślnie.</p>\n");

        PASSWORD_UPDATE_MESSAGE = new HashMap<>();
        PASSWORD_UPDATE_MESSAGE.put("en", "<p>Your password has been updated successfully.</p>\n");
        PASSWORD_UPDATE_MESSAGE.put("pl", "<p>Twoje hasło zostało zaktualizowane pomyślnie.</p>\n");

        ACCOUNT_DELETE_MESSAGE = new HashMap<>();
        ACCOUNT_DELETE_MESSAGE.put("en",
                "<p>Your account has been deleted successfully.</p>\n" +
                "<p>Thanks for being with us for a little while!</p>\n");
        ACCOUNT_DELETE_MESSAGE.put("pl",
                "<p>Twoje konto zostało pomyślnie usunięte.</p>\n" +
                "<p>Dziękujemy za bycie z nami przez chwilę!</p>\n");

        LOCALIZED_MESSAGES = new HashMap<>();
        LOCALIZED_MESSAGES.put(Theme.ACCOUNT_REGISTRATION, ACCOUNT_REGISTRATION_MESSAGE);
        LOCALIZED_MESSAGES.put(Theme.ACCOUNT_CONFIRMATION, ACCOUNT_CONFIRMATION_MESSAGE);
        LOCALIZED_MESSAGES.put(Theme.EMAIL_UPDATE, EMAIL_UPDATE_MESSAGE);
        LOCALIZED_MESSAGES.put(Theme.PASSWORD_UPDATE, PASSWORD_UPDATE_MESSAGE);
        LOCALIZED_MESSAGES.put(Theme.ACCOUNT_DELETE, ACCOUNT_DELETE_MESSAGE);

        ACCOUNT_REGISTRATION_BUTTON_TEXT = new HashMap<>();
        ACCOUNT_REGISTRATION_BUTTON_TEXT.put("en", "Confirm Registration");
        ACCOUNT_REGISTRATION_BUTTON_TEXT.put("pl", "Potwierdź Rejestrację");

        DEFAULT_BUTTON_TEXT = new HashMap<>();
        DEFAULT_BUTTON_TEXT.put("en", "Visit Home Jungle");
        DEFAULT_BUTTON_TEXT.put("pl", "Odwiedź Home Jungle");

        LOCALIZED_BUTTON_TEXTS = new HashMap<>();
        LOCALIZED_BUTTON_TEXTS.put(Theme.ACCOUNT_REGISTRATION, ACCOUNT_REGISTRATION_BUTTON_TEXT);
        LOCALIZED_BUTTON_TEXTS.put(Theme.ACCOUNT_CONFIRMATION, DEFAULT_BUTTON_TEXT);
        LOCALIZED_BUTTON_TEXTS.put(Theme.EMAIL_UPDATE, DEFAULT_BUTTON_TEXT);
        LOCALIZED_BUTTON_TEXTS.put(Theme.PASSWORD_UPDATE, DEFAULT_BUTTON_TEXT);
        LOCALIZED_BUTTON_TEXTS.put(Theme.ACCOUNT_DELETE, DEFAULT_BUTTON_TEXT);
    }

    public static String getLocalizedNotificationSubject(Theme notificationTheme, String lang) {
        if (lang == null) lang = "en";
        return LOCALIZED_SUBJECTS.get(notificationTheme).get(lang);
    }

    public static String getLocalizedNotificationMessage(Theme notificationTheme, String lang) {
        if (lang == null) lang = "en";
        return LOCALIZED_MESSAGES.get(notificationTheme).get(lang);
    }

    public static String getLocalizedNotificationButtonText(Theme notificationTheme, String lang) {
        if (lang == null) lang = "en";
        return LOCALIZED_BUTTON_TEXTS.get(notificationTheme).get(lang);
    }
}
