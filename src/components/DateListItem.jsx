import "./DateListItem.scss"; 

const DateListItem = ({ date, setAddWalk, walks, availibleSpots }) => {
  console.log("walks in datelist item", walks);

  const walksForDate = walks.filter((walk) => {
    return date.isSame(walk.date, "day");
  })
  console.log("walks for date", walksForDate);
  
  const availibleSpotsForDate = 12 - walksForDate.length;




  const clickToAddWalk = () => {
    setAddWalk(date);
  };

  return (
    <div className="dateListItem">
      <div>{date.format('dddd')}</div> 
      <div>{availibleSpotsForDate}</div> 
      <button onClick={clickToAddWalk}>Add Walk</button>
      <div>{date.format('MMM D')}</div> 
    </div>
  );
};

export default DateListItem;
