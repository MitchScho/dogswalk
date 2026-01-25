/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable array-callback-return */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
//---------------------------------------------------------------------------
import { useState, useEffect } from 'react';
// --- Style Imports ---
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// --- Router Imports ---
import { NavLink, useLocation } from 'react-router-dom';
// --- Component Imports ---
import UnpaidDogRequest from './UnpaidDogRequest';
/// --- Api Imports ---
import { getAdminWalkRequestsForDog } from '../api';
//-----------------------------------------------------------------------------------------------

function UnpaidDogRequests({
  setState, setAdminState, adminState,
}) {
  const { state } = useLocation();
  console.log('unpaidDogRequests component unpaidDog... id?', state.dogId);
  console.log('unpaidDogRequests component unpaidDog?', state);

  // when that new state gets updated in the unpaid dog request trigger
  // the unPaidDog state change here
  const [trigger, setTrigger] = useState(false);
  const [temporaryRequestList, setTemporaryRequestList] = useState([]);

  // useEffect(() => {
  //   setAdminState((prev) => ({
  //     ...prev,
  //     unpaidDog: unpaidDog2,
  //     adminReFreshKey: prev.adminReFreshKey + 1,
  //   }));
  //   setState((prev) => ({
  //     ...prev,
  //     reFreshKey: prev.reFreshKey + 1,
  //   }));
  //   console.log('trigger upstream unpaidDog');
  // }, [trigger]);
  useEffect(() => {
    const id = state.dogId;
    getAdminWalkRequestsForDog(id).then((res) => {
      console.log('Admin walk request for dog response', res);
      setTemporaryRequestList(res.data);
    });
  }, []);

  console.log('temporaryRequestList', temporaryRequestList);
  const [unpaidDog2, setUnpaidDog2] = useState(temporaryRequestList);
  // console.log('Un paid dod 2', unpaidDog2);
  // adminState.unpaidDog[1]
  const requestList = temporaryRequestList.map((walkRequest) => (
    <div key={walkRequest.id}>
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
          {state.dogName}
          &apos;s Un Paid Requests

        </div>
        <NavLink to="/admin/unpaid-requests">
          <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
        </NavLink>
      </div>
      <div className="button-list-container">{requestList}</div>
    </>
  );
}

export default UnpaidDogRequests;
