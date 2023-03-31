/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import moment from 'moment';
// --- Component Import ---
import DateListItem from './DateListItem';
import WalkForm from './WalkForm';
// --- Helpers ---
import getCalendarWeek from '../helpers/getCalendarWeek';
// --- Style Imports ---
import './DateList.scss';
//-------------------------------------------------------------------------------------------------

function DateList({
  state,
  setState,
}) {
//-------------------------------------------------------------------------------
  const [addWalkDate, setAddWalkDate] = useState(null);
  //-----------------------------------------------------------------------------------------------
  // --- Create Date List ---

  const startDate = moment();
  const endDate = moment().add(1, 'week');

  const dates = getCalendarWeek(startDate, endDate);
  const datesArray = dates.map((date) => (
    <div key={date} className="dateList">
      {date.isSame(addWalkDate, 'day') ? (
        <WalkForm
          date={date}
          setState={setState}
          state={state}
          setAddWalkDate={setAddWalkDate}
        />
      ) : (
        <DateListItem
          date={date}
          setAddWalkDate={setAddWalkDate}
          state={state}
          setState={setState}
        />
      )}
    </div>
  ));

  //-----------------------------------------------------------------------------------------------
  // --- Component Return ---

  return (
    <div>{datesArray}</div>
  );
}

export default DateList;
