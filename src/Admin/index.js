/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

// --- Component Imports ---
import {
  Routes, Route,
} from 'react-router-dom';

import AdminListItem from './AdminListItem';
import AdminHome from './AdminHome';
import Nav from '../components/Nav';
// --- Router Imports ---
// --- Style Imports ---
import './index.scss';
// --- API Imports ---
import { getUnFinalisedWalkRequests } from '../api';

//-------------------------------------------------------------------------------------------------
function Admin({ state, setState }) {
  const [adminWalkRequests, setAdminWalkRequests] = useState(state.walkRequests);
  const [adminState, setAdminState] = useState({
    adminReFreshKey: 0,
  });

  //------------------------------------------------------------------------------------------------

  useEffect(() => {
    getUnFinalisedWalkRequests().then((res) => {
      setAdminWalkRequests(res.data);
    });
  }, [adminState.adminReFreshKey]);

  //-----------------------------------------------------------------------------------------------

  return (
    <>
      <Nav state={state} setState={setState} />
      <Routes>
        <Route path="/" element={<AdminHome adminWalkRequests={adminWalkRequests} />} />
        <Route
          path="/walk-request/:walkRequestId"
          element={(
            <AdminListItem
              state={state}
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
