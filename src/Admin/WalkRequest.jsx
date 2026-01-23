/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
//---------------------------------------------------------------------------
import moment from 'moment';
import { useEffect, useState } from 'react';
// --- Style Imports ---
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
// --- Api Imports ---
import {
  updateWalkRequest, getWalkRequestUser,
} from '../api';
// --- Helper Imports ---
import getAvailibleSpots from '../helpers/getAvailibleSpots';
// --- Image Imports ---
import Avatar from '../dog.thumbnail.png';
//-------------------------------------------------------------------

function WalkRequest({
  setAdminState, walkRequest, state, setState,
}) {
  const [walkRequestUser, setWalkRequestUser] = useState(null);
  const [optimisticAccepted, setOptimisticAccepted] = useState(null);
  const [showUndoToast, setShowUndoToast] = useState(false);
  const [undoTimeout, setUndoTimeout] = useState(null);

  useEffect(() => {
    getWalkRequestUser(walkRequest.userId)
      .then((res) => {
        setWalkRequestUser(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [walkRequest.userId]);

  // Cleanup timeout on unmount
  const clearUndoTimeout = () => {
    if (undoTimeout) {
      clearTimeout(undoTimeout);
    }
  };

  useEffect(() => clearUndoTimeout, []);

  // -------------------------------------------------------------------------------------------

  if (!walkRequest) {
    return <div>Loading no walk request...</div>;
  }

  //-----------------------------------------------------------------------------------------------
  // --- Store selected admin walk date as a moment object ---

  const adminWalkRequestDate = moment(new Date(walkRequest.date));

  //------------------------------------------------------------------------------------
  // --- Button Style rendering ---
  // Use optimistic state if available, otherwise use actual state
  const currentAcceptedState = optimisticAccepted !== null
    ? optimisticAccepted
    : walkRequest.isAccepted;

  const acceptBtnClass = `status-btn status-btn--accept ${currentAcceptedState ? 'is-on' : 'is-off'}`;

  // -----------------------------------------------------------------------------------------------
  // --- Number of dogs on walk ---

  const availibleSpotsForDate = getAvailibleSpots(
    adminWalkRequestDate,
    state.walks,
  );
  const numberOfDogsOnWalk = 22 - availibleSpotsForDate;

  //-----------------------------------------------------------------------------
  const confirmUpdate = (id, payload) => {
    updateWalkRequest(id, payload)
      .then(() => {
        setAdminState((prev) => ({
          ...prev,
          adminReFreshKey: prev.adminReFreshKey + 1,
        }));
        setState((prev) => ({
          ...prev,
          reFreshKey: prev.reFreshKey + 1,
        }));
      })
      .catch((err) => {
        console.log(err.message);
        // Revert optimistic update on error
        setOptimisticAccepted(null);
        setShowUndoToast(false);
      });
  };

  //-----------------------------------------------------------------------------------------------
  // --- Handles optimistic accept/reject with undo ---
  const handleIsAccepted = () => {
    const newAcceptedState = !walkRequest.isAccepted;

    // Optimistic update
    setOptimisticAccepted(newAcceptedState);
    setShowUndoToast(true);

    // Clear any existing timeout
    if (undoTimeout) {
      clearTimeout(undoTimeout);
    }

    // Set timeout to commit after 5 seconds
    const timeout = setTimeout(() => {
      confirmUpdate(walkRequest.id, {
        isAccepted: newAcceptedState,
      });
      setShowUndoToast(false);
      setOptimisticAccepted(null);
    }, 5000);

    setUndoTimeout(timeout);
  };

  // --- Handle undo action ---
  const handleUndo = () => {
    if (undoTimeout) {
      clearTimeout(undoTimeout);
      setUndoTimeout(null);
    }
    setOptimisticAccepted(null);
    setShowUndoToast(false);
  };

  //-----------------------------------------------------------------------------------------------
  // --- Dogs array to be displayed --------
  const dogs = walkRequest.dogs.map((dog) => (
    <img
      key={dog.id}
      src={dog.image == null ? Avatar : dog.image}
      alt={dog.name}
      className="walk-request-dog-image"
    />
  ));

  // --- Date request was made ---
  const requestCreatedDate = walkRequest.createdAt
    ? moment(walkRequest.createdAt)
    : null;

  //------------------------------------------------------------------------------------------------

  return (
    <div className="walk-request-wrapper">
      <div className="walkRequest-container">
        <div className="walk-request-field">
          <strong className="walk-request-mobile-heading">Request Date</strong>
          <div>
            {requestCreatedDate
              ? requestCreatedDate.format('ddd MMM D, YYYY')
              : '—'}
          </div>
        </div>
        <div className="walk-request-field">
          <strong className="walk-request-mobile-heading">User</strong>
          <div>{walkRequestUser && walkRequestUser.username}</div>
        </div>
        <div className="walk-request-field">
          <strong className="walk-request-mobile-heading">Message</strong>
          <div className="walk-request-message-placeholder">
            <textarea
              placeholder="Message placeholder"
              readOnly
              className="walk-request-message-input"
            />
          </div>
        </div>
        <div className="walk-request-field">
          <strong className="walk-request-mobile-heading">Dogs</strong>
          <div className="walk-request-dogs">{dogs}</div>
        </div>
        <div className="walk-request-field">
          <strong className="walk-request-mobile-heading">Accept Request</strong>
          <button
            onClick={handleIsAccepted}
            className={acceptBtnClass}
            aria-pressed={walkRequest.isAccepted}
          >
            <FontAwesomeIcon icon={faCheck} />
            <span className="sr-only">Accept</span>
          </button>
        </div>
        <div className="walk-request-field">
          <strong className="walk-request-mobile-heading">Dogs On Walk</strong>
          <div>{numberOfDogsOnWalk}</div>
        </div>
        <div className="walk-request-field">
          <strong className="walk-request-mobile-heading">Walk Date</strong>
          <div>
            {adminWalkRequestDate.format('ddd')}
            {adminWalkRequestDate.format(' MMM D, YYYY')}
          </div>
        </div>
      </div>
      {showUndoToast && (
        <div className="undo-toast">
          <span className="undo-toast-message">
            {optimisticAccepted ? 'Request accepted' : 'Request rejected'}
          </span>
          <button
            type="button"
            className="undo-toast-button"
            onClick={handleUndo}
          >
            Undo
          </button>
        </div>
      )}
    </div>
  );
}

export default WalkRequest;
