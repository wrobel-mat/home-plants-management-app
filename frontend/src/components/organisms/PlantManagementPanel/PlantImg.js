import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { editIcon } from "assets/icons";

export default function PlantImg({ imgFilePath, toggleEditPlantImgModal }) {
  const { strings } = useLocalizedStrings();
  return (
    <div className="plant-img-container">
      <img className="plant-img" alt="plant-img" src={imgFilePath} />
      <button className="plant-img-edit-btn" onClick={toggleEditPlantImgModal}>
        {editIcon}
        <div className="plant-panel-btn-tooltip plant-img-edit-btn-tooltip">
          {strings.plant.editImgBtnTooltip}
        </div>
      </button>
    </div>
  );
}
