import "./PlantInfoSection.css"

export default function PlantInfoSection({ title, children }) {
  return (
    <>
      <div className="plant-info-details-header">{title}</div>
      <div className="plant-info-details-section">{children}</div>
    </>
  );
}
