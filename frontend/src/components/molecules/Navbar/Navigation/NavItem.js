import { Link } from "react-router-dom";

export default function NavItem({ path, icon, children, hasDropdown }) {
  return (
    <div
      className={hasDropdown ? "navbar-nav-item" : "navbar-nav-item--no-effect"}
    >
      <Link to={path} className="navbar-nav-item-link">
        {icon}
      </Link>
      {children}
    </div>
  );
}
