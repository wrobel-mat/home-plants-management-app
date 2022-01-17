import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    authPage: {
      login: {
        label: "Login",
        header: "Welcome back!",
      },
      register: {
        label: "Register",
        header: "I'm here for the first time",
        disclaimer: "* required fields",
        message: {
          "User Already Registered":
            "*This e-mail address is already in use. Please enter a different e-mail address.",
        },
      },
      email: {
        name: "email",
        label: "E-mail address",
        placeholder: "E-mail address",
        message: {
          required: "*Please enter your e-mail address",
          pattern:
            "*Please provide valid e-mail address (e.g. marie.curie@passy.fr)",
        },
      },
      password: {
        name: "password",
        label: "Password",
        placeholder: "Password",
        message: {
          required: "*Please enter password",
        },
      },
      username: {
        name: "name",
        label: "Name",
        placeholder: "Name",
        message: {
          required: "*Please enter your name",
        },
      },
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
      },
      editBtn: "Edit",
      saveBtn: "Save",
      editName: {
        title: "Update my name",
      },
      editEmail: {
        title: "Change your e-mail address",
        input: {
          currentEmail: "Current e-mail address",
          newEmail: "New e-mail address",
          confirmNewEmail: "Confirm new e-mail address",
        },
      },
      editPassword: {
        title: "Change your password",
        input: {
          newPassword: "New password",
          confirmNewPassword: "Confirm password",
        },
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
      addPlantModal: {
        title: "Add new plant",
        plantName: "Plant name*",
        plantNamePlaceholder: "Plant name",
        plantNameRequiredMsg: "Your plant should have a name",
        plantSpecies: "Plant species",
        plantSpeciesPlaceholder: "Plant species",
        plantImg: "Plant image",
        plantImgMessage: "The image size must be less than 1MB",
        submitBtn: "Add plant",
        disclaimer: "* required fields",
      },
      deletePlantModal: {
        title: "Delete {0}",
        message:
          "All data related with this plant will be lost. Are you sure you want to delete {0}?",
        deleteBtn: "Delete",
        cancelBtn: "Cancel",
      },
      updatePlantModal: {
        title: "Update plant details",
        plantName: "Plant name",
        plantNameRequiredMsg: "Your plant should have a name",
        plantImg: "Plant image",
        plantImgMessage: "The image size must be less than 1MB",
        submitBtn: "Save",
      },
    },
    plant: {
      goBack: "Go back",
      title: "Plant management",
      pageDescription:
        "Update latest events from your plants life. Edit and add more detailed information about it.",
      dateAdded: "Added on",
      editBtnTooltip: "Edit",
      deleteBtnTooltip: "Delete",
      editImgBtnTooltip: "Edit image",
      waterBtn: "Water plant",
      replantBtn: "Replant",
      fertilizeBtn: "Fertilize",
      manageBtn: "Manage",
      wateringSuccess: "Plant has been watered",
      replantSuccess: "Plant has been replanted",
      fertilizeSuccess: "Plant has been fertilized",
      goToPlantsBtn: "My plants",
      species: "Species",
      basicInfo: "Basic information",
      location: "Location",
      description: "Description",
      needs: "Plants needs",
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
      tempValidationMsg:
        "The minimum value must be less than the maximum value",
      watering: "Watering",
      wateringOptions: {
        1: "Rarely but profusely, water when the soil is slightly dry",
        2: "Water regularly and moderately when the soil is slightly dry",
        3: "Regularly and profusely, the soil should be kept constantly moist",
      },
      fertilizeFreq: "Fertilizing",
      fertilizeOptions: {
        1: "Not to fertilize",
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
        wateringBtnTooltip: "Water",
        replantBtnTooltip: "Replant",
        fertilizeBtnTooltip: "Fertilize",
        submitTreatmentBtn: "Submit"
      },
      editImgModal: {
        title: "Update your plants image",
        plantImg: "Plant image",
        plantImgRequiredMsg: "Please select a picture",
        plantImgMessage: "The image size must be less than 1MB",
        submitBtn: "Save",
      },
      tabs: {
        info: "Details",
        treatments: "Plant treatments",
      },
    },
    confirmUser: {
      title: "Account confirmation",
      btnText: {
        resend: "Send again",
        goHome: "Go to home page",
      },
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
      title: "Contact"
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
    inputMaxLengthMsg: "{0} must be less than {1} characters"
  },
  pl: {
    authPage: {
      login: {
        label: "Zaloguj się",
        header: "Witaj ponownie!",
      },
      register: {
        label: "Zarejestruj się",
        header: "Jestem tu pierwszy raz",
        disclaimer: "* pola obowiązkowe",
        message: {
          "User Already Registered":
            "*Ten adres e-mail jest już wykorzystany. Podaj inny adres e-mail.",
        },
      },
      email: {
        name: "email",
        label: "Adres e-mail",
        placeholder: "Adres e-mail",
        message: {
          required: "*Wprowadź swój adres e-mail",
          pattern: "*Wprowadź poprawny adres e-mail (np. marie.curie@passy.fr)",
        },
      },
      password: {
        name: "password",
        label: "Hasło",
        placeholder: "Hasło",
        message: {
          required: "*Wprowadź hasło",
        },
      },
      username: {
        name: "name",
        label: "Imię",
        placeholder: "Imię",
        message: {
          required: "*Wprowadź swoje imię",
        },
      },
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
      },
      editBtn: "Edytuj",
      saveBtn: "Zapisz",
      editName: {
        title: "Aktualizuj moje imie",
      },
      editEmail: {
        title: "Zmień adres e-mail",
        input: {
          currentEmail: "Aktualny adres e-mail",
          newEmail: "Nowy adres e-mail",
          confirmNewEmail: "Potwierdź nowy adres e-mail",
        },
      },
      editPassword: {
        title: "Zmień hasło",
        input: {
          newPassword: "Nowe hasło",
          confirmNewPassword: "Potwierdź hasło",
        },
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
      noPlantsMsg: "Dodaj swoją pierwszą roślinę",
      addPlantModal: {
        title: "Dodaj nową roślinę",
        plantName: "Nazwa rośliny*",
        plantNamePlaceholder: "Nazwa rośliny",
        plantNameRequiredMsg: "Twoja roślina musi mieć nazwę",
        plantSpecies: "Gatunek rośliny",
        plantSpeciesPlaceholder: "Gatunek rośliny",
        plantImg: "Zdjęcie rośliny",
        plantImgMessage: "Rozmiar zdjęcia może mieć maksymalnie 1MB",
        submitBtn: "Dodaj roślinę",
        disclaimer: "* pola wymagane",
      },
      deletePlantModal: {
        title: "Usuń {0}",
        message:
          "Wszystkie informacje związane z tą rośliną zostaną utracone. Czy na pewno chcesz usunąć {0}?",
        deleteBtn: "Usuń",
        cancelBtn: "Anuluj",
      },
      updatePlantModal: {
        title: "Aktualizuj informacje o roślinie",
        plantName: "Nazwa rośliny",
        plantNameRequiredMsg: "Twoja roślina musi mieć nazwę",
        plantImg: "Zdjęcie",
        plantImgMessage: "Rozmiar zdjęcia może mieć maksymalnie 1MB",
        submitBtn: "Zapisz",
      },
    },
    plant: {
      goBack: "Powrót",
      title: "Zarządzaj rośliną",
      pageDescription:
        "Aktualizuj ostatnie wydarzenia z życia swojej rośliny, edytuj i dodawaj bardziej szczegółowe informacje na jej temat.",
      dateAdded: "Data dodania",
      editBtnTooltip: "Edytuj",
      deleteBtnTooltip: "Usuń",
      editImgBtnTooltip: "Edytuj zdjęcie",
      waterBtn: "Podlej",
      replantBtn: "Przesadź",
      fertilizeBtn: "Nawieź",
      manageBtn: "Zarządzaj",
      wateringSuccess: "Roślina została podlana",
      replantSuccess: "Roślina została przesadzona",
      fertilizeSuccess: "Roślina została nawieziona",
      goToPlantsBtn: "Moje rośliny",
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
      tempValidationMsg:
        "Wartość minimalna powinna być niższa niż wartość maksymalna",
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
        wateringBtnTooltip: "Podlej",
        replantBtnTooltip: "Przesadź",
        fertilizeBtnTooltip: "Nawieź",
        submitTreatmentBtn: "Wykonaj"
      },
      editImgModal: {
        title: "Zaktualizuj zdjęcie rośliny",
        plantImg: "Nowe zdjęcie",
        plantImgRequiredMsg: "Proszę wybrać zdjęcie",
        plantImgMessage: "Rozmiar zdjęcia może mieć maksymalnie 1MB",
        submitBtn: "Zapisz",
      },
      tabs: {
        info: "Informacje",
        treatments: "Zabiegi roślinne",
      },
    },
    confirmUser: {
      title: "Potwierdzenie konta",
      btnText: {
        resend: "Wyślij ponownie",
        goHome: "Powrót do strony głównej",
      },
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
      title: "Kontakt"
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
    inputMaxLengthMsg: "{0} może mieć maksymalnie {1} znaków"
  },
});

export default strings;
