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

//---------------------------------------------------------------------------
function WalkRequests({
  state, setState, adminState,
  setAdminState,
}) {
  //------------------------------------------------------------------------------------------------

  if (!adminState.walkRequests) {
    return <div>Loading...</div>;
  }

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
        <h3>Walk Requests</h3>
        <NavLink to="/admin">
          <FontAwesomeIcon className="back-icon" icon={faCircleLeft} />
        </NavLink>
      </div>
      <div className="walkRequest-container walkRequest-header">
        <div className="walk-request-field">
          <strong>Request Date</strong>
        </div>
        <div className="walk-request-field">
          <strong>User</strong>
        </div>
        <div className="walk-request-field">
          <strong>Message</strong>
        </div>
        <div className="walk-request-field">
          <strong>Dogs</strong>
        </div>
        <div className="walk-request-field">
          <strong>Accept Request</strong>
        </div>
        <div className="walk-request-field">
          <strong>Dogs On Walk</strong>
        </div>
        <div className="walk-request-field">
          <strong>Walk Date</strong>
        </div>
      </div>
      <div>{walkRequestArray}</div>
    </>
  );
}

export default WalkRequests;
