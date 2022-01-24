import { nanoid } from "nanoid";
import { useAddPlantMutation } from "store/api/plantsApi";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { useAuth } from "providers/AuthProvider";
import Modal from "components/molecules/Modal/Modal";
import Form from "components/molecules/Form/Form";
import Input from "components/molecules/Form/Input";
import Button from "components/atoms/Button/Button";
import { plantIcon } from "assets/icons";

export default function AddPlantModal({ isOpen, toggleIsOpen }) {
  const [addPlant] = useAddPlantMutation();
  const { strings } = useLocalizedStrings();
  const { authFallback, reloadUser } = useAuth();

  const SET_ERROR_MAP = {
    "Max length for name is 50": (setError) => {
      setError(
        "newPlantName",
        { type: "manual", message: strings.formatString(strings.inputMaxLengthMsg, strings.plants.updatePlantModal.plantName, 50)},
        { shouldFocus: true }
      );
    },
    "Max length for species is 50": (setError) => {
      setError(
        "newPlantSpecies",
        { type: "manual", message: strings.formatString(strings.inputMaxLengthMsg, strings.plants.addPlantModal.plantSpecies, 50)},
        { shouldFocus: true }
      );
    }
  }

  const imgIsValid = (img) => {
    return !(img && img.size > 1048576);
  };

  const getFormData = (plant, plantImg) => {
    const formData = new FormData();
    formData.append(
      "plant",
      new Blob([JSON.stringify(plant)], { type: "application/json" })
    );
    formData.append("plant_img", plantImg);
    return formData;
  };

  const submitAddPlant = async ({
    newPlantName,
    newPlantSpecies,
    newPlantImg,
    setError,
  }) => {
    if (!imgIsValid(newPlantImg[0])) {
      setError("newPlantImg", {
        type: "manual",
        message: strings.plants.addPlantModal.plantImgMessage,
      });
      return;
    }
    const newPlant = {
      name: newPlantName,
      species: newPlantSpecies,
      location: undefined,
      description: undefined,
      soilType: undefined,
      tempRange: {
        minTemp: undefined,
        maxTemp: undefined
      },
      airHumidity: undefined,
      sunlight: undefined,
      watering: undefined,
      fertilizeFreq: undefined,
      airPurification: undefined,
      toxicity: undefined
    };
    const data = getFormData(newPlant, newPlantImg[0]);
    try {
      await addPlant(data).unwrap();
      reloadUser();
    } catch (e) {
      if (e === "Access JWT Invalid") {
        authFallback({
          callbackFn: addPlant,
          args: data,
        });
      } else {
        const errors = e.split(";");
        errors.forEach(error => {
          if (error) {
            SET_ERROR_MAP[error](setError)
          }});
        return;
      }
    }
    toggleIsOpen();
  };

  return (
    <Modal
      isOpen={isOpen}
      headerText={strings.plants.addPlantModal.title}
      headerIcon={plantIcon}
      onRequestClose={toggleIsOpen}
    >
      <Form
        onSubmit={submitAddPlant}
        disclaimer={strings.plants.addPlantModal.disclaimer}
      >
        <Input
          type="text"
          id={nanoid()}
          label={strings.plants.addPlantModal.plantName}
          name="newPlantName"
          placeholder={strings.plants.addPlantModal.plantNamePlaceholder}
          registerOpt={{
            required: strings.plants.addPlantModal.plantNameRequiredMsg,
          }}
        />
        <Input
          type="text"
          id={nanoid()}
          label={strings.plants.addPlantModal.plantSpecies}
          name="newPlantSpecies"
          placeholder={strings.plants.addPlantModal.plantSpeciesPlaceholder}
        />
        <Input
          type="file"
          id={nanoid()}
          label={strings.plants.addPlantModal.plantImg}
          name="newPlantImg"
          accept="image/jpeg, image/png"
        />
        <Button
          type="submit"
          text={strings.plants.addPlantModal.submitBtn}
          filled
        />
      </Form>
    </Modal>
  );
}
