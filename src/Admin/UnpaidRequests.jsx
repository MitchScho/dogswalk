/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
//---------------------------------------------------------------------------
import { useEffect, useState } from 'react';
// --- Style Imports ---
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
// --- Router Imports ---
import { NavLink } from 'react-router-dom';
// --- Component Imports ---
import UnpaidDog from './UnpaidDog';
// --- API Imports ---
import sortRequestsByDog from '../helpers/sortRequestsByDog';

function UnpaidRequests({ adminState }) {
  console.log('Unpaid requests', adminState.unpaidRequests);

  // const dogsWithUnpaidRequests = sortRequestsByDog(adminState.unpaidRequests);
  const [dogsWithUnpaidRequests, setDogsWithUnpaidRequests] = useState([]);

  useEffect(() => {
    const sortedRequests = sortRequestsByDog(adminState.unpaidRequests);
    setDogsWithUnpaidRequests(sortedRequests);
  }, [adminState.adminReFreshKey]);

  //------------------------------------------------------------------------------------------------
  console.log('dogs With Unpaid Requests', dogsWithUnpaidRequests);

  // --- Create Unpaid Dog List Array ----
  const unpaidRequestsDogList = Object.entries(dogsWithUnpaidRequests).map(
    (unpaidDog) => (
      <div
        key={unpaidDog[1][0].dogId}
        className="dog-light-button"
      >
        <UnpaidDog
          // key={unpaidDog[1][0].dogId}
          dogId={unpaidDog[1][0].dogId}
          dogName={unpaidDog[0]}
          dogImage={unpaidDog[1][0].image}
          // unpaidDog={unpaidDog}
          // setAdminState={setAdminState}
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
      <div className="button-list-container">{unpaidRequestsDogList}</div>
    </>
  );
}

export default UnpaidRequests;
