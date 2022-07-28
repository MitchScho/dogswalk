import DateListItem from "./DateListItem";
import WalkForm from "./WalkForm";
import "./DateList.scss";
import moment from "moment";
import getCalendarWeek from "../helpers/getCalendarWeek";

const DateList = ({addWalk, setAddWalk, availibleSpots}) => {
  
  const startDate = moment();
  const endDate = moment().add(1, "week");

  const dates = getCalendarWeek(startDate, endDate);
  const datesArray = dates.map((date) => {
    return (
    
    <div key={date} className="dateList">
        {date.isSame(addWalk, 'day') ? <WalkForm date={date}/> : <DateListItem date={date} setAddWalk={setAddWalk} availibleSpots={availibleSpots} />}
    </div>
    
    );
  });

  return <ul>{datesArray}</ul>;
};

export default DateList;
