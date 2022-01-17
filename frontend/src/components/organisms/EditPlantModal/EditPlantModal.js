import { nanoid } from "nanoid";
import { useUpdatePlantMutation } from "store/api/plantsApi";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { useAuth } from "providers/AuthProvider";
import Modal from "components/molecules/Modal/Modal";
import Form from "components/molecules/Form/Form";
import Input from "components/molecules/Form/Input";
import Button from "components/atoms/Button/Button";
import Select from "components/molecules/Form/Select";

export default function EditPlantModal({ isOpen, toggleIsOpen, plant }) {
  const [updatePlant] = useUpdatePlantMutation();
  const { strings } = useLocalizedStrings();
  const { authFallback } = useAuth();

  const FORM_FIELDS = {
    name: "updatedPlantName",
    species: "updatedPlantSpecies",
    location: "updatedPlantLocation",
    description: "updatedPlantDescription",
    soilType: "updatedPlantSoilType",
    sunlight: "updatedPlantSunlight",
    watering: "updatedPlantWatering",
    airHumidity: "updatedPlantAirHumidity",
    fertilizeFreq: "updatedPlantFertilizeFreq",
    minTemp: "updatedPlantMinTemp",
    maxTemp: "updatedPlantMaxTemp",
    airPurification: "updatedPlantAirPurification",
    toxicity: "updatedPlantToxicity",
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
    "Max length for name is 50": strings.formatString(strings.inputMaxLengthMsg, strings.plants.updatePlantModal.plantName, 50),
    "Max length for species is 50": strings.formatString(strings.inputMaxLengthMsg, strings.plant.species, 50),
    "Max length for location is 50": strings.formatString(strings.inputMaxLengthMsg, strings.plant.location, 50),
    "Max length for description is 200": strings.formatString(strings.inputMaxLengthMsg, strings.plant.description, 200),
    "Max length for soilType is 50": strings.formatString(strings.inputMaxLengthMsg, strings.plant.soilType, 50),
    "The minimum value must be less than the maximum value.": strings.plant.tempValidationMsg
  };

  const setManualInputError = (setError, error) => {
    setError(
      ERROR_TO_FIELD_MAP[error],
      { type: "manual", message: ERROR_TO_MSG_MAP[error]},
      { shouldFocus: true }
    );
  };

  const submitUpdatePlant = async ({
    updatedPlantName,
    updatedPlantSpecies,
    updatedPlantLocation,
    updatedPlantDescription,
    updatedPlantSoilType,
    updatedPlantSunlight,
    updatedPlantWatering,
    updatedPlantAirHumidity,
    updatedPlantFertilizeFreq,
    updatedPlantMinTemp = 0,
    updatedPlantMaxTemp = 0,
    updatedPlantAirPurification,
    updatedPlantToxicity,
    setError,
  }) => {
    const data = {
      ...plant,
      name: updatedPlantName,
      species: updatedPlantSpecies,
      location: updatedPlantLocation,
      description: updatedPlantDescription,
      soilType: updatedPlantSoilType,
      sunlight: updatedPlantSunlight,
      watering: updatedPlantWatering,
      airHumidity: updatedPlantAirHumidity,
      fertilizeFreq: updatedPlantFertilizeFreq,
      tempRange: {
        minTemp: updatedPlantMinTemp,
        maxTemp: updatedPlantMaxTemp,
      },
      airPurification: updatedPlantAirPurification != 0,
      toxicity: updatedPlantToxicity != 0,
    };
    try {
      await updatePlant({
        id: plant.id,
        data,
      }).unwrap();
      toggleIsOpen();
    } catch (e) {
      if (e === "Access JWT Invalid") {
        authFallback({
          callbackFn: (args) => {
            updatePlant(args);
            toggleIsOpen();
          },
          args: {
            id: plant.id,
            data,
          },
        });
      } else {
        e.split(";").forEach(error => {
          if (error) {
            console.log(error);
            setManualInputError(setError, error);
          }});
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleIsOpen}
      headerText={strings.plants.updatePlantModal.title}
    >
      <Form
        defaultValues={{
          updatedPlantName: plant.name,
          updatedPlantSpecies: plant.species,
          updatedPlantLocation: plant.location,
          updatedPlantDescription: plant.description,
          updatedPlantSoilType: plant.soilType,
          updatedPlantSunlight: plant.sunlight,
          updatedPlantWatering: plant.watering,
          updatedPlantAirHumidity: plant.airHumidity,
          updatedPlantFertilizeFreq: plant.fertilizeFreq,
          updatedPlantMinTemp: plant.tempRange?.minTemp,
          updatedPlantMaxTemp: plant.tempRange?.maxTemp,
          updatedPlantAirPurification: plant.airPurification === false ? 0 : 1,
          updatedPlantToxicity: plant.toxicity === false ? 0 : 1,
        }}
        onSubmit={submitUpdatePlant}
      >
        <Input
          type="text"
          name="updatedPlantName"
          id={nanoid()}
          label={strings.plants.updatePlantModal.plantName}
          registerOpt={{
            required: strings.plants.updatePlantModal.plantNameRequiredMsg,
          }}
        />
        <Input
          type="text"
          name="updatedPlantSpecies"
          id={nanoid()}
          label={strings.plant.species}
        />
        <Input
          type="text"
          name="updatedPlantLocation"
          id={nanoid()}
          label={strings.plant.location}
        />
        <Input
          type="text"
          name="updatedPlantDescription"
          id={nanoid()}
          label={strings.plant.description}
        />
        <Input
          type="text"
          name="updatedPlantSoilType"
          id={nanoid()}
          label={strings.plant.soilType}
        />
        <Select
          name="updatedPlantSunlight"
          id={nanoid()}
          label={strings.plant.sunlight}
        >
          <option value={1}>{strings.plant.sunlightOptions[1]}</option>
          <option value={2}>{strings.plant.sunlightOptions[2]}</option>
          <option value={3}>{strings.plant.sunlightOptions[3]}</option>
        </Select>
        <Select
          name="updatedPlantWatering"
          id={nanoid()}
          label={strings.plant.watering}
        >
          <option value={1}>{strings.plant.wateringOptions[1]}</option>
          <option value={2}>{strings.plant.wateringOptions[2]}</option>
          <option value={3}>{strings.plant.wateringOptions[3]}</option>
        </Select>
        <Select
          name="updatedPlantAirHumidity"
          id={nanoid()}
          label={strings.plant.airHumidity}
        >
          <option value={1}>{strings.plant.airHumidityOptions[1]}</option>
          <option value={2}>{strings.plant.airHumidityOptions[2]}</option>
          <option value={3}>{strings.plant.airHumidityOptions[3]}</option>
        </Select>
        <Select
          name="updatedPlantFertilizeFreq"
          id={nanoid()}
          label={strings.plant.fertilizeFreq}
        >
          <option value={1}>{strings.plant.fertilizeOptions[1]}</option>
          <option value={2}>{strings.plant.fertilizeOptions[2]}</option>
          <option value={3}>{strings.plant.fertilizeOptions[3]}</option>
          <option value={4}>{strings.plant.fertilizeOptions[4]}</option>
        </Select>
        <Input
          type="number"
          name="updatedPlantMinTemp"
          id={nanoid()}
          label={strings.plant.minTemp}
        />
        <Input
          type="number"
          name="updatedPlantMaxTemp"
          id={nanoid()}
          label={strings.plant.maxTemp}
        />
        <Select
          name="updatedPlantAirPurification"
          id={nanoid()}
          label={strings.plant.airPurification}
        >
          <option value={0}>
            {strings.plant.airPurificationOptions.false}
          </option>
          <option value={1}>{strings.plant.airPurificationOptions.true}</option>
        </Select>
        <Select
          name="updatedPlantToxicity"
          id={nanoid()}
          label={strings.plant.toxicity}
        >
          <option value={0}>{strings.plant.toxicityOptions.false}</option>
          <option value={1}>{strings.plant.toxicityOptions.true}</option>
        </Select>
        <Button
          type="submit"
          text={strings.plants.updatePlantModal.submitBtn}
        />
      </Form>
    </Modal>
  );
}
