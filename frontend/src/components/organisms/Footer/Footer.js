import { Link } from "react-router-dom";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import "./Footer.css";
import { footerLogoIcon } from "assets/icons";

export default function Footer() {
  const { strings } = useLocalizedStrings();
  return (
    <footer className="footer">
      <ul className="footer-list">
        <li className="footer-list-item">
          <a
            href="https://github.com/wrobel-mat/home-jungle"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            {strings.footer.sourceCode}
          </a>
        </li>
        <li className="footer-list-item">
          <Link to="/about" className="footer-link">
            {strings.footer.about}
          </Link>
        </li>
        <li className="footer-list-item">
          <Link to="/contact" className="footer-link">
            {strings.footer.contact}
          </Link>
        </li>
      </ul>
      <div className="footer-logo">{footerLogoIcon}</div>
    </footer>
  );
}
