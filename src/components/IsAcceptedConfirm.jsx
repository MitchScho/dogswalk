import "./IsAcceptedConfirm.scss";

const IsAcceptedConfirm = ({handleIsAcceptedConfirm, handleIsAcceptedBack}) => { 

  

  

  return (
      <div className="confirm">
        <h4> Confirm To Accept These Dogs</h4>
        <section>
          <button onClick={handleIsAcceptedConfirm}>Confirm</button>
          <button onClick={handleIsAcceptedBack}>Back</button>
        </section>
      </div>
  );
};

export default IsAcceptedConfirm;