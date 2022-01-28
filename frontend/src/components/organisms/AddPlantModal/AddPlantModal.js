import { nanoid } from "nanoid";
import { useAddPlantMutation } from "store/api/plantsApi";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { useAuth } from "providers/AuthProvider";
import Modal from "components/molecules/Modal/Modal";
import Form from "components/molecules/Form/Form";
import Input from "components/molecules/Form/Input";
import Select from "components/molecules/Form/Select";
import Button from "components/atoms/Button/Button";
import { plantIcon } from "assets/icons";

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

export default function AddPlantModal({ isOpen, toggleIsOpen }) {
  const [addPlant] = useAddPlantMutation();
  const { strings } = useLocalizedStrings();
  const { authFallback, reloadUser } = useAuth();

  const FORM_FIELDS = {
    name: "newPlantName",
    species: "newPlantSpecies",
    location: "newPlantLocation",
    description: "newPlantDescription",
    soilType: "newPlantSoilType",
    sunlight: "newPlantSunlight",
    watering: "newPlantWatering",
    airHumidity: "newPlantAirHumidity",
    fertilizeFreq: "newPlantFertilizeFreq",
    minTemp: "newPlantMinTemp",
    maxTemp: "newPlantMaxTemp",
    airPurification: "newPlantAirPurification",
    toxicity: "newPlantToxicity",
    plantImg: "newPlantImg"
  };

  const ERROR_TO_FIELD_MAP = {
    "Max length for name is 50": FORM_FIELDS.name,
    "Max length for species is 50": FORM_FIELDS.species,
    "Max length for location is 50": FORM_FIELDS.location,
    "Max length for description is 200": FORM_FIELDS.description,
    "Max length for soilType is 50": FORM_FIELDS.soilType,
    "The minimum value must be less than the maximum value.": FORM_FIELDS.minTemp
  };

  const ERROR_TO_MSG_MAP = {
    "Max length for name is 50": strings.formatString(strings.inputMaxLengthMsg, strings.plant.name, 50),
    "Max length for species is 50": strings.formatString(strings.inputMaxLengthMsg, strings.plant.species, 50),
    "Max length for location is 50": strings.formatString(strings.inputMaxLengthMsg, strings.plant.location, 50),
    "Max length for description is 200": strings.formatString(strings.inputMaxLengthMsg, strings.plant.description, 200),
    "Max length for soilType is 50": strings.formatString(strings.inputMaxLengthMsg, strings.plant.soilType, 50),
    "The minimum value must be less than the maximum value.": strings.plant.formMessages.tempValidation
  };

  const setManualInputError = (setError, error) => {
    setError(
      ERROR_TO_FIELD_MAP[error],
      { type: "manual", message: ERROR_TO_MSG_MAP[error]},
      { shouldFocus: true }
    );
  };

  const submitAddPlant = async ({
    newPlantName,
    newPlantSpecies,
    newPlantLocation,
    newPlantDescription,
    newPlantSoilType,
    newPlantMinTemp,
    newPlantMaxTemp,
    newPlantAirHumidity,
    newPlantSunlight,
    newPlantWatering,
    newPlantFertilizeFreq,
    newPlantAirPurification,
    newPlantToxicity,
    newPlantImg,
    setError,
  }) => {
    if (!imgIsValid(newPlantImg[0])) {
      setError(FORM_FIELDS.plantImg, {
        type: "manual",
        message: strings.plant.formMessages.imgSize,
      });
      return;
    }
    const newPlant = {
      name: newPlantName,
      species: newPlantSpecies,
      location: newPlantLocation,
      description: newPlantDescription,
      soilType: newPlantSoilType,
      tempRange: {
        minTemp: newPlantMinTemp,
        maxTemp: newPlantMaxTemp
      },
      airHumidity: newPlantAirHumidity,
      sunlight: newPlantSunlight,
      watering: newPlantWatering,
      fertilizeFreq: newPlantFertilizeFreq,
      airPurification: newPlantAirPurification != 0,
      toxicity: newPlantToxicity != 0
    };
    const data = getFormData(newPlant, newPlantImg[0]);
    try {
      await addPlant(data).unwrap();
      reloadUser();
    } catch (e) {
      if (e === "Access JWT Invalid") {
        authFallback({
          callbackFn: (args) => {
            addPlant(args);
            toggleIsOpen();
          },
          args: data,
        });
      } else {
        const errors = e.split(";");
        errors.forEach(error => {
          if (error) {
            setManualInputError(setError, error);
          }});
        return;
      }
    }
    toggleIsOpen();
  };

  return (
    <Modal
      isOpen={isOpen}
      headerText={strings.plant.addPlantForm.header}
      headerIcon={plantIcon}
      onRequestClose={toggleIsOpen}
    >
      <Form
        onSubmit={submitAddPlant}
        disclaimer={strings.form.requiredFieldsDisclaimer}
      >
        <Input
          type="text"
          id={nanoid()}
          label={strings.plant.name + strings.form.requiredFieldMarker}
          name={FORM_FIELDS.name}
          placeholder={strings.plant.name}
          registerOpt={{
            required: strings.plant.formMessages.nameRequired,
          }}
        />
        <Input
          type="text"
          id={nanoid()}
          label={strings.plant.species}
          name={FORM_FIELDS.species}
          placeholder={strings.plant.species}
        />
        <Input
          type="text"
          name={FORM_FIELDS.location}
          id={nanoid()}
          label={strings.plant.location}
          placeholder={strings.plant.location}
        />
        <Input
          type="text"
          name={FORM_FIELDS.description}
          id={nanoid()}
          label={strings.plant.description}
          placeholder={strings.plant.description}
        />
        <Input
          type="text"
          name={FORM_FIELDS.soilType}
          id={nanoid()}
          label={strings.plant.soilType}
          placeholder={strings.plant.soilType}
        />
        <Select
          name={FORM_FIELDS.sunlight}
          id={nanoid()}
          label={strings.plant.sunlight}
        >
          <option value={0}>{strings.plant.noInformation}</option>
          <option value={1}>{strings.plant.sunlightOptions[1]}</option>
          <option value={2}>{strings.plant.sunlightOptions[2]}</option>
          <option value={3}>{strings.plant.sunlightOptions[3]}</option>
        </Select>
        <Select
          name={FORM_FIELDS.watering}
          id={nanoid()}
          label={strings.plant.watering}
        >
          <option value={0}>{strings.plant.noInformation}</option>
          <option value={1}>{strings.plant.wateringOptions[1]}</option>
          <option value={2}>{strings.plant.wateringOptions[2]}</option>
          <option value={3}>{strings.plant.wateringOptions[3]}</option>
        </Select>
        <Select
          name={FORM_FIELDS.airHumidity}
          id={nanoid()}
          label={strings.plant.airHumidity}
        >
          <option value={0}>{strings.plant.noInformation}</option>
          <option value={1}>{strings.plant.airHumidityOptions[1]}</option>
          <option value={2}>{strings.plant.airHumidityOptions[2]}</option>
          <option value={3}>{strings.plant.airHumidityOptions[3]}</option>
        </Select>
        <Select
          name={FORM_FIELDS.fertilizeFreq}
          id={nanoid()}
          label={strings.plant.fertilizeFreq}
        >
          <option value={0}>{strings.plant.noInformation}</option>
          <option value={1}>{strings.plant.fertilizeOptions[1]}</option>
          <option value={2}>{strings.plant.fertilizeOptions[2]}</option>
          <option value={3}>{strings.plant.fertilizeOptions[3]}</option>
          <option value={4}>{strings.plant.fertilizeOptions[4]}</option>
        </Select>
        <Input
          type="number"
          name={FORM_FIELDS.minTemp}
          id={nanoid()}
          label={strings.plant.minTemp}
        />
        <Input
          type="number"
          name={FORM_FIELDS.maxTemp}
          id={nanoid()}
          label={strings.plant.maxTemp}
        />
        <Select
          name={FORM_FIELDS.airPurification}
          id={nanoid()}
          label={strings.plant.airPurification}
        >
          <option value={0}>
            {strings.plant.airPurificationOptions.false}
          </option>
          <option value={1}>{strings.plant.airPurificationOptions.true}</option>
        </Select>
        <Select
          name={FORM_FIELDS.toxicity}
          id={nanoid()}
          label={strings.plant.toxicity}
        >
          <option value={0}>{strings.plant.toxicityOptions.false}</option>
          <option value={1}>{strings.plant.toxicityOptions.true}</option>
        </Select>
        <Input
          type="file"
          id={nanoid()}
          label={strings.plant.plantImg}
          name={FORM_FIELDS.plantImg}
          accept="image/jpeg, image/png"
        />
        <Button
          type="submit"
          text={strings.plant.addPlantForm.submitBtn}
          filled
        />
      </Form>
    </Modal>
  );
}
