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
  const [adminState, setAdminState] = useState({
    unpaidRequests: [],
    walkRequests: [],
    unpaidDog: [],
    adminReFreshKey: 0,
  });

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

  // useEffect(() => {
  //   getUnpaidRequests()
  //     .then((res) => {
  //       setAdminUnpaidRequests(res.data);
  //     });
  // }, [adminState.adminReFreshKey, state.reFreshKey]);
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
              setAdminState={setAdminState}
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
      </Routes>
    </>
  );
}

export default Admin;
