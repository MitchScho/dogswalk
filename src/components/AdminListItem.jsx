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

  console.log("walk is accepted", selectedAdminWalk.isAccepted);
  console.log("walk is accepted", selectedAdminWalk.payedFor);

  //--------------------------------------------------------------------------------------------------------
  //-- Store selected admin walk date as a moment object --------

  const adminWalkDate = moment(new Date(selectedAdminWalk.date));

  //-------------------------------------------------------------------------------------------------------------
  //--- Number of dogs on walk --------
  const availibleSpotsForDate = getAvailibleSpots(adminWalkDate, walks);
  const numberOfDogsOnWalk = 12 - availibleSpotsForDate;

  //--------------------------------------------------------------------------------------------------
  const handleIsAccepted = () => {

    updateDogWalk({ isAccepted: true });
  };

  //--------------------------------------------------------------------------------------------------
  const handlePayedFor = () => {

    updateDogWalk({ payedFor: true });
  };

  //-------------------------------------------------------------------------------------------------------
  //-- Dogs array to be displayed --------
  const dogs = selectedAdminWalk.dogs.map((dog) => {
    return <div key={dog.id}>{dog.name}</div>;
  });

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>{adminWalkDate.format("dddd")}</div>
      <div>{adminWalkDate.format("MMM D")}</div>
      <div>User</div>
      <div>{dogs}</div>
      <button onClick={handlePayedFor}>Payed For</button>
      <button style={{ marginRight: "10em" }} onClick={handleIsAccepted}>Is Accepted</button>
      <div>{numberOfDogsOnWalk}/12</div>
    </div>
  );
};;

export default AdminListItem;