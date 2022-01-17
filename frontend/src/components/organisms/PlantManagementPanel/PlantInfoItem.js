export default function PlantInfoItem({ name, value }) {
  return (
    <div className="plant-info-item">
      <div className="plant-info-item-name">{name}</div>
      <div className="plant-info-item-value">{value}</div>
    </div>
  );
}
