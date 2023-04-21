/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import moment from 'moment';

function UnpaidRequestList({ unpaidRequest }) {
  //-----------------------------------------------------------------------------------------------
  // -- Create walk date moment ---------
  const adminUnpaidRequestListDate = moment(new Date(unpaidRequest.date));

  //----------------------------------------------------------------------------------------------

  return (
    <ul style={{ display: 'flex', justifyContent: 'space-between' }}>
      <li>{adminUnpaidRequestListDate.format('dddd')}</li>
      <li>{adminUnpaidRequestListDate.format('MMM D')}</li>
      <li>{unpaidRequest.dogs.length}</li>
    </ul>
  );
}

export default UnpaidRequestList;
