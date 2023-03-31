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
function Admin({ walkRequests }) {
  // const [toggleAdmin, setToggleAdmin] = useState(null);
  const [adminWalkRequests, setAdminWalkRequests] = useState(walkRequests);
  const [state, setState] = useState({
    adminReFreshKey: 0,
  });

  //------------------------------------------------------------------------------------------------

  useEffect(() => {
    getUnFinalisedWalkRequests().then((res) => {
      setAdminWalkRequests(res.data);
    });
  }, [state.adminReFreshKey]);

  //-----------------------------------------------------------------------------------------------

  return (
    <>
      <Nav state={state} setState={setState} />
      <Routes>
        <Route path="/" element={<AdminHome adminWalkRequests={adminWalkRequests} />} />
        <Route
          path="/walk-request/:walkRequestId"
          element={
            <AdminListItem walkRequests={walkRequests} state={state} setState={setState} />
          }
        />
      </Routes>
    </>
  );
}

export default Admin;
