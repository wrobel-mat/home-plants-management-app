export default function DataItem({ name, value }) {
  return (
    <div className="myaccount-section-data-item">
      <div className="myaccount-section-data-item-name">{name}</div>
      <div className="myaccount-section-data-item-value">{value}</div>
    </div>
  );
}
