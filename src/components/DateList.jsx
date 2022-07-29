import DateListItem from "./DateListItem";
import WalkForm from "./WalkForm";
import "./DateList.scss";
import moment from "moment";
import getCalendarWeek from "../helpers/getCalendarWeek";

const DateList = ({
  addWalk,
  setAddWalk,
  availibleSpots,
  requestDogWalk,
  dogs,
}) => {
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
            availibleSpots={availibleSpots}
            requestDogWalk={requestDogWalk}
          />
        )}
      </div>
    );
  });

  return <ul>{datesArray}</ul>;
};

export default DateList;
