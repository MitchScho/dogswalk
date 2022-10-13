import "./DateListItem.scss";
import getAvailibleSpots from "../helpers/getAvailibleSpots";
//----------------------------------------------------------------------------------------------------

const DateListItem = ({ date, setAddWalkDate, walks }) => {

//--------------------------------------------------------------------------------------------------
//Update availible spots
 
  const availibleSpotsForDate = getAvailibleSpots(date, walks);
  
//-----------------------------------------------------------------------------------------------------------
  const clickToAddWalk = () => {
    setAddWalkDate(date);
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
      <div>{availibleSpotsForDate}</div>
      <button onClick={clickToAddWalk}>Add To Walk</button>
      <div>{date.format("MMM D")}</div>
    </div>
  );

};

export default DateListItem;
