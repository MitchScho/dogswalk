/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import UnpaidDog from './UnpaidDog';
import sortRequestsByDog from '../helpers/sortRequestsByDog';

function UnpaidRequests({ adminUnpaidRequests, setUnpaidDog }) {
  console.log('Unpaid requests', adminUnpaidRequests);

  const dogsWithUnpaidRequests = sortRequestsByDog(adminUnpaidRequests);

  //------------------------------------------------------------------------------------------------
  console.log('dogsWithUnpaidRequests', dogsWithUnpaidRequests);

  // --- Create Unpaid Dog List Array ----
  const unpaidRequestsDogList = Object.entries(dogsWithUnpaidRequests).map(
    (dog) => (
      <div className="light-button">
        <UnpaidDog
          key={dog[1][0].dogId}
          dog={dog}
          setUnpaidDog={setUnpaidDog}
        />
      </div>
      // <NavLink
      //   to={`/admin/unpaid-dog-requests/${dog[1][0].dogName}`}
      //   key={dog[1][0].dogId}
      // >
      //   <UnpaidDog dog={dog} />
      // </NavLink>
    ),
  );
  // console.log('unpaidRequestsDogList', unpaidRequestsDogList);

  return (
    <>
      <div className="header-container">
        <div />
        <h3>Unpaid Requests</h3>
        <NavLink to="/admin">
          <FontAwesomeIcon className="back-icon" icon={faCircleLeft} />
          {' '}
        </NavLink>
      </div>
      <div className="button-list-container">
        {unpaidRequestsDogList}
      </div>
    </>
  );
}

export default UnpaidRequests;
