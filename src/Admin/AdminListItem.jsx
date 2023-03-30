import moment from "moment";
import getAvailibleSpots from "../helpers/getAvailibleSpots";
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
//---Import Components ---
import ConfirmationModal from "../components/ConfirmationModal";
//--- Import api ---
import { getWalkRequest } from "../api";
import { updateWalkRequest } from "../api";



//----------------------------------------------------------------------------------------------------------

const AdminListItem = ({ walkRequests , state, setState}) => {

  const [walkRequest, setWalkRequest] = useState(null);
  const [modalData, setModalData] = useState(null);
  
  const params = useParams();

  //-------------------------------------------------------------------------------------------------------
  //--- Get walk call -----------
  useEffect(() => {
    getWalkRequest(params.walkRequestId).then((walkRequest) => {
      setWalkRequest(walkRequest.data);
     
    });
  }, [state.adminReFreshKey, params.walkId]);// state.adminRefreshKey
  
  if (!walkRequest) {
    return <div>Loading...</div>;
  }

  //--------------------------------------------------------------------------------------------------------
  //--- Store selected admin walk date as a moment object ---

  const adminWalkDate = moment(new Date(walkRequest.date));

  //------------------------------------------------------------------------------------
  //--- Button Style rendering ---
  
  const isAcceptedClass = walkRequest.isAccepted
    ? "payedFor-accepted"
    : "notPayedFor-accepted";
  const isPayedForClass = walkRequest.payedFor
    ? "payedFor-accepted"
    : "notPayedFor-accepted";

  //-------------------------------------------------------------------------------------------------------------
  //--- Number of dogs on walk ---

  const availibleSpotsForDate = getAvailibleSpots(adminWalkDate, walkRequests);
  const numberOfDogsOnWalk = 12 - availibleSpotsForDate;

  //--------------------------------------------------------------------------------------------------
  //--- Handles confirmation of isAccepted status ---
  const handleIsAccepted = () => {
    setModalData({
      back: closeModal,
      confirm: () => confirmUpdate(walkRequest.id, { isAccepted: !walkRequest.isAccepted }),
      message: walkRequest.isAccepted ? "Confirm walk is not accepted" : "Confirm this is accepted",
    });
  };

  //-----------------------------------------------------------------------------


  const confirmUpdate = (id, payload) => {
    
    updateWalkRequest(id, payload)
      .then(() => {
        
      setState((prev) => ({
        ...prev,
        adminReFreshKey: prev.adminReFreshKey + 1,
      }));
      setState((prev) => ({
        ...prev,
        reFreshKey: prev.reFreshKey + 1,
      }));
    });
    closeModal();
  };


  //--------------------------------------------------------------------------------------------------
  //--- Handles confirmation of payedFor status ---
  const handlePayedFor = () => {
    setModalData({
      back: closeModal,
      confirm: () => confirmUpdate(walkRequest.id,{ payedFor: !walkRequest.payedFor}),
      message: walkRequest.payedFor ? "Confirm walk is not payed for" : "Confirm this is payed for",
    });
  };


  const closeModal = () => {
    setModalData(null);
  };

  //-------------------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------------------
  //--- Dogs array to be displayed --------
  const dogs = walkRequest.dogs.map((dog) => {
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
        Walk Request
      </h3>
      <NavLink  to="/admin">
        back{" "}
      </NavLink>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Day</div>
        <div>Date</div>
        <div>User</div>
        <div>Dogs</div>
        <div>Payed For</div>
        <div>Is Accepted</div>
        <div>No. of dogs already on this date</div>
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
