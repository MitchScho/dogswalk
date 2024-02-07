/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
//--------------------------------------------------------------------------
// --- Style Imports ---
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
// --- Router Imports ---
import { NavLink } from 'react-router-dom';
// --- Component Imports ---
import WalkRequest from './WalkRequest';
// --- API Imports ---
import { deletePaidWalkRequests } from '../api';

//---------------------------------------------------------------------------
function WalkRequests({
  state, setState, adminState,
  setAdminState,
}) {
  //------------------------------------------------------------------------------------------------

  if (!adminState.walkRequests) {
    return <div>Loading...</div>;
  }

  const clearPaidRequests = () => {
    deletePaidWalkRequests().then(() => {
      setAdminState((prev) => ({
        ...prev,
        adminReFreshKey: prev.adminReFreshKey + 1,
      }));
    });
  };
    // --- Create Admin Walk List Array ----
  const walkRequestArray = adminState.walkRequests.map((walkRequest) => (
    <WalkRequest
      key={walkRequest.id}
      walkRequest={walkRequest}
      state={state}
      setState={setState}
      adminState={adminState}
      setAdminState={setAdminState}
    />
  ));

  //--------------------------------------------------------------------------------------

  return (
    <>
      <div className="header-container">
        <button className="purple-button" onClick={clearPaidRequests}>
          Clear Paid Requests
        </button>
        <h3>Walk Requests</h3>
        <NavLink to="/admin">
          <FontAwesomeIcon className="back-icon" icon={faCircleLeft} />
        </NavLink>
      </div>
      <div>{walkRequestArray}</div>
    </>
  );
}

export default WalkRequests;
