import { Link } from "react-router-dom";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import "./Footer.css";
import { footerLogoIcon } from "assets/icons";

export default function Footer() {
  const { strings, getLanguage, setLanguage } = useLocalizedStrings();

  return (
    <footer className="footer">
      <ul className="footer-list">
        <li className="footer-list-item">
          <a
            href="https://github.com/wrobel-mat/home-plants-management-app"
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
        <li className="footer-list-item">
          <button 
            onClick={() => {setLanguage('en')}}
            className={getLanguage() == 'en' ? "footer-lang-btn active" : "footer-lang-btn"}>
              en
          </button> 
          <span style={{'fontSize': 'var(--font-size-sm)', 'fontWeight': 'var(--font-weight-light)', 'color': 'var(--color-anthracite)'}}>|</span> 
          <button 
            onClick={() => {setLanguage('pl')}} 
            className={getLanguage() == 'pl' ? "footer-lang-btn active" : "footer-lang-btn"}>
              pl
          </button>
        </li>
      </ul>
      <div className="footer-logo">{footerLogoIcon}</div>
    </footer>
  );
}
