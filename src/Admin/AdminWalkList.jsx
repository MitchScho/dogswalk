/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import moment from 'moment';

function AdminWalkList({ walkRequest }) {
//-----------------------------------------------------------------------------------------------
  // -- Create walk date moment ---------
  const adminWalkListDate = moment(new Date(walkRequest.date));

  //----------------------------------------------------------------------------------------------

  return (
    <ul style={{ display: 'flex', justifyContent: 'space-between' }}>
      <li>{adminWalkListDate.format('dddd')}</li>
      <li>{adminWalkListDate.format('MMM D')}</li>
      <li>{walkRequest.dogs.length}</li>
    </ul>
  );
}

export default AdminWalkList;
