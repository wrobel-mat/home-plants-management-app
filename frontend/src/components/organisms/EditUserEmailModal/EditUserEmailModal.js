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

export default function EditUserEmailModal({ isOpen, toggleIsOpen, user: { id, email } }) {
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
      headerText={strings.user.editEmailForm.header}
    >
      <MyAccountDataSectionListItem
        name={strings.user.editEmailForm.currentEmail}
        value={email}
      />
      <Form onSubmit={submitEditEmail}>
        <Input
          name={FORM_FIELDS.newEmail}
          type="text"
          id={nanoid()}
          label={strings.user.editEmailForm.newEmail}
          placeholder={strings.user.editEmailForm.newEmail}
          registerOpt={{
            required: strings.user.formMessages.emailRequired,
            pattern: {
              value: emailRegexPattern,
              message: strings.user.formMessages.emailPattern,
            },
          }}
        />
        <Input
          name={FORM_FIELDS.confirmEmail}
          type="text"
          id={nanoid()}
          label={strings.user.editEmailForm.confirmNewEmail}
          placeholder={strings.user.editEmailForm.confirmNewEmail}
          registerOpt={{
            required: strings.user.formMessages.emailRequired,
            pattern: {
              value: emailRegexPattern,
              message: strings.user.formMessages.emailPattern,
            },
          }}
        />
        <Input
          name={FORM_FIELDS.password}
          type="password"
          id={nanoid()}
          label={strings.user.password}
          placeholder={strings.user.password}
          registerOpt={{
            required: strings.user.formMessages.passwordRequired,
          }}
        />
        <Button type="submit" text={strings.form.saveBtn} filled />
      </Form>
    </Modal>
  );
}
