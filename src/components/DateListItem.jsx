import "./DateListItem.scss";
import getAvailibleSpots from "../helpers/getAvailibleSpots";
import {deleteDogWalk} from "../api.js";
//----------------------------------------------------------------------------------------------------

const DateListItem = ({ date, setAddWalkDate, state, setState }) => {
 
//--------------------------------------------------------------------------------------------------
//--- Update availible spots ---
  
  const availibleSpotsForDate = getAvailibleSpots(date, state.walks);

//-----------------------------------------------------------------
//--- Current walk ---
  const currentWalk = state.walks.find((walk) => {
    return date.isSame(walk.date, "day");
  });
  
//-----------------------------------------------------------------------------------------------------------
  const clickToAddWalk = () => {
    if (!currentWalk) {

      setAddWalkDate(date);
    }
  };

//----------------------------------------------------------------------------------------------------------

  const deleteWalkRequest = () => { 
    if (currentWalk?.id) {

      deleteDogWalk(currentWalk.id).then(() => {
        console.log("Dog walk deleted!");

        setState((prev) => ({
          ...prev,
          reFreshKey: prev.reFreshKey + 1,
        }));
      });
    }
  };

//------------------------------------------------------------------------------------------------------------
  
  const handleBlur = (e) => {
    // const currentTarget = e.currentTarget;

    // // Check the newly focused element in the next tick of the event loop
    // setTimeout(() => {
    //   // Check if the new activeElement is a child of the original container
    //   if (!currentTarget.contains(document.activeElement)) {
    //     // You can invoke a callback or add custom logic here
    //     console.log("blur");
    //   }
    // }, 0);
    console.log("blur");
  };
  //---------------------------------------------------------------------------------------------------------
  const requestButton = (currentWalk, availableSpots) => {
  if (currentWalk) {
    return <button onClick={deleteWalkRequest}>Delete Walk Request</button>
  }

  return availibleSpotsForDate > 0 ? (
    <button onClick={clickToAddWalk}>Add To Walk</button>
  ) : (
    <div>no available spots</div>
  );
}

//-----------------------------------------------------------------------------------------------------------
//---- Component return --------

  return (
    <div tabIndex="1" onBlur={handleBlur} className="dateListItem">
      <div>{date.format("dddd")}</div>
      <div>{availibleSpotsForDate} spots available</div>
      <div>{requestButton(currentWalk, availibleSpotsForDate)}</div>
      <div>{date.format("MMM D")}</div>
    </div>
  );

};

export default DateListItem;
