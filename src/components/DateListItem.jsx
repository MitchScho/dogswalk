import "./DateListItem.scss";

const DateListItem = ({ date, setAddWalk, walks, availibleSpots }) => {

  const walksForDate = walks.filter((walk) => {
    return date.isSame(walk.date, "day")
  });

  const dogsForDate = walksForDate.filter((walk) => {
    return walk.dogs;
  })

  let allDogsForDate = 0;
  for (const item of dogsForDate) {
    
    allDogsForDate += item.dogs.length;
  }

  const availibleSpotsForDate = 12 - allDogsForDate;
  

  const clickToAddWalk = () => {
    setAddWalk(date);
  };

  return (
    <div className="dateListItem">
      <div>{date.format("dddd")}</div>
      <div>{availibleSpotsForDate}</div>
      <button onClick={clickToAddWalk}>Add To Walk</button>
      <div>{date.format("MMM D")}</div>
    </div>
  );
};

export default DateListItem;
