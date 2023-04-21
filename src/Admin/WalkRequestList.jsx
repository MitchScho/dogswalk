/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import moment from 'moment';

function WalkRequestList({ walkRequest }) {
//-----------------------------------------------------------------------------------------------
  // -- Create walk date moment ---------
  const adminRequestListDate = moment(new Date(walkRequest.date));

  //----------------------------------------------------------------------------------------------

  return (
    <ul style={{ display: 'flex', justifyContent: 'space-between' }}>
      <li>{adminRequestListDate.format('dddd')}</li>
      <li>{adminRequestListDate.format('MMM D')}</li>
      <li>{walkRequest.dogs.length}</li>
    </ul>
  );
}

export default WalkRequestList;
