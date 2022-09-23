import DateListItem from "./DateListItem";
import WalkForm from "./WalkForm";
import "./DateList.scss";
import moment from "moment";
import getCalendarWeek from "../helpers/getCalendarWeek";
import { useState } from "react";
//-------------------------------------------------------------------------------------------------------

const DateList = ({
  walks,
  createDogWalk,
  dogs,
}) => {
//-------------------------------------------------------------------------------
const [addWalkDate, setAddWalkDate] = useState(null);
//------------------------------------------------------------------------------------------------------
//Create Date List

  const startDate = moment();
  const endDate = moment().add(1, "week");

  const dates = getCalendarWeek(startDate, endDate);
  const datesArray = dates.map((date) => {

    return (
      <div key={date} className="dateList">
        {date.isSame(addWalkDate, "day") ? (
          <WalkForm
            date={date}
            createDogWalk={createDogWalk}
            dogs={dogs}
            setAddWalkDate={setAddWalkDate}
          />
        ) : (
          <DateListItem
            date={date}
            setAddWalkDate={setAddWalkDate}
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
