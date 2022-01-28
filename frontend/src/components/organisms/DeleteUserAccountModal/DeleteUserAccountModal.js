import { nanoid } from "nanoid";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { useApi } from "providers/UserApiProvider";
import { useAuth } from "providers/AuthProvider";
import Modal from "components/molecules/Modal/Modal";
import Form from "components/molecules/Form/Form";
import Input from "components/molecules/Form/Input";
import Button from "components/atoms/Button/Button";

export default function DeleteUserAccountModal({ isOpen, toggleIsOpen, user: { email } }) {
  const { strings } = useLocalizedStrings();
  const { deleteUserAccount } = useApi();
  const { logout } = useAuth();

  const successHandler = () => {
      logout();
  };

  const submitDeleteAccount = async ({deleteAccountPassword, setError}) => {
    const credentials = {
        username: email,
        password: deleteAccountPassword
    };
    const { error } = await deleteUserAccount({ credentials, successHandler });
    if (error == "Bad credentials") {
        setError(
            "deleteAccountPassword",
            { type: "manual", message: strings.myaccount.message[error]},
            { shouldFocus: true }
        );
    };
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleIsOpen}
      headerText={strings.user.deleteAccountForm.header}
    >
      <div className="modal-message">
        {strings.user.deleteAccountForm.message}
      </div>
      <Form onSubmit={submitDeleteAccount} disclaimer={strings.form.requiredFieldsDisclaimer}>
        <Input
            name="deleteAccountPassword"
            type="password"
            id={nanoid()}
            label={strings.user.password + strings.form.requiredFieldMarker}
            placeholder={strings.user.password}
            registerOpt={{
                required: strings.user.formMessages.passwordRequired,
            }}
        />
        <Button
            type="submit"
            text={strings.form.deleteBtn}
            danger
        />
        <div style={{"height": "var(--spacing-s)"}}/>
        <Button
            type="button"
            text={strings.form.cancelBtn}
            onClick={toggleIsOpen}
        />
      </Form>
    </Modal>
  );
}