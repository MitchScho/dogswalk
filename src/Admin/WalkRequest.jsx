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
import { faDollarSign, faCheck } from '@fortawesome/free-solid-svg-icons';
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

  // const isAcceptedClass = walkRequest.isAccepted
  //   ? 'paidFor-accepted'
  //   : 'notPaidFor-notAccepted';
  // const isPaidForClass = walkRequest.paidFor
  //   ? 'paidFor-accepted'
  //   : 'notPaidFor-notAccepted';
  const acceptBtnClass = `status-btn status-btn--accept ${walkRequest.isAccepted ? 'is-on' : 'is-off'}`;
  const paidBtnClass = `status-btn status-btn--paid ${walkRequest.paidFor ? 'is-on' : 'is-off'}`;

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
        paidFor: walkRequest.paidFor,
      }),
      message: walkRequest.isAccepted
        ? 'Confirm walk is not accepted'
        : 'Confirm this is accepted',
    });
  };

  //------------------------------------------------------------------------------------------------
  // --- Handles confirmation of paidFor status ---
  const handlePaidFor = () => {
    setModalData({
      back: closeModal,
      // eslint-disable-next-line max-len
      confirm: () => confirmUpdate(walkRequest.id, {
        paidFor: !walkRequest.paidFor,
        isAccepted: walkRequest.isAccepted,
      }),
      message: walkRequest.paidFor
        ? 'Confirm walk is not paid for'
        : 'Confirm this is paid for',
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
          {/* <FontAwesomeIcon icon={faEnvelope} /> */}
          <div>{adminWalkRequestDate.format('ddd')}</div>
          <div>{adminWalkRequestDate.format('MMM D')}</div>
          <div>{walkRequestUser && walkRequestUser.username}</div>
          <div>{dogs}</div>
          {/* <button
            style={{ marginRight: '1em' }}
            onClick={handleIsAccepted}
            className={isAcceptedClass}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
          {walkRequest.isAccepted ? (
            <button onClick={handlePaidFor} className={isPaidForClass}>
              <FontAwesomeIcon icon={faDollarSign} />
            </button> */}
          <div>
            <button
              onClick={handleIsAccepted}
              className={acceptBtnClass}
              aria-pressed={walkRequest.isAccepted}
            >
              <FontAwesomeIcon icon={faCheck} />
              <span className="sr-only">Accept</span>
            </button>

            {walkRequest.isAccepted ? (
              <button
                onClick={handlePaidFor}
                className={paidBtnClass}
                aria-pressed={walkRequest.paidFor}
              >
                <FontAwesomeIcon icon={faDollarSign} />
                <span className="sr-only">Paid</span>
              </button>
            ) : (
              <div />
            )}
            <div>
              {numberOfDogsOnWalk}
              dogs on this date
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WalkRequest;
