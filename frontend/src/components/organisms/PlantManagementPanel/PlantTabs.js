import { useState } from "react";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import PlantInfoTab from "./PlantInfoTab";
import PlantTreatmentsTab from "./PlantTreatmentsTab";
import "./PlantTabs.css"

export default function PlantTabs({ plant }) {
  const tabList = {
    info: <PlantInfoTab plant={plant} />,
    treatments: <PlantTreatmentsTab plant={plant} />,
  };
  const [activeTab, setActiveTab] = useState("info");
  const { strings } = useLocalizedStrings();

  return (
    <div className="plant-tabs-container">
      <div className="plant-tabs-nav">
        <div
          className={
            activeTab === "info" ? "plant-tabs-nav-item active" : "plant-tabs-nav-item"
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
              ? "plant-tabs-nav-item active"
              : "plant-tabs-nav-item"
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
