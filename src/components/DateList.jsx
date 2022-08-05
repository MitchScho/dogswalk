import DateListItem from "./DateListItem";
import WalkForm from "./WalkForm";
import "./DateList.scss";
import moment from "moment";
import getCalendarWeek from "../helpers/getCalendarWeek";

const DateList = ({
  addWalk,
  setAddWalk,
  walks,
  requestDogWalk,
  dogs,
}) => {

  console.log("dogs in datelist", dogs);
  console.log("availible spots in datelist", walks);
  const startDate = moment();
  const endDate = moment().add(1, "week");

  const dates = getCalendarWeek(startDate, endDate);
  const datesArray = dates.map((date) => {
    return (
      <div key={date} className="dateList">
        {date.isSame(addWalk, "day") ? (
          <WalkForm date={date} requestDogWalk={requestDogWalk} dogs={dogs} />
        ) : (
          <DateListItem
            date={date}
            setAddWalk={setAddWalk}
            walks={walks}
            requestDogWalk={requestDogWalk}
          />
        )}
      </div>
    );
  });

  return <ul>{datesArray}</ul>;
};

export default DateList;
