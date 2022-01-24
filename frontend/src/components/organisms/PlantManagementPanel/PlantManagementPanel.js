import { useState } from "react";
import PlantPanelHeader from "./PlantPanelHeader";
import PlantImg from "./PlantImg";
import PlantTabs from "./PlantTabs";
import DeletePlantModal from "components/organisms/DeletePlantModal/DeletePlantModal";
import EditPlantModal from "components/organisms/EditPlantModal/EditPlantModal";
import EditPlantImgModal from "components/organisms/EditPlantImgModal/EditPlantImgModal";
import "./PlantManagementPanel.css";

export default function PlantManagementPanel({ plant }) {
  const [isDeletePlantModalOpen, setIsDeletePlantModalOpen] = useState(false);
  const [isEditPlantModalOpen, setIsEditPlantModalOpen] = useState(false);
  const [isEditPlantImgModalOpen, setIsEditPlantImgModalOpen] = useState(false);

  const { name, species, mainImgUri } = plant;
  const imgFilePath = mainImgUri
    ? mainImgUri
    : "../default-plant-img.svg";

  const toggleDeletePlantModal = () => {
    setIsDeletePlantModalOpen(!isDeletePlantModalOpen);
  };

  const toggleEditPlantModal = () => {
    setIsEditPlantModalOpen(!isEditPlantModalOpen);
  };

  const toggleEditPlantImgModal = () => {
    setIsEditPlantImgModalOpen(!isEditPlantImgModalOpen);
  };

  return (
    <>
      <div className="plant-panel">
        <PlantPanelHeader
          name={name}
          species={species}
          toggleUpdatePlantModal={toggleEditPlantModal}
          toggleDeletePlantModal={toggleDeletePlantModal}
        />
        <PlantImg
          imgFilePath={imgFilePath}
          toggleEditPlantImgModal={toggleEditPlantImgModal}
        />
        <PlantTabs plant={plant} />
      </div>
      <DeletePlantModal
        isOpen={isDeletePlantModalOpen}
        toggleIsOpen={toggleDeletePlantModal}
        plant={plant}
      />
      <EditPlantModal
        isOpen={isEditPlantModalOpen}
        toggleIsOpen={toggleEditPlantModal}
        plant={plant}
      />
      <EditPlantImgModal
        isOpen={isEditPlantImgModalOpen}
        toggleIsOpen={toggleEditPlantImgModal}
        plantId={plant.id}
      />
    </>
  );
}
