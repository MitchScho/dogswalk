import moment from "moment";
import getAvailibleSpots from "../helpers/getAvailibleSpots";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//---Import Components ---
import IsAcceptedConfirm from "./IsAcceptedConfirm";
import PayedForConfirm from "./PayedForConfirm";

//----------------------------------------------------------------------------------------------------------

const AdminListItem = ({ updateDogWalk, getWalk }) => {
  const [walk, setWalk] = useState(null);
  const [displayIsAcceptedConfirm, setDisplayIsAcceptedConfirm] = useState(null);
  const [displayPayedForConfirm, setDisplayPayedForConfirm] = useState(null);
  const [state, setState] = useState({
    reFreshKey: 0,
  });

  const params = useParams();

  //-------------------------------------------------------------------------------------------------------
  //--- Get walk call -----------
  useEffect(() => {
    getWalk(params.walkId).then((data) => {
      setWalk(data);
    });
  }, [state.reFreshKey]);

  if (!walk) {
    return <div>Loading...</div>;
  }

  //--------------------------------------------------------------------------------------------------------
  //--- Store selected admin walk date as a moment object ---

  const adminWalkDate = moment(new Date(walk.date));

  //------------------------------------------------------------------------------------
  const isAcceptedClass = walk.isAccepted
    ? "payedFor-accepted"
    : "notPayedFor-accepted";
  const isPayedForClass = walk.payedFor
    ? "payedFor-accepted"
    : "notPayedFor-accepted";

  //-------------------------------------------------------------------------------------------------------------
  //--- Number of dogs on walk ---

  // const availibleSpotsForDate = getAvailibleSpots(adminWalkDate, walks);
  // const numberOfDogsOnWalk = 12 - availibleSpotsForDate;

  //--------------------------------------------------------------------------------------------------
  //--- Handles confirmation of isAccepted status ---
  const handleIsAccepted = () => {
    setDisplayIsAcceptedConfirm(true);
  };


  const handleIsAcceptedConfirm = (id, value) => {
    updateDogWalk({ walkId: id, isAccepted: !value })
      .then(() => {
      setState((prev) => ({ ...prev, reFreshKey: prev.reFreshKey + 1 }));
    });
    handleIsAcceptedBack();
  };


  const handleIsAcceptedBack = () => {
    setDisplayIsAcceptedConfirm(false);
  };

  //--------------------------------------------------------------------------------------------------
  //--- Handles confirmation of payedFor status ---
  const handlePayedFor = () => {
    setDisplayPayedForConfirm(true);
  };

  const handlePayedForConfirm = (id, value) => {
    updateDogWalk({ walkId: id, payedFor: !value })
      .then(() => {
      setState((prev) => ({ ...prev, reFreshKey: prev.reFreshKey + 1 }));
    });
    handlePayedForBack()
  };

  const handlePayedForBack = () => {
    setDisplayPayedForConfirm(false);
  };

  //-------------------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------------------
  //--- Dogs array to be displayed --------
  const dogs = walk.dogs.map((dog) => {
    return <div key={dog.id}>{dog.name}</div>;
  });

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Day</div>
        <div>Date</div>
        <div>User</div>
        <div>Dogs</div>
        <div>Payed For</div>
        <div>Is Accepted</div>
        <div>no. Of Dogs For Acceptance</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{adminWalkDate.format("dddd")}</div>
        <div>{adminWalkDate.format("MMM D")}</div>
        <div>User</div>
        <div>{dogs}</div>
        <button
          onClick={handlePayedFor}
          className={isPayedForClass}
        >
          Payed For
        </button>
        <button
          style={{ marginRight: "10em" }}
          onClick={handleIsAccepted}
          className={isAcceptedClass}
        >
          Is Accepted
        </button>
        {/* <div>{numberOfDogsOnWalk}/12</div> */}
      </div>
      {displayIsAcceptedConfirm && (
        <IsAcceptedConfirm
          style={{ display: "flex", flexDirection: "row-reverse" }}
          handleIsAcceptedConfirm={() => handleIsAcceptedConfirm(walk.id, walk.isAccepted)}
          handleIsAcceptedBack={handleIsAcceptedBack}
        />
      )}
      {displayPayedForConfirm && (
        <PayedForConfirm
          style={{ display: "flex", flexDirection: "row-reverse" }}
          handlePayedForConfirm={() => handlePayedForConfirm(walk.id, walk.payedFor)}
          handlePayedForBack={handlePayedForBack}
        />
      )}
    </>
  );
};

export default AdminListItem;
