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
import UnpaidWalks from './UnpaidWalks';
import UnpaidWalksDetail from './UnpaidWalksDetail';
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
  getMe, getAdminWalkRequests, getAdminClients, getAdminWalks,
} from '../api';

//-------------------------------------------------------------------------------------------------
function Admin({ state, setState }) {
  const [adminState, setAdminState] = useState({
    walkRequests: [],
    walks: [],
    clients: [],
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
  // --- get walkRequests data, unpaidRequest data, walks, and clients ---
  useEffect(() => {
    getAdminWalkRequests()
      .then((res) => {
        setAdminState((prev) => ({
          ...prev,
          walkRequests: res.data,
        }));
      });
    getAdminWalks()
      .then((res) => {
        setAdminState((prev) => ({
          ...prev,
          walks: res.data,
        }));
      })
      .catch((err) => {
        console.error('Error fetching walks:', err.message);
      });
    getAdminClients()
      .then((res) => {
        setAdminState((prev) => ({
          ...prev,
          clients: res.data,
        }));
      })
      .catch((err) => {
        console.error('Error fetching clients:', err.message);
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
          path="/unpaid-walks"
          element={(
            <UnpaidWalks
              adminState={adminState}
            />
          )}
        />
        <Route
          path="/unpaid-walks/detail"
          element={(
            <UnpaidWalksDetail
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
          element={<WalkHistoryDetail adminState={adminState} />}
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
