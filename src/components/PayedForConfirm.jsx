import "./PayedForConfirm.scss";

const PayedForConfirm = ({
  handlePayedForConfirm,
  handlePayedForBack,
}) => {
  return (
    <div className="confirm">
      <h4> Confirm Dog is Payed For</h4>
      <section>
        <button onClick={handlePayedForConfirm}>Confirm</button>
        <button onClick={handlePayedForBack}>Back</button>
      </section>
    </div>
  );
};

export default PayedForConfirm;
