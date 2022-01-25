import { nanoid } from "nanoid";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { useApi } from "providers/UserApiProvider";
import emailRegexPattern from "util/emailRegexPattern";
import Form from "components/molecules/Form/Form";
import Input from "components/molecules/Form/Input";
import Button from "components/atoms/Button/Button";
import { avatarIcon, envelopeIcon, keyIcon } from "assets/icons";

const setManualError = (setError, inputName, message) => {
  setError(
    inputName,
    { type: "manual", message },
    { shouldFocus: true }
  );
}

export default function RegisterForm() {
  const { strings } = useLocalizedStrings();
  const { registerUser } = useApi();

  const SET_ERROR_MAP = {
    "User Already Registered": (setError, error) => {
      setManualError(setError, "registerEmail", strings.authPage.register.message[error]);
    },
    "Max length for name is 100": (setError) => {
      setManualError(setError,
        "registerName",
        strings.formatString(strings.inputMaxLengthMsg, strings.authPage.username.label, 100));
    },
    "Max length for email is 100": (setError) => {
      setManualError(setError,
        "registerEmail",
        strings.formatString(strings.inputMaxLengthMsg, strings.authPage.email.label, 100));
    },
    "Max length for password is 100": (setError) => {
      setManualError(setError,
        "registerPassword",
        strings.formatString(strings.inputMaxLengthMsg, strings.authPage.password.label, 100));
    }
  }

  const handleRegister = async ({
    registerEmail,
    registerPassword,
    registerName,
    setError,
    reset,
  }) => {
    const response = await registerUser({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });

    if (response !== undefined) {
      const { error } = response;
      if (error) {
        error.split(";").forEach(e => {
          if (e) {
            SET_ERROR_MAP[e](setError, e);
          }
        })
      } else {
        reset();
      }
    }
  };

  return (
    <Form
      onSubmit={handleRegister}
      disclaimer={strings.authPage.register.disclaimer}
    >
      <Input
        name="registerName"
        type="text"
        id={nanoid()}
        label={strings.authPage.username.label + "*"}
        placeholder={strings.authPage.username.placeholder}
        icon={avatarIcon}
        registerOpt={{
          required: strings.authPage.username.message.required,
        }}
      />
      <Input
        name="registerEmail"
        type="text"
        id={nanoid()}
        label={strings.authPage.email.label + "*"}
        placeholder={strings.authPage.email.placeholder}
        icon={envelopeIcon}
        registerOpt={{
          required: strings.authPage.email.message.required,
          pattern: {
            value: emailRegexPattern,
            message: strings.authPage.email.message.pattern,
          },
        }}
      />
      <Input
        name="registerPassword"
        type="password"
        id={nanoid()}
        label={strings.authPage.password.label + "*"}
        placeholder={strings.authPage.password.placeholder}
        icon={keyIcon}
        registerOpt={{
          required: strings.authPage.password.message.required,
        }}
      />
      <Button text={strings.authPage.register.label} type="submit" filled />
    </Form>
  );
}
