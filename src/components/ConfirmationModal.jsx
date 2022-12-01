import "./ConfirmationModal.scss";

const ConfirmationModal = ({confirm, back, message}) => { 


  return (
      <div className="confirm">
      <h4> {message}</h4>
        <section>
          <button onClick={confirm}>Confirm</button>
          <button onClick={back}>Back</button>
        </section>
      </div>
  );
};

export default ConfirmationModal;