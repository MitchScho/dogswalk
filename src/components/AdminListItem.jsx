import moment from "moment";
import getAvailibleSpots from "../helpers/getAvailibleSpots";
import axios from "axios";
import { useEffect, useState } from "react";

//----------------------------------------------------------------------------------------------------------

const AdminListItem = ({ selectedAdminWalk, walks }) => {

  console.log(selectedAdminWalk);

  const [toggleIsAccepted, setToggleIsAccepted] = useState(selectedAdminWalk.isAccepted);
  //--------------------------------------------------------------------------------------------------------
  //-- Store selected admin walk date as a moment object --------

  const adminWalkDate = moment(new Date(selectedAdminWalk.date));

  //-------------------------------------------------------------------------------------------------------------
  //--- Number of dogs on walk --------
  const availibleSpotsForDate = getAvailibleSpots(adminWalkDate, walks);
  const numberOfDogsOnWalk = 12 - availibleSpotsForDate;

  //--------------------------------------------------------------------------------------------------
  const handleIsAccepted = () => {
    setToggleIsAccepted(true);
  };

  //----------------------------------------------------------------------------------------------

  const updateIsAcceptedDogWalks = () => {
    const id = selectedAdminWalk.id;
    return axios
      .put(`http://localhost:8000/api/admin/walks/${id}`, {isAccepted: {toggleIsAccepted}})
      .then(() => {});
  };

  useEffect(() => {
    updateIsAcceptedDogWalks();
  }, []);

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
      <button>Payed For</button>
      <button style={{ marginRight: "10em" }} onClick={handleIsAccepted}>
        Is Accepted
      </button>
      <div>{numberOfDogsOnWalk}</div>
    </div>
  );
};;

export default AdminListItem;