import ReactModal from "react-modal";
import useScrollBlock from "hooks/useScrollBlock";
import { closeIcon } from "assets/icons";
import "./Modal.css";

ReactModal.setAppElement("#root");

export default function Modal({
  children,
  isOpen,
  onRequestClose,
  headerText,
  headerIcon,
}) {
  const [blockScroll, allowScroll] = useScrollBlock();
  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={() => {
        blockScroll();
      }}
      onAfterClose={() => {
        allowScroll();
      }}
      className={{
        base: "Modal__Content",
        afterOpen: "Modal__Content--after-open",
        beforeClose: "Modal__Content--before-close",
      }}
      overlayClassName={{
        base: "Modal__Overlay",
        afterOpen: "Modal__Overlay--after-open",
        beforeClose: "Modal__Overlay--before-close",
      }}
      closeTimeoutMS={300}
      onRequestClose={onRequestClose}
      shouldFocusAfterRender={false}
    >
      <div className="modal-content-top-section">
        <button
          className="modal-content-top-section-btn"
          onClick={onRequestClose}
        >
          {closeIcon}
        </button>
      </div>
      <div className="modal-content-form-section">
        {headerText && (
          <h2 className="modal-content-header">
            {headerIcon && (
              <div className="modal-content-header-icon">{headerIcon}</div>
            )}
            {headerText}
          </h2>
        )}
        {children}
        <div style={{ height: "24px" }} />
      </div>
    </ReactModal>
  );
}
