import Calendar from 'react-calendar';
import { useState } from 'react';
import "react-calendar/dist/Calendar.css";

const WalkCalendar = (props) => {

  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  }

  
  return (
    <div>
      <Calendar onChange={onChange} value={date} onClickDay={() => props.clickDay()} />
    </div>
  );
};

export default WalkCalendar;