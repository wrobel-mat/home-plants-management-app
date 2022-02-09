import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    form: {
      requiredFieldMarker: "*",
      requiredFieldsDisclaimer: "* required fields",
      saveBtn: "Save",
      editBtn: "Edit",
      cancelBtn: "Cancel",
      deleteBtn: "Delete",
      loginBtn: "Login",
      registerBtn: "Register"
    },
    user: {
      name: "Name",
      email: "E-mail address",
      password: "Password",
      loginForm: {
        header: "Welcome back!"
      },
      registerForm: {
        header: "I'm here for the first time"
      },
      editNameForm: {
        header: "Update my name",
      },
      editEmailForm: {
        header: "Change your e-mail address",
        currentEmail: "Current e-mail address",
        newEmail: "New e-mail address",
        confirmNewEmail: "Confirm new e-mail address"
      },
      editPasswordForm: {
        header: "Change your password",
        currentPassword: "Current password",
        newPassword: "New password",
        confirmNewPassword: "Confirm password"
      },
      deleteAccountForm: {
        header: "Delete account",
        message: "All your data will be lost. Type in your password to delete your account."
      },
      formMessages: {
        nameRequired: "*Please enter your name",
        emailRequired: "*Please enter your e-mail address",
        passwordRequired: "*Please enter your password",
        emailPattern: "*Please provide a valid e-mail address (np. marie.curie@passy.fr)",
        emailInUse: "*This e-mail address is already in use. Please enter a different e-mail address."
      }
    },
    footer: {
      about: "About",
      sourceCode: "GitHub",
      contact: "Contact",
    },
    navigation: {
      myaccount: "My account",
      plants: "My plants",
      timeline: "My history",
      explore: "Explore",
      about: "About",
      contact: "Contact",
      logout: "Logout",
    },
    myaccount: {
      title: "My details",
      description:
        "Here you can manage your account details. You can edit your e-mail and password.",
      dataLabel: {
        name: "Name",
        email: "Your e-mail",
        password: "Your password",
        dateCreated: "Account active since",
        plantsQty: "Number of plants",
        deleteAccount: "Delete account"
      },
      message: {
        "Bad credentials": "*Provided password is invalid.",
        "User Already Registered":
          "*This e-mail address is already in use. Please enter a different e-mail address.",
        "Email Not Confirmed": "*Provided e-mail addresses are not the same.",
        "Password Not Confirmed": "*Provided passwords are not the same.",
        "Max length for email is 100": "E-mail address must be less than 100 characters.",
        "Max length for name is 100": "Name must be less than 100 characters.",
        "Max length for password is 100": "Password must be less than 100 characters."
      },
    },
    plants: {
      title: "My plants",
      addPlantBtn: "Add new plant",
      noPlantsMsg: "Add your first plant",
    },
    plant: {
      title: "Plant management",
      pageDescription:
        "Update latest events from your plants life. Edit and add more detailed information about it.",
      tabs: {
        info: "Details",
        treatments: "Plant treatments",
      },
      plantImg: "Image",
      dateAdded: "Added on",
      editBtnTooltip: "Edit",
      deleteBtnTooltip: "Delete",
      editImgBtnTooltip: "Edit image",
      waterBtn: "Water plant",
      waterBtnSubmitted: "Watered ✓",
      replantBtn: "Replant",
      fertilizeBtn: "Fertilize",
      fertilizeBtnSubmitted: "Fertilized ✓",
      manageBtn: "Manage",
      wateringSuccess: "Plant has been watered",
      replantSuccess: "Plant has been replanted",
      fertilizeSuccess: "Plant has been fertilized",
      goToPlantsBtn: "My plants",
      name: "Name",
      species: "Species",
      basicInfo: "Basic information",
      location: "Location",
      description: "Description",
      needs: "Plant needs",
      soilType: "Type of soil",
      sunlight: "Sunlight",
      sunlightOptions: {
        1: "Shaded place (2 - 3 meters from the window)",
        2: "Partially shaded place (0,5 - 1 meter from the window)",
        3: "Illuminated place (next to the window)",
      },
      airHumidity: "Air humidity",
      airHumidityOptions: {
        1: "Low (no sprinkling required)",
        2: "Medium (must be sprinkled regularly)",
        3: "High (must be sprinkled daily)",
      },
      tempRange: "Temperature range (min - max °C)",
      minTemp: "Minimum temperature",
      maxTemp: "Maximum temperature",
      watering: "Watering",
      wateringOptions: {
        1: "Rarely but profusely, water when the soil is slightly dry",
        2: "Water regularly and moderately when the soil is slightly dry",
        3: "Regularly and profusely, the soil should be kept constantly moist",
      },
      fertilizeFreq: "Fertilizing",
      fertilizeOptions: {
        1: "Do not fertilize",
        2: "Less frequently than once a month",
        3: "1 - 2 times a month",
        4: "3 - 4 times a month",
      },
      healthAspects: "Health aspects",
      airPurification: "Purifies air",
      airPurificationOptions: {
        true: "Yes",
        false: "No",
      },
      toxicity: "Toxic for pets",
      toxicityOptions: {
        true: "Yes",
        false: "No",
      },
      noInformation: "No information",
      events: {
        sectionTitle: "Plant treatments",
        watering: "Watering",
        replant: "Replant",
        fertilization: "Fertilization",
        lastWatering: "Last watering",
        lastReplanting: "Last replanting",
        lastFertilization: "Last fertilization",
        noWatering: "This plant has not yet been watered",
        noReplanting: "This plant has not yet been replanted",
        noFertilization: "This plant has not yet been fertilized",
        submitTreatmentBtn: "Submit",
        submitTreatmentBtnDone: "Submitted"
      },
      addPlantForm: {
        header: "Add new plant",
        submitBtn: "Add plant"
      },
      deletePlantForm: {
        header: "Delete {0}",
        message: "All data related with this plant will be lost. Are you sure you want to delete {0}?"
      },
      editPlantDetailsForm: {
        header: "Update plant details"
      },
      editImgForm: {
        header: "Update your plants image",
        plantImg: "New image",
      },
      formMessages: {
        nameRequired: "*Please enter your plants name",
        imgRequired: "*Please select your plants image",
        imgSize: "*Image size must be less than 1 MB",
        tempValidation: "*The minimum value must be less than the maximum value",
      }
    },
    confirmUser: {
      title: "Account confirmation",
      btnText: {
        resend: "Send again",
        goHome: "Go to home page",
      },
    },
    welcomePage: {
      title: "Welcome to Home Jungle!",
      firstParagraph: "This website was created out of love for green beds, spring buds and young shoots, roots, leaves and chlorophyll.",
      secondParagraph: "If, like me, you love the company of your plant companions and are looking for ways to facilitate their effective care, this is definitely the place for you.",
      thirdParagraph: "The website allows you to monitor the growth and management of your plants. Here you will find several useful tools to facilitate systematic maintenance, taking into account the individual preferences of the species, such as the preferred position, soil pH or frequency of irrigation. I hope they will help you improve your gardening skills and make your plants lush and healthy.",
      fourthParagraph: "Find your Home Jungle way.",
      authBtn: "Login / Register"
    },
    notFoundPage: {
      title: "404",
      content: "It looks like you've lost your way.",
      goHome: "Go to home page",
    },
    aboutPage: {
      title: "About"
    },
    contactPage: {
      title: "Contact",
      createdBy: "Created by",
      myName: "Mat Wrobel",
      contactInfo: "Contact details",
      email: "E-mail address: ",
      phoneNumber: "Phone number: "
    },
    timelinePage: {
      title: "My history"
    },
    siteUnderConstruction: "Website under construction",
    serverResponseMessage: {
      "Bad credentials": "Given e-mail or password is incorrect.",
      "Register User Successful":
        "Your account was registered successfully. Check your e-mail to confirm your account.",
      "User Already Registered":
        "*This e-mail address is already in use. Please enter a different e-mail address.",
      "User is disabled":
        "Your account is disabled. Check your e-mail and confirm your registration.",
      "Confirm User Successful":
        "Your account has been confirmed successfully. You can now log in with your e-mail and password.",
      "Resend Confirmation Successful":
        "A new confirmation mail was successfully sent to your e-mail address",
      "User Already Confirmed": "Your account has been confirmed.",
      "Confirmation Token Expired":
        "Your confirmation token has expired. Click below to resend the confirmation email.",
      "Confirmation Token Not Expired":
        "Your current token is still valid. Check your e-mail to confirm your account registration.",
      "Confirmation Token Not Found": "Your confirmation token does not exist.",
      "Edit User Name Successful": "Your data has been updated successfully.",
      "Edit User Email Successful":
        "Your e-mail has been updated successfully.",
      "Edit User Password Successful":
        "Your password has been updated successfully.",
      "Email Connection Refused": "The e-mail notification could not be sent.",
      noConfirmationParams: "There is nothing to confirm.",
      serverError: "Server Error.",
      undefined: "Sorry, something went wrong.",
    },
    inputMaxLengthMsg: "*{0} must be less than {1} characters"
  },
  pl: {
    form: {
      requiredFieldMarker: "*",
      requiredFieldsDisclaimer: "* pola wymagane",
      saveBtn: "Zapisz",
      editBtn: "Edytuj",
      cancelBtn: "Anuluj",
      deleteBtn: "Usuń",
      loginBtn: "Zaloguj się",
      registerBtn: "Zarejestruj się"
    },
    user: {
      name: "Imię",
      email: "Adres e-mail",
      password: "Hasło",
      loginForm: {
        header: "Witaj ponownie!"
      },
      registerForm: {
        header: "Jestem tu pierwszy raz"
      },
      editNameForm: {
        header: "Aktualizuj moje imie",
      },
      editEmailForm: {
        header: "Zmień adres e-mail",
        currentEmail: "Aktualny adres e-mail",
        newEmail: "Nowy adres e-mail",
        confirmNewEmail: "Potwierdź nowy adres e-mail"
      },
      editPasswordForm: {
        header: "Zmień hasło",
        currentPassword: "Aktualne hasło",
        newPassword: "Nowe hasło",
        confirmNewPassword: "Potwierdź hasło"
      },
      deleteAccountForm: {
        header: "Usuń konto",
        message: "Wszystkie dane związane z Twoim kontem zostaną utracone. Podaj hasło, aby usunąć konto."
      },
      formMessages: {
        nameRequired: "*Wprowadź swoje imię",
        emailRequired: "*Wprowadź swój adres e-mail",
        passwordRequired: "*Wprowadź hasło",
        emailPattern: "*Wprowadź poprawny adres e-mail (np. marie.curie@passy.fr)",
        emailInUse: "*Ten adres e-mail jest już wykorzystany. Podaj inny adres e-mail."
      }
    },
    footer: {
      about: "O stronie",
      sourceCode: "GitHub",
      contact: "Kontakt",
    },
    navigation: {
      myaccount: "Moje konto",
      plants: "Moje rośliny",
      timeline: "Moja historia",
      explore: "Eksploruj",
      about: "O stronie",
      contact: "Kontakt",
      logout: "Wyloguj się",
    },
    myaccount: {
      title: "Moje dane",
      description:
        "Tutaj możesz zobaczyć i zaktualizować swoje dane. Możesz zmienić swój e-mail i hasło.",
      dataLabel: {
        name: "Imię",
        email: "Twój e-mail",
        password: "Twoje hasło",
        dateCreated: "Konto aktywne od",
        plantsQty: "Ilość roślin",
        deleteAccount: "Usuń konto"
      },
      message: {
        "Bad credentials": "*Podane hasło jest nieprawidłowe.",
        "User Already Registered":
          "*Ten adres e-mail jest już wykorzystywany. Podaj inny adres e-mail.",
        "Email Not Confirmed":
          "*Wprowadzone adresy e-mail różnią się od siebie.",
        "Password Not Confirmed": "*Wprowadzone hasła różnią się od siebie.",
        "Max length for email is 100": "Adres e-mail może mieć maksymalnie 100 znaków.",
        "Max length for name is 100": "Imię może mieć maksymalnie 100 znaków.",
        "Max length for password is 100": "Hasło może mieć maksymalnie 100 znaków."
      },
    },
    plants: {
      title: "Moje rośliny",
      addPlantBtn: "Dodaj nową roślinę",
      noPlantsMsg: "Dodaj swoją pierwszą roślinę"
    },
    plant: {
      title: "Zarządzaj rośliną",
      pageDescription:
        "Aktualizuj ostatnie wydarzenia z życia swojej rośliny, edytuj i dodawaj bardziej szczegółowe informacje na jej temat.",
      tabs: {
        info: "Informacje",
        treatments: "Zabiegi roślinne",
      },
      plantImg: "Zdjęcie",
      dateAdded: "Data dodania",
      editBtnTooltip: "Edytuj",
      deleteBtnTooltip: "Usuń",
      editImgBtnTooltip: "Edytuj zdjęcie",
      waterBtn: "Podlej",
      waterBtnSubmitted: "Podlana ✓",
      replantBtn: "Przesadź",
      fertilizeBtn: "Nawieź",
      fertilizeBtnSubmitted: "Nawieziona ✓",
      manageBtn: "Zarządzaj",
      wateringSuccess: "Roślina została podlana",
      replantSuccess: "Roślina została przesadzona",
      fertilizeSuccess: "Roślina została nawieziona",
      goToPlantsBtn: "Moje rośliny",
      name: "Nazwa",
      species: "Gatunek",
      basicInfo: "Podstawowe informacje",
      location: "Gdzie przebywa",
      description: "Opis",
      needs: "Potrzeby rośliny",
      soilType: "Rodzaj ziemi",
      sunlight: "Nasłonecznienie",
      sunlightOptions: {
        1: "Miejsce zacienione (2 - 3 metry od okna)",
        2: "Miejsce półcieniste (0,5 - 1 metr od okna)",
        3: "Miejsce oświetlone (przy oknie)",
      },
      airHumidity: "Wilgotność powietrza",
      airHumidityOptions: {
        1: "Niska (nie wymaga zraszania)",
        2: "Średnia (należy regularnie zraszać)",
        3: "Wysoka (należy codziennie zraszać)",
      },
      tempRange: "Zakres temperatury",
      minTemp: "Temperatura minimalna",
      maxTemp: "Temperatura maksymalna",
      watering: "Podlewanie",
      wateringOptions: {
        1: "Rzadko ale obficie, podlewać gdy ziemia lekko przeschnie",
        2: "Regularnie i umiarkowanie, podlewać gdy ziemia lekko przeschnie",
        3: "Regularnie i obficie, ziemia powinna być stale wilgotna",
      },
      fertilizeFreq: "Nawożenie",
      fertilizeOptions: {
        1: "Nie nawozić",
        2: "Rzadziej niż raz na miesiąc",
        3: "1 - 2 razy w miesiącu",
        4: "3 - 4 razy w miesiącu",
      },
      healthAspects: "Aspekty zdrowotne",
      airPurification: "Oczyszcza potwietrze",
      airPurificationOptions: {
        true: "Tak",
        false: "Nie",
      },
      toxicity: "Toksyczna dla zwierząt",
      toxicityOptions: {
        true: "Tak",
        false: "Nie",
      },
      noInformation: "Brak informacji",
      events: {
        sectionTitle: "Zabiegi roślinne",
        watering: "Podlewanie",
        replant: "Przesadzanie",
        fertilization: "Nawożenie",
        lastWatering: "Ostatnie podlewanie",
        lastReplanting: "Ostatnie przesadzanie",
        lastFertilization: "Ostatnie nawożenie",
        noWatering: "Ta roślina nie była jeszcze podlewana",
        noReplanting: "Ta roślina nie była jeszcze przesadzana",
        noFertilization: "Ta roślina nie była jeszcze nawożona",
        submitTreatmentBtn: "Wykonaj",
        submitTreatmentBtnDone: "Wykonane"
      },
      addPlantForm: {
        header: "Dodaj nową roślinę",
        submitBtn: "Dodaj roślinę"
      },
      deletePlantForm: {
        header: "Usuń {0}",
        message:
          "Wszystkie informacje związane z tą rośliną zostaną utracone. Czy na pewno chcesz usunąć {0}?"
      },
      editPlantDetailsForm: {
        header: "Aktualizuj informacje o roślinie"
      },
      editImgForm: {
        header: "Zaktualizuj zdjęcie rośliny",
        plantImg: "Nowe zdjęcie",
      },
      formMessages: {
        nameRequired: "*Twoja roślina musi mieć nazwę",
        imgRequired: "*Proszę wybrać zdjęcie",
        imgSize: "*Rozmiar zdjęcia może mieć maksymalnie 1 MB",
        tempValidation: "*Wartość minimalna powinna być niższa niż wartość maksymalna",
      }
    },
    confirmUser: {
      title: "Potwierdzenie konta",
      btnText: {
        resend: "Wyślij ponownie",
        goHome: "Powrót do strony głównej",
      },
    },
    welcomePage: {
      title: "Witaj na Home Jungle!",
      firstParagraph: "Ta strona powstała z miłości do zielonych grządek, wiosennych pąków i młodych pędów, korzeni, liści i chlorofilu.",
      secondParagraph: "Jeśli tak jak ja przepadasz za towarzystwem swoich roślinnych towarzyszy i poszukujesz sposobów by ułatwić sobie ich skuteczną pielęgnację, to zdecydowanie miejsce dla Ciebie.",
      thirdParagraph: "Strona pozwoli Ci monitorować wzrost i prowadzenie Twoich roślin. Znajdziesz tu kilka przydatnych narzędzi ułatwiających systematyczną pielęgnację, z uwzględnieniem indywidualnych preferencji gatunku jak np. preferowane stanowisko, odczyn gleby czy częstotliwość nawadniania. Mam nadzieję, że dzięki nim doszlifujesz swoje ogrodnicze skille, a Twoje rośliny będą bujne i zdrowe.",
      fourthParagraph: "Znajdź swój przepis na domową dżunglę.",
      authBtn: "Zaloguj / Zarejestruj się"
    },
    notFoundPage: {
      title: "404",
      content: "Wygląda na to, że zabłądziłuś.",
      goHome: "Powrót do strony głównej",
    },
    aboutPage: {
      title: "O stronie"
    },
    contactPage: {
      title: "Kontakt",
      createdBy: "Autor",
      myName: "Mateusz Wróbel",
      contactInfo: "Dane kontaktowe",
      email: "Adres e-mail: ",
      phoneNumber: "Tel.: "
    },
    timelinePage: {
      title: "Moja historia"
    },
    siteUnderConstruction: "Strona w budowie",
    serverResponseMessage: {
      "Bad credentials": "Podano nieprawidłowy e-mail lub hasło.",
      "Register User Successful":
        "Twoje konto zostało poprawnie utworzone. Sprawdź swój e-mail aby potwierdzić założenie konta i zalogować się do serwisu.",
      "User Already Registered":
        "*Ten adres e-mail jest już wykorzystany. Podaj inny adres e-mail.",
      "User is disabled":
        "Twoje konto nie zostało aktywowane. Sprawdź swój e-mail aby potwierdzić założenie konta.",
      "Confirm User Successful":
        "Twoje konto zostało potwierdzone z powodzeniem. Możesz zalogować się do serwisu podając swój e-mail i hasło.",
      "Resend Confirmation Successful":
        "Wiadomość z linkiem potwierdzającym rejestrację konta została wysłana ponownie na Twój adres e-mail.",
      "User Already Confirmed": "Twoje konto zostało już potwierdzone.",
      "Confirmation Token Expired":
        "Twój token utracił ważność. Kliknij poniżej aby wysłać e-mail z potwierdzeniem ponownie.",
      "Confirmation Token Not Expired":
        "Twój obecny token jest wciąż ważny. Sprawdź swój e-mail aby potwierdzić założenie konta.",
      "Confirmation Token Not Found": "Twój token nie istnieje.",
      "Edit User Name Successful":
        "Twoje dane zostały zaktualizowane pomyślnie.",
      "Edit User Email Successful":
        "Twój e-mail został zaktualizowany pomyślnie.",
      "Edit User Password Successful":
        "Twoje hasło zostało zaktualizowane pomyślnie.",
      "Email Connection Refused": "Nie udało się wysłać powiadomienia e-mail.",
      noConfirmationParams: "Brak danych do potwierdzenia.",
      serverError: "Błąd serwera.",
      undefined: "Przepraszamy, coś poszło nie tak.",
    },
    inputMaxLengthMsg: "*{0} może mieć maksymalnie {1} znaków"
  },
});

export default strings;
