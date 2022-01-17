import { useState, useEffect } from 'react';
import { toDate, formatDistanceToNow } from "date-fns";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import localeMap from "util/locale-map";

export default function PlantTreatmentItem({
  name,
  lastEvent,
  icon,
  eventText,
  noEventText,
  submitTreatment,
}) {
  const { strings, getLanguage } = useLocalizedStrings();
  const [message, setMessage] = useState(undefined);
  const [treatmentMsgTimeout, setTreatmentMsgTimeout] = useState(undefined);

  const setMessageWithTimeout = (message) => {
    setMessage(message);
    const timeoutId = setTimeout(() => {
      setMessage(undefined);
    }, 5000);
    setTreatmentMsgTimeout(timeoutId);
  }

  const handleSubmitTreatment = () => {
    submitTreatment(setMessageWithTimeout);
  }

  useEffect(() => {
    return () => {
      if (treatmentMsgTimeout) {
        clearTimeout(treatmentMsgTimeout);
      }
    }
  });

  return (
    <div className="plant-treatment-item">
      <div className={message ? "plant-treatment-item-overlay open" : "plant-treatment-item-overlay"}>
        {message && message}
      </div>
      <div className="plant-treatment-item-icon">{icon}</div>
      <div className="plant-treatment-item-info">
        <div className="plant-treatment-item-name">{name}</div>
        <div className="plant-treatment-item-value">
          {lastEvent
            ? eventText +
              " " +
              formatDistanceToNow(toDate(lastEvent.eventDate), {
                addSuffix: true,
                locale: localeMap[getLanguage()],
              })
            : noEventText}
        </div>
      </div>
      <div className="plant-treatment-item-btns-wrapper">
        <button className="plant-treatment-item-btn" onClick={handleSubmitTreatment}>
          {strings.plant.events.submitTreatmentBtn}
        </button>
      </div>
    </div>
  );
}
