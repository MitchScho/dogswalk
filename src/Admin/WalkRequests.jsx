/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
//--------------------------------------------------------------------------
import { useState, useEffect } from 'react';
// --- Style Imports ---
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// --- Router Imports ---
import { NavLink } from 'react-router-dom';
// --- Component Imports ---
import WalkRequest from './WalkRequest';

//---------------------------------------------------------------------------
function WalkRequests({
  state, setState, adminState,
  setAdminState,
}) {
  // Track optimistic accepted states for each walk request
  const [optimisticStates, setOptimisticStates] = useState({});

  // Clear optimistic states when requests are actually accepted on the server
  useEffect(() => {
    if (!adminState.walkRequests) return;

    setOptimisticStates((prev) => {
      const newState = { ...prev };
      let hasChanges = false;

      // Check each optimistic state
      Object.keys(newState).forEach((requestId) => {
        const requestIdNum = parseInt(requestId, 10);
        const walkRequest = adminState.walkRequests.find((wr) => wr.id === requestIdNum);

        // If the request is now accepted on the server, clear the optimistic state
        if (walkRequest && walkRequest.isAccepted && newState[requestId] === true) {
          delete newState[requestId];
          hasChanges = true;
        }
      });

      return hasChanges ? newState : prev;
    });
  }, [adminState.walkRequests]);

  //------------------------------------------------------------------------------------------------

  if (!adminState.walkRequests) {
    return <div>Loading...</div>;
  }

  // Filter out accepted walk requests
  // Keep requests with optimistic states in the list (they will be hidden by WalkRequest component
  // only after the toast times out and server confirms acceptance)
  const unacceptedWalkRequests = adminState.walkRequests.filter((walkRequest) => {
    const optimisticAccepted = optimisticStates[walkRequest.id];
    // If there's an optimistic state, keep it in the list (it will handle its own visibility)
    if (optimisticAccepted !== undefined) {
      return true;
    }
    // Otherwise, filter out accepted requests
    return !walkRequest.isAccepted;
  });

  // Callback to update optimistic state
  const handleOptimisticStateChange = (requestId, isAccepted) => {
    setOptimisticStates((prev) => ({
      ...prev,
      [requestId]: isAccepted,
    }));
  };

  // Callback to clear optimistic state (on undo or commit)
  const handleClearOptimisticState = (requestId) => {
    setOptimisticStates((prev) => {
      const newState = { ...prev };
      delete newState[requestId];
      return newState;
    });
  };

  // --- Create Admin Walk List Array ----
  const walkRequestArray = unacceptedWalkRequests.map((walkRequest) => (
    <WalkRequest
      key={walkRequest.id}
      walkRequest={walkRequest}
      state={state}
      setState={setState}
      adminState={adminState}
      setAdminState={setAdminState}
      onOptimisticStateChange={handleOptimisticStateChange}
      onClearOptimisticState={handleClearOptimisticState}
    />
  ));

  //--------------------------------------------------------------------------------------

  return (
    <>
      <div className="header-container">
        <h3>Walk Requests</h3>
        <NavLink to="/admin">
          <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
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
