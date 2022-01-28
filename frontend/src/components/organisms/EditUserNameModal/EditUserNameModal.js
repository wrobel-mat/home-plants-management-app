import { nanoid } from "nanoid";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { useApi } from "providers/UserApiProvider";
import { useAuth } from "providers/AuthProvider";
import Modal from "components/molecules/Modal/Modal";
import Form from "components/molecules/Form/Form";
import Input from "components/molecules/Form/Input";
import Button from "components/atoms/Button/Button";

export default function EditUserNameModal({ isOpen, toggleIsOpen, user: { id, name } }) {
  const { strings } = useLocalizedStrings();
  const { editUserName } = useApi();
  const { reloadUser } = useAuth();

  const successHandler = () => {
    toggleIsOpen();
    reloadUser();
  };

  const submitEditName = async ({ editNameNew, setError }) => {
    if (editNameNew !== name) {
      const data = { userId: id, name: editNameNew };
      const { error } = await editUserName({ data, successHandler });
      if (error) {
        setError(
          "editNameNew",
          {
            type: "manual",
            message: strings.formatString(strings.inputMaxLengthMsg, strings.user.name, 100)
          },
          { shouldFocus: true }
        );
      }
    } else {
      toggleIsOpen();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleIsOpen}
      headerText={strings.user.editNameForm.header}
    >
      <Form
        onSubmit={submitEditName}
        defaultValues={{ editNameNew: name }}
      >
        <Input
          name="editNameNew"
          type="text"
          id={nanoid()}
          label={strings.user.name}
          registerOpt={{
            required: strings.user.formMessages.nameRequired,
          }}
        />
        <Button type="submit" text={strings.form.saveBtn} filled />
      </Form>
    </Modal>
  );
}
