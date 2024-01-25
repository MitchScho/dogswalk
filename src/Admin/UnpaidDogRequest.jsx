/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import moment from 'moment';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
// import { NavLink } from 'react-router-dom';
import ConfirmationModal from '../components/ConfirmationModal';
import { updateWalkRequest } from '../api';
import './index.scss';

function UnpaidDogRequest({ walkRequest, setState, setAdminState }) {
  console.log('unpaid dog walk request', walkRequest);

  const date = moment(walkRequest.date);

  const isPaidForClass = walkRequest.paidFor
    ? 'paidFor-accepted'
    : 'notPaidFor-notAccepted';

  const [modalData, setModalData] = useState(null);

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

  // --- Handles confirmation of paidFor status ---
  const handlePaidFor = () => {
    setModalData({
      back: closeModal,
      // eslint-disable-next-line max-len
      confirm: () => confirmUpdate(walkRequest.id, {
        paidFor: !walkRequest.paidFor,
      }),
      message: walkRequest.paidFor
        ? 'Confirm walk is not paid for'
        : 'Confirm this is paid for',
    });
  };

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
        <button
          onClick={handlePaidFor}
          style={{ display: 'flex', alignItems: 'center' }}
          className={isPaidForClass}
        >
          <div style={{ paddingRight: '1em' }}>{date.format('MMM D')}</div>
          <FontAwesomeIcon
            style={{ paddingLeft: '1em' }}
            icon={faDollarSign}
          />
        </button>
      )}
    </div>
  );
}

export default UnpaidDogRequest;
