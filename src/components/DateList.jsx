import DateListItem from "./DateListItem";
import WalkForm from "./WalkForm";
import "./DateList.scss";
import { useState } from "react";
import moment from "moment";
import getCalendarWeek from "../helpers/getCalendarWeek";

const DateList = (props) => {
  const [addWalk, setAddWalk] = useState(null);

  const startDate = moment();
  const endDate = moment().add(1, "week");

  const dates = getCalendarWeek(startDate, endDate);
  const datesArray = dates.map((date) => {
    return (
    
    <div key={date} className="dateList">
        {date.isSame(addWalk, 'day') ? <WalkForm date={date}/> : <DateListItem date={date} setAddWalk={setAddWalk} />}
    </div>
    
    );
  });

  return <ul>{datesArray}</ul>;
};

export default DateList;
