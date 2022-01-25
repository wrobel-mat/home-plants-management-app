import { Collapse } from "react-collapse";
import { useMessage } from "providers/MessageProvider";
import { useApi } from "providers/UserApiProvider";
import Error from "components/atoms/Error/Error";
import Button from "components/atoms/Button/Button";
import Success from "components/atoms/Success/Success";
import AppLoader from "components/atoms/Loader/AppLoader";
import "./AuthSection.css";

export default function AuthSection({
  children,
  ariaLabel,
  headerText,
  toggleBtnText,
  isOpened,
  toggleIsOpened,
}) {
  const { error, success } = useMessage();
  const { isLoading } = useApi();

  return (
    <div className="auth-section-container">
      <section aria-label={ariaLabel}>
        <h3 className="auth-section-header">{headerText}</h3>
        {error && isOpened && <Error message={error} />}
        {success && isOpened && <Success message={success} />}
        <Collapse isOpened={!isOpened}>
          <div style={{ height: "18px" }} />
          <Button text={toggleBtnText} type="button" onClick={toggleIsOpened} />
        </Collapse>
        <Collapse isOpened={isOpened}>
          {isLoading && <AppLoader/>}
          {children}
        </Collapse>
      </section>
    </div>
  );
}
