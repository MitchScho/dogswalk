/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
import './ConfirmationModal.scss';

function ConfirmationModal({ confirm, back, message }) {
  return (
    <div className="confirm">
      <h4>
        {' '}
        {message}
      </h4>
      <section>
        <button onClick={confirm}>Confirm</button>
        <button onClick={back}>Back</button>
      </section>
    </div>
  );
}

export default ConfirmationModal;
