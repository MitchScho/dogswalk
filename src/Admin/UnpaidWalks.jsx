/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
//---------------------------------------------------------------------------
import { useEffect, useState } from 'react';
// --- Style Imports ---
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// --- Router Imports ---
import { NavLink } from 'react-router-dom';
// --- Component Imports ---
import AdminDog from './AdminDog';

function UnpaidWalks({ adminState }) {
  const [usersWithUnpaidWalks, setUsersWithUnpaidWalks] = useState([]);

  useEffect(() => {
    if (adminState.unpaidWalks) {
      setUsersWithUnpaidWalks(adminState.unpaidWalks);
    }
  }, [adminState.unpaidWalks, adminState.adminReFreshKey]);

  // --- Create Unpaid Walks List Array ----
  // Group dogs by user and create AdminDog components
  // Note: Dogs are displayed but not clickable since payment is now handled at the walk level
  const unpaidWalksDogList = usersWithUnpaidWalks.flatMap((userData) => userData.dogs.map((dog) => (
    <div
      key={`${userData.userId}-${dog.id}`}
      className="dog-light-button"
    >
      <AdminDog
        dogId={dog.id}
        dogName={dog.name}
        dogImage={dog.image}
      />
    </div>
  )));

  return (
    <>
      <div className="header-container">
        <div />
        <h3>Unpaid Walks</h3>
        <NavLink to="/admin">
          <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
          {' '}
        </NavLink>
      </div>
      <div className="button-list-container">{unpaidWalksDogList}</div>
    </>
  );
}

export default UnpaidWalks;
