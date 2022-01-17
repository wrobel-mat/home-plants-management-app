import "./PageHeader.css";

export default function PageHeader({ title, description, centered, children }) {
  return (
    <div className={centered  ? "page-header centered" : "page-header"}>
      <h1 className="page-header-title">{title}</h1>
      {description && <span className="page-header-description">{description}</span>}
      {children}
    </div>
  );
}
