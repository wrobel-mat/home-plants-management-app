import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { useAuth } from "providers/AuthProvider";
import {
  useFertilizePlantMutation,
  useReplantPlantMutation,
  useWaterPlantMutation,
} from "store/api/plantsApi";
import PlantTreatmentItem from "./PlantTreatmentItem";
import { fertilizeIcon, replantIcon, waterCanIcon } from "assets/icons";

export default function PlantTreatmentsTab({ plant : { id, lastWatering, lastReplant, lastFertilization }}) {
  const { strings } = useLocalizedStrings();
  const { authFallback } = useAuth();
  const [waterPlant] = useWaterPlantMutation();
  const [replantPlant] = useReplantPlantMutation();
  const [fertilizePlant] = useFertilizePlantMutation();

  const submitWaterPlant = async (setMessage) => {
    try {
      await waterPlant(id).unwrap();
      setMessage(strings.plant.wateringSuccess);
    } catch (e) {
      if (e === "Access JWT Invalid") {
        authFallback({
          callbackFn: (args) => {
            waterPlant(args);
            setMessage(strings.plant.wateringSuccess);
            },
          args: id,
        });
      }
    }
  };

  const submitReplantPlant = async (setMessage) => {
    try {
      await replantPlant(id).unwrap();
      setMessage(strings.plant.replantSuccess);
    } catch (e) {
      if (e === "Access JWT Invalid") {
        authFallback({
          callbackFn: (args) => {
            replantPlant(args);
            setMessage(strings.plant.replantSuccess);
            },
          args: id,
        });
      }
    }
  };

  const submitFertilizePlant = async (setMessage) => {
    try {
      await fertilizePlant(id).unwrap();
      setMessage(strings.plant.fertilizeSuccess);
    } catch (e) {
      if (e === "Access JWT Invalid") {
        authFallback({
          callbackFn: (args) => {
            fertilizePlant(args);
            setMessage(strings.plant.fertilizeSuccess);
            },
          args: id,
        });
      }
    }
  };

  return (
    <>
      <PlantTreatmentItem
        name={strings.plant.events.watering}
        lastEvent={lastWatering}
        icon={waterCanIcon}
        eventText={strings.plant.events.lastWatering}
        noEventText={strings.plant.events.noWatering}
        submitTreatment={submitWaterPlant}
      />
      <PlantTreatmentItem
        name={strings.plant.events.fertilization}
        lastEvent={lastFertilization}
        icon={fertilizeIcon}
        eventText={strings.plant.events.lastFertilization}
        noEventText={strings.plant.events.noFertilization}
        submitTreatment={submitFertilizePlant}
      />
      <PlantTreatmentItem
        name={strings.plant.events.replant}
        lastEvent={lastReplant}
        icon={replantIcon}
        eventText={strings.plant.events.lastReplanting}
        noEventText={strings.plant.events.noReplanting}
        submitTreatment={submitReplantPlant}
      />
    </>
  );
}
