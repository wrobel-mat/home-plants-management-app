import Button from "components/atoms/Button/Button";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { pencilIcon } from "assets/icons";
import "./DataSection.css";

export default function DataSection({ children, icon, onEditBtnClick, disabled }) {
  const { strings } = useLocalizedStrings();
  return (
    <section className="myaccount-section">
      <div className="myaccount-section-data">
        <div className="myaccount-section-data-icon">{icon}</div>
        <div className="myaccount-section-data-items-container">{children}</div>
      </div>
      <div className="myaccount-section-button">
        <Button
          text={strings.myaccount.editBtn}
          type="button"
          onClick={onEditBtnClick}
          icon={pencilIcon}
          disabled={!!disabled}
        />
      </div>
    </section>
  );
}
