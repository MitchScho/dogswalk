/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
import './ConfirmationModal.scss';

function ConfirmationModal({ confirm, back, message }) {
  return (
    <div className="confirm-overlay">
      <div className="confirm">
        <p className="confirm-message">{message}</p>
        <div className="confirm-buttons">
          <button className="modal-button modal-button--confirm" onClick={confirm}>
            Confirm
          </button>
          <button className="modal-button modal-button--cancel" onClick={back}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
