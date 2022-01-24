import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toDate, formatDistanceToNow } from "date-fns";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { useAuth } from "providers/AuthProvider";
import {
  useWaterPlantMutation,
  useFertilizePlantMutation,
} from "store/api/plantsApi";
import "./PlantItem.css";
import localeMap from 'util/locale-map'

export default function PlantItem({ plant: { id, name, mainImgUri, lastWatering, lastFertilization }}) {
  const [message, setMessage] = useState(undefined);
  const navigate = useNavigate();
  const { strings, getLanguage } = useLocalizedStrings();
  const { authFallback } = useAuth();
  const [waterPlant] = useWaterPlantMutation();
  const [fertilizePlant] = useFertilizePlantMutation();
  const imgFilePath = mainImgUri
    ? mainImgUri
    : "default-plant-img.svg";

  const wateringMsg = lastWatering
    ? strings.plant.events.lastWatering  +
    " " +
    formatDistanceToNow(toDate(lastWatering.eventDate), {
      addSuffix: true,
      locale: localeMap[getLanguage()],
    })
    : strings.plant.events.noWatering;

  const fertilizationMsg = lastFertilization
    ? strings.plant.events.lastFertilization +
    " " +
    formatDistanceToNow(toDate(lastFertilization.eventDate), {
      addSuffix: true,
      locale: localeMap[getLanguage()],
    })
    : strings.plant.events.noFertilization;

  let timeoutId;

  const showMessage = (message) => {
    const overlay = document.querySelector(`#overlay${id}`);
    setMessage(message);
    overlay.style.opacity = 1;
    timeoutId = setTimeout(() => {
      setMessage(undefined);
      overlay.style.opacity = 0;
    }, 5000);
  };

  const submitWaterPlant = async () => {
    try {
      await waterPlant(id).unwrap();
      showMessage(strings.plant.wateringSuccess);
    } catch (e) {
      if (e === "Access JWT Invalid") {
        authFallback({ callbackFn: (args) => {
          waterPlant(args);
          showMessage(strings.plant.wateringSuccess);
          }, args: id });
      }
    }
  };

  const submitFertilizePlant = async () => {
    try {
      await fertilizePlant(id).unwrap();
      showMessage(strings.plant.fertilizeSuccess);
    } catch (e) {
      if (e === "Access JWT Invalid") {
        authFallback({ callbackFn: (args) => {
          fertilizePlant(args);
          showMessage(strings.plant.fertilizeSuccess);
          }, args: id });
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  });

  return (
    <div className="plant-item-wrapper">
      <div>
        <article className="plant-item-container" role="link">
          <div className="plant-item-overlay" id={`overlay${id}`}>
            {message && <div>{message}</div>}
          </div>
          <Link to={`/plants/${id}`}>
            <figure className="plant-item-img-wrapper">
              <img
                className="plant-item-img"
                alt="plant-img"
                src={imgFilePath}
              />
            </figure>
          </Link>
          <div className="plant-item-slider-wrapper">
            <div className="plant-item-slider-bottom">
              <div className="plant-item-slider-content-bottom">
                <div>
                  <div className="plant-item-button-wrapper">
                    <button
                      className="plant-item-button"
                      onClick={submitWaterPlant}
                    >
                      {strings.plant.waterBtn}
                      <div className="plant-item-button-tooltip left">
                        {wateringMsg}
                      </div>
                    </button>
                  </div>
                  <div className="plant-item-button-wrapper">
                    <button
                      className="plant-item-button"
                      onClick={() => {
                        navigate(`/plants/${id}`);
                      }}
                    >
                      {strings.plant.manageBtn}
                    </button>
                  </div>
                  <div className="plant-item-button-wrapper">
                    <button
                      className="plant-item-button"
                      onClick={submitFertilizePlant}
                    >
                      {strings.plant.fertilizeBtn}
                      <div className="plant-item-button-tooltip right">
                        {fertilizationMsg}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="plant-item-name">
            <Link to={`/plants/${id}`}>{name}</Link>
          </div>
        </article>
      </div>
    </div>
  );
}
