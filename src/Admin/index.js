/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
//---------------------------------------------------------------------------
import { useEffect, useState } from 'react';
// --- Router Imports ---
import {
  Routes, Route,
} from 'react-router-dom';

// --- Component Imports ---
import WalkRequests from './WalkRequests';
import UnpaidRequests from './UnpaidRequests';
import UnpaidDogRequests from './UnpaidDogRequests';
import WalkHistory from './WalkHistory';
import WalkHistoryDetail from './WalkHistoryDetail';
import AdminHome from './AdminHome';
import Schedule from './Schedule';
import AdminWalk from './AdminWalk';
import Nav from '../components/Nav';

// --- Style Imports ---
import './index.scss';

// --- API Imports ---
import {
  getMe, getAdminWalkRequests, getUnpaidRequests,
} from '../api';

//-------------------------------------------------------------------------------------------------
function Admin({ state, setState }) {
  const [adminState, setAdminState] = useState({
    unpaidRequests: [],
    walkRequests: [],
    unpaidDog: [],
    adminReFreshKey: 0,
  });

  // --- getUser data ---
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

  //------------------------------------------------------------------------------------------------
  // --- get walkRequests data and unpaidRequest data ---
  useEffect(() => {
    getAdminWalkRequests()
      .then((res) => {
        setAdminState((prev) => ({
          ...prev,
          walkRequests: res.data,
        }));
      });
    getUnpaidRequests()
      .then((res) => {
        setAdminState((prev) => ({
          ...prev,
          unpaidRequests: res.data,
        }));
      });
  }, [adminState.adminReFreshKey, state.reFreshKey]);

  //------------------------------------------------------------------------------------------------

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
              adminState={adminState}
            />
          )}
        />
        <Route
          path="/unpaid-dog-requests"
          element={(
            <UnpaidDogRequests
              setState={setState}
              adminState={adminState}
              setAdminState={setAdminState}
            />
          )}
        />
        <Route
          path="/walk-history"
          element={<WalkHistory adminState={adminState} />}
        />
        <Route
          path="/walk-history/detail"
          element={<WalkHistoryDetail />}
        />
        <Route
          path="/schedule"
          element={<Schedule state={state} />}
        />
        <Route
          path="/schedule/:date"
          element={<AdminWalk state={state} />}
        />
      </Routes>
    </>
  );
}

export default Admin;
