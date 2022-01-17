import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="navbar-link">
      <h4 className="navbar-logo-text">
        <span>Home Jungle</span>
      </h4>
    </Link>
  );
}
