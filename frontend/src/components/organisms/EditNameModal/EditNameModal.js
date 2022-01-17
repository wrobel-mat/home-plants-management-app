import { nanoid } from "nanoid";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { useApi } from "providers/ApiProvider";
import { useAuth } from "providers/AuthProvider";
import Modal from "components/molecules/Modal/Modal";
import Form from "components/molecules/Form/Form";
import Input from "components/molecules/Form/Input";
import Button from "components/atoms/Button/Button";

export default function EditNameModal({ isOpen, toggleIsOpen, user: { id, name } }) {
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
            message: strings.formatString(strings.inputMaxLengthMsg, strings.authPage.username.label, 100)
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
      headerText={strings.myaccount.editName.title}
    >
      <Form
        onSubmit={submitEditName}
        defaultValues={{ editNameNew: name }}
      >
        <Input
          name="editNameNew"
          type="text"
          id={nanoid()}
          label={strings.authPage.username.label}
          registerOpt={{
            required: strings.authPage.username.message.required,
          }}
        />
        <Button type="submit" text={strings.myaccount.saveBtn} filled />
      </Form>
    </Modal>
  );
}
