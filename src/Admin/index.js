/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

// --- Component Imports ---
import {
  Routes, Route,
} from 'react-router-dom';

// import AdminWalkRequest from './AdminWalkRequest';
import WalkRequests from './WalkRequests';
import UnpaidRequests from './UnpaidRequests';
import UnpaidDogRequests from './UnpaidDogRequests';
import AdminHome from './AdminHome';
import Nav from '../components/Nav';
// --- Router Imports ---
// --- Style Imports ---
import './index.scss';
// --- API Imports ---
import { getAdminWalkRequests, getUnpaidRequests } from '../api';

//-------------------------------------------------------------------------------------------------
function Admin({ state, setState }) {
  const [adminWalkRequests, setAdminWalkRequests] = useState(state.walkRequests);
  const [adminUnpaidRequests, setAdminUnpaidRequests] = useState(state.walkRequests);
  const [adminState, setAdminState] = useState({
    adminReFreshKey: 0,
  });
  const [unpaidDog, setUnpaidDog] = useState([]);

  //------------------------------------------------------------------------------------------------

  useEffect(() => {
    getAdminWalkRequests()
      .then((res) => {
        setAdminWalkRequests(res.data);
      });
  }, [adminState.adminReFreshKey]);

  //------------------------------------------------------------------------------------------------

  useEffect(() => {
    getUnpaidRequests()
      .then((res) => {
        setAdminUnpaidRequests(res.data);
      });
  }, []);
  // console.log('Un Paid Requests', adminUnpaidRequests);
  //-----------------------------------------------------------------------------------------------

  return (
    <>
      <Nav state={state} setState={setState} />
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route
          path="/walk-requests"
          element={(
            <WalkRequests
              adminWalkRequests={adminWalkRequests}
              state={state}
              setState={setState}
              adminState={adminState}
              setAdminState={setAdminState}
            />
          )}
        />
        <Route
          path="/unpaid-requests"
          element={(
            <UnpaidRequests
              adminUnpaidRequests={adminUnpaidRequests}
              setUnpaidDog={setUnpaidDog}
            />
          )}
        />
        <Route
          path="/unpaid-dog-requests"
          element={(
            <UnpaidDogRequests unpaidDog={unpaidDog} />
        )}
        />
      </Routes>
    </>
  );
}

export default Admin;
