import { format, toDate } from "date-fns";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import PlantInfoSection from "./PlantInfoSection";
import PlantInfoItem from "./PlantInfoItem";
import localeMap from "util/locale-map";

export default function PlantInfoTab({ plant }) {
  const { strings, getLanguage } = useLocalizedStrings();
  const {
    location,
    description,
    soilType,
    sunlight,
    airHumidity,
    tempRange,
    watering,
    fertilizeFreq,
    airPurification,
    toxicity,
    dateCreated,
  } = plant;

  const hasBasicInfo = dateCreated || location || description;
  const hasNeeds =
    soilType ||
    sunlight !== 0 ||
    airHumidity !== 0 ||
    (tempRange && (tempRange.minTemp !== 0 || tempRange.maxTemp !== 0)) ||
    watering !== 0 ||
    fertilizeFreq !== 0;
  const hasHealthAspects = airPurification || toxicity;

  return (
    <>
      {hasBasicInfo && (
        <PlantInfoSection title={strings.plant.basicInfo}>
          {dateCreated && (
            <PlantInfoItem
              name={strings.plant.dateAdded}
              value={format(toDate(dateCreated), "PPP", {
                locale: localeMap[getLanguage()],
              })}
            />
          )}
          {location && (
            <PlantInfoItem name={strings.plant.location} value={location} />
          )}
          {description && (
            <PlantInfoItem
              name={strings.plant.description}
              value={description}
            />
          )}
        </PlantInfoSection>
      )}
      {hasNeeds && (
        <PlantInfoSection title={strings.plant.needs}>
          {watering !== 0 && (
            <PlantInfoItem
              name={strings.plant.watering}
              value={strings.plant.wateringOptions[watering]}
            />
          )}
          {airHumidity !== 0 && (
            <PlantInfoItem
              name={strings.plant.airHumidity}
              value={strings.plant.airHumidityOptions[airHumidity]}
            />
          )}
          {sunlight !== 0 && (
            <PlantInfoItem
              name={strings.plant.sunlight}
              value={strings.plant.sunlightOptions[sunlight]}
            />
          )}
          {tempRange &&
            (tempRange.minTemp !== 0 || tempRange.maxTemp !== 0) && (
              <PlantInfoItem
                name={strings.plant.tempRange}
                value={`${tempRange.minTemp} - ${tempRange.maxTemp} °C`}
              />
            )}
          {soilType && (
            <PlantInfoItem name={strings.plant.soilType} value={soilType} />
          )}
          {fertilizeFreq !== 0 && (
            <PlantInfoItem
              name={strings.plant.fertilizeFreq}
              value={strings.plant.fertilizeOptions[fertilizeFreq]}
            />
          )}
        </PlantInfoSection>
      )}
      {hasHealthAspects && (
        <PlantInfoSection title={strings.plant.healthAspects}>
          {airPurification && (
            <PlantInfoItem
              name={strings.plant.airPurification}
              value={strings.plant.airPurificationOptions[airPurification]}
            />
          )}
          {toxicity && (
            <PlantInfoItem
              name={strings.plant.toxicity}
              value={strings.plant.toxicityOptions[toxicity]}
            />
          )}
        </PlantInfoSection>
      )}
    </>
  );
}
