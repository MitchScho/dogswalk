/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import './PayedForConfirm.scss';

function PayedForConfirm({
  confirm,
  back,
  message,
}) {
  return (
    <div className="confirm">
      <h4>{message}</h4>
      <section>
        <button onClick={confirm}>Confirm</button>
        <button onClick={back}>Back</button>
      </section>
    </div>
  );
}

export default PayedForConfirm;
