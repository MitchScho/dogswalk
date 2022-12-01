import "./DateListItem.scss";
import getAvailibleSpots from "../helpers/getAvailibleSpots";
//----------------------------------------------------------------------------------------------------

const DateListItem = ({ date, setAddWalkDate, deleteDogWalk, walks }) => {
  console.log("walks", walks);
//--------------------------------------------------------------------------------------------------
//Update availible spots
  console.log("DateListItem page rendered");
  const availibleSpotsForDate = getAvailibleSpots(date, walks);

//-----------------------------------------------------------------
//--- Current walk ---
  const currentWalk = walks.filter((walk) => {
    return date.isSame(walk.date, "day");
  });
  console.log("current walk", currentWalk);
//-----------------------------------------------------------------------------------------------------------
  const clickToAddWalk = () => {
    if (!currentWalk[0]) {

      setAddWalkDate(date);
    }
  };

//----------------------------------------------------------------------------------------------------------

  const deleteWalkRequest = () => { 
    if (currentWalk[0].id) {

      deleteDogWalk(currentWalk[0].id)
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

//-----------------------------------------------------------------------------------------------------------
//---- Component return --------

  return (
    <div tabIndex="1" onBlur={handleBlur} className="dateListItem">
      <div>{date.format("dddd")}</div>
      <div>{availibleSpotsForDate} spots available</div>
      <div>
        <div>
          {availibleSpotsForDate > 0 ? (
            <button onClick={clickToAddWalk}>Add To Walk</button>
          ) : (
            <div>No availible spots on this date</div>
          )}
        </div>
        <button onClick={deleteWalkRequest}>Delete Walk Request</button>
      </div>
      <div>{date.format("MMM D")}</div>
    </div>
  );

};

export default DateListItem;
