/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
//---------------------------------------------------------------------------
import moment from 'moment';
import { useState } from 'react';
// --- Style Imports ---
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
// --- Component Imports ---
import ConfirmationModal from '../components/ConfirmationModal';
// --- API Imports ---
import { updateWalkRequest } from '../api';

function UnpaidDogRequest({
  walkRequest,
  setTrigger,
  trigger,
  unpaidDog2,
  setUnpaidDog2,
}) {
  const date = moment(walkRequest.date);

  const isPaidForClass = walkRequest.paidFor
    ? 'paidFor-accepted'
    : 'notPaidFor-notAccepted';

  const [modalData, setModalData] = useState(null);

  const closeModal = () => {
    setModalData(null);
  };

  const dumpUnpaidDog = unpaidDog2;
  const indexOfWalkRequest = unpaidDog2.indexOf(walkRequest);

  const walkRequestDump = walkRequest;
  //-----------------------------------------------------------------------------
  const confirmUpdate = (id, payload) => {
    walkRequestDump.paidFor = !walkRequestDump.paidFor;
    updateWalkRequest(id, payload)
      .then(() => {
        // This setTrigger state is purely used to trigger a refresh in the upstream component.
        // I don't believe this to be necessary re visit and check if actually needed.
        setTrigger(!trigger);
        dumpUnpaidDog[indexOfWalkRequest] = walkRequestDump;
        setUnpaidDog2(dumpUnpaidDog);
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
      confirm: () => {
        confirmUpdate(walkRequest.id, {
          paidFor: !walkRequest.paidFor,
          isAccepted: true,
        });
      },
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
          <FontAwesomeIcon style={{ paddingLeft: '1em' }} icon={faDollarSign} />
        </button>
      )}
    </div>
  );
}

export default UnpaidDogRequest;
