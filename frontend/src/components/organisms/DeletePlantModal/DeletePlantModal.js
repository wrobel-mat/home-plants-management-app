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

  const submitDeletePlant = async () => {
    try {
      await deletePlant(id).unwrap();
      navigate("/");
      reloadUser();
    } catch (e) {
      if (e === "Access JWT Invalid") {
        authFallback({
          callbackFn: (args) => {
            deletePlant(args);
            navigate.push("/");
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
        strings.plants.deletePlantModal.title,
        name
      )}
    >
      <div className="plant-item-modal-message">
        {strings.formatString(
          strings.plants.deletePlantModal.message,
          name
        )}
      </div>
      <Button
        type="button"
        text={strings.plants.deletePlantModal.deleteBtn}
        onClick={submitDeletePlant}
        filled
      />
      <div style={{"height": "var(--spacing-s)"}}/>
      <Button
        type="button"
        text={strings.plants.deletePlantModal.cancelBtn}
        onClick={toggleIsOpen}
      />
    </Modal>
  );
}
