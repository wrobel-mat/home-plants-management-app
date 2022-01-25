import { nanoid } from "nanoid";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { useApi } from "providers/UserApiProvider";
import { useAuth } from "providers/AuthProvider";
import emailRegexPattern from "util/emailRegexPattern";
import Modal from "components/molecules/Modal/Modal";
import Form from "components/molecules/Form/Form";
import Input from "components/molecules/Form/Input";
import Button from "components/atoms/Button/Button";
import MyAccountDataSectionListItem from "components/molecules/MyAccount/MyAccountDataSectionListItem";

export default function EditEmailModal({ isOpen, toggleIsOpen, user: { id, email } }) {
  const { strings } = useLocalizedStrings();
  const { editUserEmail } = useApi();
  const { reloadUser } = useAuth();

  const FORM_FIELDS = {
    newEmail: "editEmailNew",
    confirmEmail: "editEmailConfirm",
    password: "editEmailPassword",
  };

  const ERROR_TO_FIELD_MAP = {
    "User Already Registered": FORM_FIELDS.newEmail,
    "Email Not Confirmed": FORM_FIELDS.confirmEmail,
    "Bad credentials": FORM_FIELDS.password,
    "Max length for email is 100": FORM_FIELDS.newEmail
  };

  const setManualInputError = (setError, error) => {
    setError(
      ERROR_TO_FIELD_MAP[error],
      { type: "manual", message: strings.myaccount.message[error] },
      { shouldFocus: true }
    );
  };

  const successHandler = () => {
    toggleIsOpen();
    reloadUser();
  };

  const submitEditEmail = async ({
    editEmailNew,
    editEmailConfirm,
    editEmailPassword,
    setError,
  }) => {
    if (editEmailNew !== editEmailConfirm) {
      setManualInputError(setError, "Email Not Confirmed");
    } else {
      const credentials = {
        username: email,
        password: editEmailPassword,
      };
      const data = { userId: id, email: editEmailNew };
      const { error } = await editUserEmail({
        credentials,
        data,
        successHandler,
      });
      if (error) {
        setManualInputError(setError, error);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleIsOpen}
      headerText={strings.myaccount.editEmail.title}
    >
      <MyAccountDataSectionListItem
        name={strings.myaccount.editEmail.input.currentEmail}
        value={email}
      />
      <Form onSubmit={submitEditEmail}>
        <Input
          name={FORM_FIELDS.newEmail}
          type="text"
          id={nanoid()}
          label={strings.myaccount.editEmail.input.newEmail}
          placeholder={strings.authPage.email.placeholder}
          registerOpt={{
            required: strings.authPage.email.message.required,
            pattern: {
              value: emailRegexPattern,
              message: strings.authPage.email.message.pattern,
            },
          }}
        />
        <Input
          name={FORM_FIELDS.confirmEmail}
          type="text"
          id={nanoid()}
          label={strings.myaccount.editEmail.input.confirmNewEmail}
          placeholder={strings.authPage.email.placeholder}
          registerOpt={{
            required: strings.authPage.email.message.required,
            pattern: {
              value: emailRegexPattern,
              message: strings.authPage.email.message.pattern,
            },
          }}
        />
        <Input
          name={FORM_FIELDS.password}
          type="password"
          id={nanoid()}
          label={strings.authPage.password.label}
          placeholder={strings.authPage.password.placeholder}
          registerOpt={{
            required: strings.authPage.password.message.required,
          }}
        />
        <Button type="submit" text={strings.myaccount.saveBtn} filled />
      </Form>
    </Modal>
  );
}
