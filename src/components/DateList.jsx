import DateListItem from "./DateListItem";
import WalkForm from "./WalkForm";
import "./DateList.scss";
import moment from "moment";
import getCalendarWeek from "../helpers/getCalendarWeek";
//-------------------------------------------------------------------------------------------------------

const DateList = ({
  addWalk,
  setAddWalk,
  walks,
  createDogWalk,
  dogs,
}) => {

//------------------------------------------------------------------------------------------------------
//Create Date List

  const startDate = moment();
  const endDate = moment().add(1, "week");

  const dates = getCalendarWeek(startDate, endDate);
  const datesArray = dates.map((date) => {

    return (
      <div key={date} className="dateList">
        {date.isSame(addWalk, "day") ? (
          <WalkForm
            date={date}
            createDogWalk={createDogWalk}
            dogs={dogs}
            setAddWalkDate={setAddWalk}
          />
        ) : (
          <DateListItem
            date={date}
            setAddWalk={setAddWalk}
            walks={walks}
          />
        )}
      </div>
    );
  });

//----------------------------------------------------------------------------------------------------------
//Component Return

  return <div>{datesArray}</div>;

};

export default DateList;
