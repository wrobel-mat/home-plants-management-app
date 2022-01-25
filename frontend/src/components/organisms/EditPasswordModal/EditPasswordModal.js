import { nanoid } from "nanoid";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { useApi } from "providers/UserApiProvider";
import { useAuth } from "providers/AuthProvider";
import Modal from "components/molecules/Modal/Modal";
import Form from "components/molecules/Form/Form";
import Input from "components/molecules/Form/Input";
import Button from "components/atoms/Button/Button";

export default function EditPasswordModal({ isOpen, toggleIsOpen, user: { id, email } }) {
  const { strings } = useLocalizedStrings();
  const { editUserPassword } = useApi();
  const { reloadUser } = useAuth();

  const FORM_FIELDS = {
    currentPassword: "editPasswordCurrent",
    newPassword: "editPasswordNew",
    confirmPassword: "editPasswordConfirm",
  };

  const ERROR_TO_FIELD_MAP = {
    "Bad credentials": FORM_FIELDS.currentPassword,
    "Password Not Confirmed": FORM_FIELDS.confirmPassword,
    "Max length for password is 100": FORM_FIELDS.newPassword
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

  const submitEditPassword = async ({
    editPasswordCurrent,
    editPasswordNew,
    editPasswordConfirm,
    setError,
  }) => {
    if (editPasswordNew !== editPasswordConfirm) {
      setManualInputError(setError, "Password Not Confirmed");
    } else {
      const credentials = {
        username: email,
        password: editPasswordCurrent,
      };
      const data = { userId: id, password: editPasswordNew };
      const { error } = await editUserPassword({
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
      headerText={strings.myaccount.editPassword.title}
    >
      <Form onSubmit={submitEditPassword}>
        <Input
          name={FORM_FIELDS.currentPassword}
          type="password"
          id={nanoid()}
          label={strings.authPage.password.label}
          placeholder={strings.authPage.password.placeholder}
          registerOpt={{
            required: strings.authPage.password.message.required,
          }}
        />
        <Input
          name={FORM_FIELDS.newPassword}
          type="password"
          id={nanoid()}
          label={strings.myaccount.editPassword.input.newPassword}
          placeholder={strings.authPage.password.placeholder}
          registerOpt={{
            required: strings.authPage.password.message.required,
          }}
        />
        <Input
          name={FORM_FIELDS.confirmPassword}
          type="password"
          id={nanoid()}
          label={strings.myaccount.editPassword.input.confirmNewPassword}
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
