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

  const submitWaterPlant = async () => {
    try {
      await waterPlant(id).unwrap();
    } catch (e) {
      if (e === "Access JWT Invalid") {
        authFallback({
          callbackFn: (args) => waterPlant(args)
        });
      }
    }
  };

  const submitReplantPlant = async () => {
    try {
      await replantPlant(id).unwrap();
    } catch (e) {
      if (e === "Access JWT Invalid") {
        authFallback({
          callbackFn: () => replantPlant(id)
        });
      }
    }
  };

  const submitFertilizePlant = async () => {
    try {
      await fertilizePlant(id).unwrap();
    } catch (e) {
      if (e === "Access JWT Invalid") {
        authFallback({
          callbackFn: () => fertilizePlant(id)
        });
      }
    }
  };

  return (
    <>
      <PlantTreatmentItem
        name={strings.plant.events.watering}
        lastTreatment={lastWatering}
        icon={waterCanIcon}
        treatmentSubmittedMessage={strings.plant.events.lastWatering}
        treatmentNotSubmittedMessage={strings.plant.events.noWatering}
        submitTreatment={submitWaterPlant}
      />
      <PlantTreatmentItem
        name={strings.plant.events.fertilization}
        lastTreatment={lastFertilization}
        icon={fertilizeIcon}
        treatmentSubmittedMessage={strings.plant.events.lastFertilization}
        treatmentNotSubmittedMessage={strings.plant.events.noFertilization}
        submitTreatment={submitFertilizePlant}
      />
      <PlantTreatmentItem
        name={strings.plant.events.replant}
        lastTreatment={lastReplant}
        icon={replantIcon}
        treatmentSubmittedMessage={strings.plant.events.lastReplanting}
        treatmentNotSubmittedMessage={strings.plant.events.noReplanting}
        submitTreatment={submitReplantPlant}
      />
    </>
  );
}
