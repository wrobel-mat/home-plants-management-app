import { useLocalizedStrings } from 'providers/LocalizedStringsProvider';
import { siteUnderConstructionIcon } from 'assets/icons';
import "./WebsiteUnderConstruction.css";

export default function WebsiteUnderConstruction() {
  const { strings } = useLocalizedStrings();
  return (
    <div className="under-construction-container">
      <div className="under-construction-icon">{siteUnderConstructionIcon}</div>
      <div className="under-construction-message">{strings.siteUnderConstruction}</div>
    </div>
  );
}