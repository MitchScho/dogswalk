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
// --- Component Imports ---
import ConfirmationModal from '../components/ConfirmationModal';
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
  const [modalData, setModalData] = useState(null);
  const [walkRequestUser, setWalkRequestUser] = useState(null);

  useEffect(() => {
    getWalkRequestUser(walkRequest.userId)
      .then((res) => {
        setWalkRequestUser(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [walkRequest.userId]);

  // -------------------------------------------------------------------------------------------

  if (!walkRequest) {
    return <div>Loading no walk request...</div>;
  }

  //-----------------------------------------------------------------------------------------------
  // --- Store selected admin walk date as a moment object ---

  const adminWalkRequestDate = moment(new Date(walkRequest.date));

  //------------------------------------------------------------------------------------
  // --- Button Style rendering ---
  const acceptBtnClass = `status-btn status-btn--accept ${walkRequest.isAccepted ? 'is-on' : 'is-off'}`;

  // -----------------------------------------------------------------------------------------------
  // --- Number of dogs on walk ---

  const availibleSpotsForDate = getAvailibleSpots(
    adminWalkRequestDate,
    state.walks,
  );
  const numberOfDogsOnWalk = 12 - availibleSpotsForDate;

  //---------------------------------------------------------------------------------------------
  const closeModal = () => {
    setModalData(null);
  };
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
      });
    closeModal();
  };

  //-----------------------------------------------------------------------------------------------
  // --- Handles confirmation of isAccepted status ---
  const handleIsAccepted = () => {
    setModalData({
      back: closeModal,
      // eslint-disable-next-line max-len
      confirm: () => confirmUpdate(walkRequest.id, {
        isAccepted: !walkRequest.isAccepted,
      }),
      message: walkRequest.isAccepted
        ? 'Confirm walk is not accepted'
        : 'Confirm this is accepted',
    });
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
    <div>
      {modalData ? (
        <ConfirmationModal
          style={{ display: 'flex', flexDirection: 'row-reverse' }}
          confirm={modalData.confirm}
          back={modalData.back}
          message={modalData.message}
        />
      ) : (
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
      )}
    </div>
  );
}

export default WalkRequest;
