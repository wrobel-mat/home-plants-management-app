import { useNavigate } from "react-router-dom";
import { useDeletePlantMutation } from "store/api/plantsApi";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { useAuth } from "providers/AuthProvider";
import Modal from "components/molecules/Modal/Modal";
import Button from "components/atoms/Button/Button";

export default function DeletePlantModal({ isOpen, toggleIsOpen, plant: { id, name } }) {
  const navigate = useNavigate();
  const { strings } = useLocalizedStrings();
  const { authFallback, reloadUser } = useAuth();
  const [deletePlant] = useDeletePlantMutation();

  const submitDeletePlant = () => {
    try {
      deletePlant(id);
      navigate("/");
      reloadUser();
    } catch (e) {
      if (e === "Access JWT Invalid") {
        authFallback({
          callbackFn: (args) => {
            deletePlant(args);
            navigate("/");
            reloadUser();
          },
          args: id,
        });
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleIsOpen}
      headerText={strings.formatString(
        strings.plant.deletePlantForm.header,
        name
      )}
    >
      <div className="modal-message">
        {strings.formatString(
          strings.plant.deletePlantForm.message,
          name
        )}
      </div>
      <Button
        type="button"
        text={strings.form.deleteBtn}
        onClick={submitDeletePlant}
        danger
      />
      <div style={{"height": "var(--spacing-s)"}}/>
      <Button
        type="button"
        text={strings.form.cancelBtn}
        onClick={toggleIsOpen}
      />
    </Modal>
  );
}
