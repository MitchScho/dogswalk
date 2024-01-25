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
// import WalkRequest from './WalkRequest';
// --- Router Imports ---
// --- Style Imports ---
import './index.scss';
// --- API Imports ---
import {
  getMe, getAdminWalkRequests, getUnpaidRequests,
} from '../api';

//-------------------------------------------------------------------------------------------------
function Admin({ state, setState }) {
  const [adminWalkRequests, setAdminWalkRequests] = useState(state.walkRequests);
  const [adminUnpaidRequests, setAdminUnpaidRequests] = useState(state.walkRequests);
  const [adminState, setAdminState] = useState({
    adminReFreshKey: 0,
  });

  const [unpaidDog, setUnpaidDog] = useState([]);

  useEffect(() => {
    getMe()
      .then((res) => {
        setState((prev) => ({
          ...prev,
          user: res.data,
          reFreshKey: prev.reFreshKey + 1,
        }));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  //-------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------------

  useEffect(() => {
    getAdminWalkRequests()
      .then((res) => {
        setAdminWalkRequests(res.data);
      });
  }, [adminState.adminReFreshKey, state.reFreshKey]);

  //------------------------------------------------------------------------------------------------

  useEffect(() => {
    getUnpaidRequests()
      .then((res) => {
        setAdminUnpaidRequests(res.data);
      });
  }, [adminState.adminReFreshKey, state.reFreshKey]);
  //-------------------------------------------------------------------------------------------
  if (!state.user) {
    return <div> Loading User... </div>;
  }
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
            <UnpaidDogRequests
              unpaidDog={unpaidDog}
              setState={setState}
              setAdminState={setAdminState}
            />
        )}
        />
      </Routes>
    </>
  );
}

export default Admin;
