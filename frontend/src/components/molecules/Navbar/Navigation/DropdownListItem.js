import { Link } from "react-router-dom";

export default function DropdownListItem({ path, text }) {
  return (
    <li>
      <Link to={path} className="navbar-nav-item-dropdown-link">
        {text}
      </Link>
    </li>
  );
}
