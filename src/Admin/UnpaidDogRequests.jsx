/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable array-callback-return */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
//---------------------------------------------------------------------------
import { useState, useEffect } from 'react';
// --- Style Imports ---
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
// --- Router Imports ---
import { NavLink } from 'react-router-dom';
// --- Component Imports ---
import UnpaidDogRequest from './UnpaidDogRequest';
//-----------------------------------------------------------------------------------------------

function UnpaidDogRequests({
  setState, setAdminState, adminState,
}) {
  console.log('unpaidDogRequests component unpaidDog...', adminState.unpaidDog[1]);

  // when that new state gets updated in the unpaid dog request trigger
  // the unPaidDog state change here
  const [trigger, setTrigger] = useState(false);
  const [unpaidDog2, setUnpaidDog2] = useState(adminState.unpaidDog);

  useEffect(() => {
    setAdminState((prev) => ({
      ...prev,
      unpaidDog: unpaidDog2,
      adminReFreshKey: prev.adminReFreshKey + 1,
    }));
    setState((prev) => ({
      ...prev,
      reFreshKey: prev.reFreshKey + 1,
    }));
    console.log('trigger upstream unpaidDog');
  }, [trigger]);

  const requestList = adminState.unpaidDog[1].map((walkRequest) => (
    <div key={walkRequest.id} className="light-button">
      <UnpaidDogRequest
        key={walkRequest.id}
        walkRequest={walkRequest}
        unpaidDog2={unpaidDog2}
        setUnpaidDog2={setUnpaidDog2}
        trigger={trigger}
        setTrigger={setTrigger}
        setState={setState}
        adminState={adminState}
        setAdminState={setAdminState}
      />
    </div>
  ));

  return (
    <>
      <div className="header-container">
        <div />
        <div>
          {adminState.unpaidDog[1][0].dogName}
          s
          {' '}
          Un Paid Requests
        </div>
        <NavLink to="/admin/unpaid-requests">
          <FontAwesomeIcon className="back-icon" icon={faCircleLeft} />
        </NavLink>
      </div>
      <div className="button-list-container">{requestList}</div>
    </>
  );
}

export default UnpaidDogRequests;
