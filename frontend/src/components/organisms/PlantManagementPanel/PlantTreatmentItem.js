import { toDate, formatDistanceToNow, isToday } from "date-fns";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import localeMap from "util/locale-map";
import "./PlantTreatmentItem.css";

export default function PlantTreatmentItem({
  name,
  lastTreatment,
  icon,
  treatmentSubmittedMessage,
  treatmentNotSubmittedMessage,
  submitTreatment,
}) {
  const { strings, getLanguage } = useLocalizedStrings();

  const treatmentDate = lastTreatment ? toDate(lastTreatment.eventDate) : undefined;
  const treatmentSubmittedToday = treatmentDate && isToday(treatmentDate);

  return (
    <div className="plant-treatment-item">
      <div className="plant-treatment-item-icon">{icon}</div>
      <div className="plant-treatment-item-info">
        <div className="plant-treatment-item-name">{name}</div>
        <div className="plant-treatment-item-value">
          {treatmentDate
            ? treatmentSubmittedMessage +
              " " +
              formatDistanceToNow(treatmentDate, {
                addSuffix: true,
                locale: localeMap[getLanguage()],
              })
            : treatmentNotSubmittedMessage}
        </div>
      </div>
      <div className="plant-treatment-item-btns-wrapper">
        {treatmentSubmittedToday ? "✔️" : ""}
        <button className="plant-treatment-item-btn" onClick={submitTreatment} disabled={treatmentSubmittedToday}>
          {treatmentSubmittedToday ? strings.plant.events.submitTreatmentBtnDone : strings.plant.events.submitTreatmentBtn}
        </button>
      </div>
    </div>
  );
}
