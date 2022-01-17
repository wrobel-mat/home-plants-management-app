import { useState } from "react";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import PlantInfoTab from "./PlantInfoTab";
import PlantTreatmentsTab from "./PlantTreatmentsTab";

export default function PlantTabs({ plant }) {
  const tabList = {
    info: <PlantInfoTab plant={plant} />,
    treatments: <PlantTreatmentsTab plant={plant} />,
  };
  const [activeTab, setActiveTab] = useState("info");
  const { strings } = useLocalizedStrings();

  return (
    <div className="plant-tabs-container">
      <div className="plant-tablist">
        <div
          className={
            activeTab === "info" ? "plant-nav-tab active" : "plant-nav-tab"
          }
          onClick={() => {
            setActiveTab("info");
          }}
        >
          {strings.plant.tabs.info}
        </div>
        <div
          className={
            activeTab === "treatments"
              ? "plant-nav-tab active"
              : "plant-nav-tab"
          }
          onClick={() => {
            setActiveTab("treatments");
          }}
        >
          {strings.plant.tabs.treatments}
        </div>
      </div>
      <div className="plant-tab-content">{tabList[activeTab]}</div>
    </div>
  );
}
