import moment from "moment";
import getAvailibleSpots from "../helpers/getAvailibleSpots";
import axios from "axios";
import { useEffect, useState } from "react";

//----------------------------------------------------------------------------------------------------------

const AdminListItem = ({
  selectedAdminWalk,
  walks,
  updateDogWalk,
  
}) => {
  const [isAccepted, setIsAccepted] = useState(selectedAdminWalk.isAccepted);
  const [payedFor, setPayedFor] = useState(selectedAdminWalk.payedFor);

  console.log("selected admin walk", selectedAdminWalk.id);
  console.log("walk is accepted", isAccepted);
  console.log("walk is payedFor", payedFor);
  const isAcceptedClass = isAccepted
    ? "payedFor-accepted"
    : "notPayedFor-accepted";
  const isPayedForClass = payedFor
    ? "payedFor-accepted"
    : "notPayedFor-accepted";

  //--------------------------------------------------------------------------------------------------------
  //-- Store selected admin walk date as a moment object --------

  const adminWalkDate = moment(new Date(selectedAdminWalk.date));

  //-------------------------------------------------------------------------------------------------------------
  //--- Number of dogs on walk --------
  const availibleSpotsForDate = getAvailibleSpots(adminWalkDate, walks);
  const numberOfDogsOnWalk = 12 - availibleSpotsForDate;

  //--------------------------------------------------------------------------------------------------
  const handleIsAccepted = () => {
    
    setIsAccepted(!isAccepted);
    updateDogWalk({ isAccepted: isAccepted });
  };

  //--------------------------------------------------------------------------------------------------
  const handlePayedFor = () => {
    setPayedFor(!payedFor);
    updateDogWalk({ payedFor: payedFor });
  };

  //-------------------------------------------------------------------------------------------------------
  //-- Dogs array to be displayed --------
  const dogs = selectedAdminWalk.dogs.map((dog) => {
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
    </>
  );
};;

export default AdminListItem;