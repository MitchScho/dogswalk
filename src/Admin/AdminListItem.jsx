import moment from "moment";
import getAvailibleSpots from "../helpers/getAvailibleSpots";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//---Import Components ---
import ConfirmationModal from "../components/ConfirmationModal";
//--- Import api ---
import { getWalk } from "../api";
import { updateDogWalk } from "../api";



//----------------------------------------------------------------------------------------------------------

const AdminListItem = ({ walks , state, setState}) => {

  const [walk, setWalk] = useState(null);
  const [modalData, setModalData] = useState(null);
  console.log("admin walk", walk);
  const params = useParams();

  //-------------------------------------------------------------------------------------------------------
  //--- Get walk call -----------
  useEffect(() => {
    getWalk(params.walkId).then((walk) => {
      setWalk(walk.data);
    });
  }, [state.adminReFreshKey, params.walkId]);
  
  if (!walk) {
    return <div>Loading...</div>;
  }

  //--------------------------------------------------------------------------------------------------------
  //--- Store selected admin walk date as a moment object ---

  const adminWalkDate = moment(new Date(walk.date));

  //------------------------------------------------------------------------------------
  //--- Button Style rendering ---
  
  const isAcceptedClass = walk.isAccepted
    ? "payedFor-accepted"
    : "notPayedFor-accepted";
  const isPayedForClass = walk.payedFor
    ? "payedFor-accepted"
    : "notPayedFor-accepted";

  //-------------------------------------------------------------------------------------------------------------
  //--- Number of dogs on walk ---

  const availibleSpotsForDate = getAvailibleSpots(adminWalkDate, walks);
  const numberOfDogsOnWalk = 12 - availibleSpotsForDate;

  //--------------------------------------------------------------------------------------------------
  //--- Handles confirmation of isAccepted status ---
  const handleIsAccepted = () => {
    setModalData({
      back: closeModal,
      confirm: () => confirmUpdate({walkId: walk.id, isAccepted: !walk.isAccepted}),
      message: walk.isAccepted ? "Confirm walk is not accepted" : "Confirm this is accepted",
    });
  };

  //-----------------------------------------------------------------------------


  const confirmUpdate = (payload) => {
    updateDogWalk(payload)
      .then(() => {
      setState((prev) => ({
        ...prev,
        adminReFreshKey: prev.adminReFreshKey + 1,
      }));
    });
    closeModal();
  };


  //--------------------------------------------------------------------------------------------------
  //--- Handles confirmation of payedFor status ---
  const handlePayedFor = () => {
    setModalData({
      back: closeModal,
      confirm: () => confirmUpdate({walkId: walk.id, payedFor: !walk.payedFor}),
      message: walk.payedFor ? "Confirm walk is not payed for" : "Confirm this is payed for",
    });
  };


  const closeModal = () => {
    setModalData(null);
  };

  //-------------------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------------------
  //--- Dogs array to be displayed --------
  const dogs = walk.dogs.map((dog) => {
    return <div key={dog.id}>{dog.name}</div>;
  });

  return (
    <>
      <h3
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        Admin Walk Details
      </h3>
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
        <button onClick={handlePayedFor} className={isPayedForClass}>
          Payed For
        </button>
        <button
          style={{ marginRight: "10em" }}
          onClick={handleIsAccepted}
          className={isAcceptedClass}
        >
          Is Accepted
        </button>
        <div>{numberOfDogsOnWalk}/12</div>
      </div>
      {modalData && (
        <ConfirmationModal
          style={{ display: "flex", flexDirection: "row-reverse" }}
          confirm={modalData.confirm}
          back={modalData.back}
          message={modalData.message}
        />
      )}
    </>
  );
};

export default AdminListItem;
