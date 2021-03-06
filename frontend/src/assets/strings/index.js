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
      waterBtnSubmitted: "Watered ???",
      replantBtn: "Replant",
      fertilizeBtn: "Fertilize",
      fertilizeBtnSubmitted: "Fertilized ???",
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
      tempRange: "Temperature range (min - max ??C)",
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
      deleteBtn: "Usu??",
      loginBtn: "Zaloguj si??",
      registerBtn: "Zarejestruj si??"
    },
    user: {
      name: "Imi??",
      email: "Adres e-mail",
      password: "Has??o",
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
        header: "Zmie?? adres e-mail",
        currentEmail: "Aktualny adres e-mail",
        newEmail: "Nowy adres e-mail",
        confirmNewEmail: "Potwierd?? nowy adres e-mail"
      },
      editPasswordForm: {
        header: "Zmie?? has??o",
        currentPassword: "Aktualne has??o",
        newPassword: "Nowe has??o",
        confirmNewPassword: "Potwierd?? has??o"
      },
      deleteAccountForm: {
        header: "Usu?? konto",
        message: "Wszystkie dane zwi??zane z Twoim kontem zostan?? utracone. Podaj has??o, aby usun???? konto."
      },
      formMessages: {
        nameRequired: "*Wprowad?? swoje imi??",
        emailRequired: "*Wprowad?? sw??j adres e-mail",
        passwordRequired: "*Wprowad?? has??o",
        emailPattern: "*Wprowad?? poprawny adres e-mail (np. marie.curie@passy.fr)",
        emailInUse: "*Ten adres e-mail jest ju?? wykorzystany. Podaj inny adres e-mail."
      }
    },
    footer: {
      about: "O stronie",
      sourceCode: "GitHub",
      contact: "Kontakt",
    },
    navigation: {
      myaccount: "Moje konto",
      plants: "Moje ro??liny",
      timeline: "Moja historia",
      explore: "Eksploruj",
      about: "O stronie",
      contact: "Kontakt",
      logout: "Wyloguj si??",
    },
    myaccount: {
      title: "Moje dane",
      description:
        "Tutaj mo??esz zobaczy?? i zaktualizowa?? swoje dane. Mo??esz zmieni?? sw??j e-mail i has??o.",
      dataLabel: {
        name: "Imi??",
        email: "Tw??j e-mail",
        password: "Twoje has??o",
        dateCreated: "Konto aktywne od",
        plantsQty: "Ilo???? ro??lin",
        deleteAccount: "Usu?? konto"
      },
      message: {
        "Bad credentials": "*Podane has??o jest nieprawid??owe.",
        "User Already Registered":
          "*Ten adres e-mail jest ju?? wykorzystywany. Podaj inny adres e-mail.",
        "Email Not Confirmed":
          "*Wprowadzone adresy e-mail r????ni?? si?? od siebie.",
        "Password Not Confirmed": "*Wprowadzone has??a r????ni?? si?? od siebie.",
        "Max length for email is 100": "Adres e-mail mo??e mie?? maksymalnie 100 znak??w.",
        "Max length for name is 100": "Imi?? mo??e mie?? maksymalnie 100 znak??w.",
        "Max length for password is 100": "Has??o mo??e mie?? maksymalnie 100 znak??w."
      },
    },
    plants: {
      title: "Moje ro??liny",
      addPlantBtn: "Dodaj now?? ro??lin??",
      noPlantsMsg: "Dodaj swoj?? pierwsz?? ro??lin??"
    },
    plant: {
      title: "Zarz??dzaj ro??lin??",
      pageDescription:
        "Aktualizuj ostatnie wydarzenia z ??ycia swojej ro??liny, edytuj i dodawaj bardziej szczeg????owe informacje na jej temat.",
      tabs: {
        info: "Informacje",
        treatments: "Zabiegi ro??linne",
      },
      plantImg: "Zdj??cie",
      dateAdded: "Data dodania",
      editBtnTooltip: "Edytuj",
      deleteBtnTooltip: "Usu??",
      editImgBtnTooltip: "Edytuj zdj??cie",
      waterBtn: "Podlej",
      waterBtnSubmitted: "Podlana ???",
      replantBtn: "Przesad??",
      fertilizeBtn: "Nawie??",
      fertilizeBtnSubmitted: "Nawieziona ???",
      manageBtn: "Zarz??dzaj",
      wateringSuccess: "Ro??lina zosta??a podlana",
      replantSuccess: "Ro??lina zosta??a przesadzona",
      fertilizeSuccess: "Ro??lina zosta??a nawieziona",
      goToPlantsBtn: "Moje ro??liny",
      name: "Nazwa",
      species: "Gatunek",
      basicInfo: "Podstawowe informacje",
      location: "Gdzie przebywa",
      description: "Opis",
      needs: "Potrzeby ro??liny",
      soilType: "Rodzaj ziemi",
      sunlight: "Nas??onecznienie",
      sunlightOptions: {
        1: "Miejsce zacienione (2 - 3 metry od okna)",
        2: "Miejsce p????cieniste (0,5 - 1 metr od okna)",
        3: "Miejsce o??wietlone (przy oknie)",
      },
      airHumidity: "Wilgotno???? powietrza",
      airHumidityOptions: {
        1: "Niska (nie wymaga zraszania)",
        2: "??rednia (nale??y regularnie zrasza??)",
        3: "Wysoka (nale??y codziennie zrasza??)",
      },
      tempRange: "Zakres temperatury",
      minTemp: "Temperatura minimalna",
      maxTemp: "Temperatura maksymalna",
      watering: "Podlewanie",
      wateringOptions: {
        1: "Rzadko ale obficie, podlewa?? gdy ziemia lekko przeschnie",
        2: "Regularnie i umiarkowanie, podlewa?? gdy ziemia lekko przeschnie",
        3: "Regularnie i obficie, ziemia powinna by?? stale wilgotna",
      },
      fertilizeFreq: "Nawo??enie",
      fertilizeOptions: {
        1: "Nie nawozi??",
        2: "Rzadziej ni?? raz na miesi??c",
        3: "1 - 2 razy w miesi??cu",
        4: "3 - 4 razy w miesi??cu",
      },
      healthAspects: "Aspekty zdrowotne",
      airPurification: "Oczyszcza potwietrze",
      airPurificationOptions: {
        true: "Tak",
        false: "Nie",
      },
      toxicity: "Toksyczna dla zwierz??t",
      toxicityOptions: {
        true: "Tak",
        false: "Nie",
      },
      noInformation: "Brak informacji",
      events: {
        sectionTitle: "Zabiegi ro??linne",
        watering: "Podlewanie",
        replant: "Przesadzanie",
        fertilization: "Nawo??enie",
        lastWatering: "Ostatnie podlewanie",
        lastReplanting: "Ostatnie przesadzanie",
        lastFertilization: "Ostatnie nawo??enie",
        noWatering: "Ta ro??lina nie by??a jeszcze podlewana",
        noReplanting: "Ta ro??lina nie by??a jeszcze przesadzana",
        noFertilization: "Ta ro??lina nie by??a jeszcze nawo??ona",
        submitTreatmentBtn: "Wykonaj",
        submitTreatmentBtnDone: "Wykonane"
      },
      addPlantForm: {
        header: "Dodaj now?? ro??lin??",
        submitBtn: "Dodaj ro??lin??"
      },
      deletePlantForm: {
        header: "Usu?? {0}",
        message:
          "Wszystkie informacje zwi??zane z t?? ro??lin?? zostan?? utracone. Czy na pewno chcesz usun???? {0}?"
      },
      editPlantDetailsForm: {
        header: "Aktualizuj informacje o ro??linie"
      },
      editImgForm: {
        header: "Zaktualizuj zdj??cie ro??liny",
        plantImg: "Nowe zdj??cie",
      },
      formMessages: {
        nameRequired: "*Twoja ro??lina musi mie?? nazw??",
        imgRequired: "*Prosz?? wybra?? zdj??cie",
        imgSize: "*Rozmiar zdj??cia mo??e mie?? maksymalnie 1 MB",
        tempValidation: "*Warto???? minimalna powinna by?? ni??sza ni?? warto???? maksymalna",
      }
    },
    confirmUser: {
      title: "Potwierdzenie konta",
      btnText: {
        resend: "Wy??lij ponownie",
        goHome: "Powr??t do strony g????wnej",
      },
    },
    welcomePage: {
      title: "Witaj na Home Jungle!",
      firstParagraph: "Ta strona powsta??a z mi??o??ci do zielonych grz??dek, wiosennych p??k??w i m??odych p??d??w, korzeni, li??ci i chlorofilu.",
      secondParagraph: "Je??li tak jak ja przepadasz za towarzystwem swoich ro??linnych towarzyszy i poszukujesz sposob??w by u??atwi?? sobie ich skuteczn?? piel??gnacj??, to zdecydowanie miejsce dla Ciebie.",
      thirdParagraph: "Strona pozwoli Ci monitorowa?? wzrost i prowadzenie Twoich ro??lin. Znajdziesz tu kilka przydatnych narz??dzi u??atwiaj??cych systematyczn?? piel??gnacj??, z uwzgl??dnieniem indywidualnych preferencji gatunku jak np. preferowane stanowisko, odczyn gleby czy cz??stotliwo???? nawadniania. Mam nadziej??, ??e dzi??ki nim doszlifujesz swoje ogrodnicze skille, a Twoje ro??liny b??d?? bujne i zdrowe.",
      fourthParagraph: "Znajd?? sw??j przepis na domow?? d??ungl??.",
      authBtn: "Zaloguj / Zarejestruj si??"
    },
    notFoundPage: {
      title: "404",
      content: "Wygl??da na to, ??e zab????dzi??u??.",
      goHome: "Powr??t do strony g????wnej",
    },
    aboutPage: {
      title: "O stronie"
    },
    contactPage: {
      title: "Kontakt",
      createdBy: "Autor",
      myName: "Mateusz Wr??bel",
      contactInfo: "Dane kontaktowe",
      email: "Adres e-mail: ",
      phoneNumber: "Tel.: "
    },
    timelinePage: {
      title: "Moja historia"
    },
    siteUnderConstruction: "Strona w budowie",
    serverResponseMessage: {
      "Bad credentials": "Podano nieprawid??owy e-mail lub has??o.",
      "Register User Successful":
        "Twoje konto zosta??o poprawnie utworzone. Sprawd?? sw??j e-mail aby potwierdzi?? za??o??enie konta i zalogowa?? si?? do serwisu.",
      "User Already Registered":
        "*Ten adres e-mail jest ju?? wykorzystany. Podaj inny adres e-mail.",
      "User is disabled":
        "Twoje konto nie zosta??o aktywowane. Sprawd?? sw??j e-mail aby potwierdzi?? za??o??enie konta.",
      "Confirm User Successful":
        "Twoje konto zosta??o potwierdzone z powodzeniem. Mo??esz zalogowa?? si?? do serwisu podaj??c sw??j e-mail i has??o.",
      "Resend Confirmation Successful":
        "Wiadomo???? z linkiem potwierdzaj??cym rejestracj?? konta zosta??a wys??ana ponownie na Tw??j adres e-mail.",
      "User Already Confirmed": "Twoje konto zosta??o ju?? potwierdzone.",
      "Confirmation Token Expired":
        "Tw??j token utraci?? wa??no????. Kliknij poni??ej aby wys??a?? e-mail z potwierdzeniem ponownie.",
      "Confirmation Token Not Expired":
        "Tw??j obecny token jest wci???? wa??ny. Sprawd?? sw??j e-mail aby potwierdzi?? za??o??enie konta.",
      "Confirmation Token Not Found": "Tw??j token nie istnieje.",
      "Edit User Name Successful":
        "Twoje dane zosta??y zaktualizowane pomy??lnie.",
      "Edit User Email Successful":
        "Tw??j e-mail zosta?? zaktualizowany pomy??lnie.",
      "Edit User Password Successful":
        "Twoje has??o zosta??o zaktualizowane pomy??lnie.",
      "Email Connection Refused": "Nie uda??o si?? wys??a?? powiadomienia e-mail.",
      noConfirmationParams: "Brak danych do potwierdzenia.",
      serverError: "B????d serwera.",
      undefined: "Przepraszamy, co?? posz??o nie tak.",
    },
    inputMaxLengthMsg: "*{0} mo??e mie?? maksymalnie {1} znak??w"
  },
});

export default strings;
