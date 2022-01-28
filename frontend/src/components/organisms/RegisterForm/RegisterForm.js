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
      setManualError(setError, "registerEmail", strings.user.formMessages.emailInUse);
    },
    "Max length for name is 100": (setError) => {
      setManualError(setError,
        "registerName",
        strings.formatString(strings.inputMaxLengthMsg, strings.user.name, 100));
    },
    "Max length for email is 100": (setError) => {
      setManualError(setError,
        "registerEmail",
        strings.formatString(strings.inputMaxLengthMsg, strings.user.email, 100));
    },
    "Max length for password is 100": (setError) => {
      setManualError(setError,
        "registerPassword",
        strings.formatString(strings.inputMaxLengthMsg, strings.user.password, 100));
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
      disclaimer={strings.form.requiredFieldsDisclaimer}
    >
      <Input
        name="registerName"
        type="text"
        id={nanoid()}
        label={strings.user.name + strings.form.requiredFieldMarker}
        placeholder={strings.user.name}
        icon={avatarIcon}
        registerOpt={{
          required: strings.user.formMessages.nameRequired,
        }}
      />
      <Input
        name="registerEmail"
        type="text"
        id={nanoid()}
        label={strings.user.email + strings.form.requiredFieldMarker}
        placeholder={strings.user.email}
        icon={envelopeIcon}
        registerOpt={{
          required: strings.user.formMessages.emailRequired,
          pattern: {
            value: emailRegexPattern,
            message: strings.user.formMessages.emailPattern
          },
        }}
      />
      <Input
        name="registerPassword"
        type="password"
        id={nanoid()}
        label={strings.user.password + strings.form.requiredFieldMarker}
        placeholder={strings.user.password}
        icon={keyIcon}
        registerOpt={{
          required: strings.user.formMessages.passwordRequired,
        }}
      />
      <Button text={strings.form.registerBtn} type="submit" filled />
    </Form>
  );
}
