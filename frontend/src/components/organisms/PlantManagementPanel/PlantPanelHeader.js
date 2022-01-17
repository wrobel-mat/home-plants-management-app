import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { editIcon, deleteIcon } from "assets/icons";

export default function PlantPanelHeader({
  name,
  species,
  toggleUpdatePlantModal,
  toggleDeletePlantModal,
}) {
  const { strings } = useLocalizedStrings();
  return (
    <div className="plant-panel-heading">
      <div className="plant-name">
        {name}
        {species && (
          <div className="plant-species">
            {strings.plant.species}: {species}
          </div>
        )}
      </div>
      <div className="plant-panel-heading-btns-wrapper">
        <button
          className="plant-panel-heading-btn"
          onClick={toggleUpdatePlantModal}
        >
          {editIcon}
          <div className="plant-panel-btn-tooltip">
            {strings.plant.editBtnTooltip}
          </div>
        </button>
        <button
          className="plant-panel-heading-btn"
          onClick={toggleDeletePlantModal}
        >
          {deleteIcon}
          <div className="plant-panel-btn-tooltip">
            {strings.plant.deleteBtnTooltip}
          </div>
        </button>
      </div>
    </div>
  );
}
