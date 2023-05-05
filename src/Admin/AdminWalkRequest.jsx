/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import moment from 'moment';
import { useEffect, useState } from 'react';
import getAvailibleSpots from '../helpers/getAvailibleSpots';
// ---Import Components ---
import ConfirmationModal from '../components/ConfirmationModal';
// --- Import api ---
import {
  getWalkRequestUser,
  updateWalkRequest,

} from '../api';
// -----------------------------------------------------------------------------------------------

function AdminWalkRequest({
  setAdminState, walkRequest, state, setState,
}) {
  const [walkRequestUser, setWalkRequestUser] = useState(null);
  const [modalData, setModalData] = useState(null);

  // -----------------------------------------------------------------------------------------------

  useEffect(() => {
    getWalkRequestUser(walkRequest.id)
      .then((res) => {
        setWalkRequestUser(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [walkRequest.id]);

  // -------------------------------------------------------------------------------------------

  if (!walkRequest) {
    return <div>Loading no walk request...</div>;
  }

  //-----------------------------------------------------------------------------------------------
  // --- Store selected admin walk date as a moment object ---

  const adminWalkRequestDate = moment(new Date(walkRequest.date));

  //------------------------------------------------------------------------------------
  // --- Button Style rendering ---

  const isAcceptedClass = walkRequest.isAccepted
    ? 'payedFor-accepted'
    : 'notPayedFor-accepted';
  const isPayedForClass = walkRequest.payedFor
    ? 'payedFor-accepted'
    : 'notPayedFor-accepted';

  // -----------------------------------------------------------------------------------------------
  // --- Number of dogs on walk ---

  const availibleSpotsForDate = getAvailibleSpots(adminWalkRequestDate, state.walks);
  const numberOfDogsOnWalk = 12 - availibleSpotsForDate;

  //---------------------------------------------------------------------------------------------

  const closeModal = () => {
    setModalData(null);
  };
  //-----------------------------------------------------------------------------
  const confirmUpdate = (id, payload) => {
    updateWalkRequest(id, payload)
      .then((res) => {
        console.log('confirm update response', res.data.message);
        setAdminState((prev) => ({
          ...prev,
          adminReFreshKey: prev.adminReFreshKey + 1,
        }));
        setState((prev) => ({
          ...prev,
          reFreshKey: prev.reFreshKey + 1,
        }));
      });
    closeModal();
  };

  //-----------------------------------------------------------------------------------------------
  // --- Handles confirmation of isAccepted status ---
  const handleIsAccepted = () => {
    setModalData({
      back: closeModal,
      // eslint-disable-next-line max-len
      confirm: () => confirmUpdate(walkRequest.id, { isAccepted: !walkRequest.isAccepted }),
      message: walkRequest.isAccepted ? 'Confirm walk is not accepted' : 'Confirm this is accepted',
    });
  };

  //------------------------------------------------------------------------------------------------
  // --- Handles confirmation of payedFor status ---
  const handlePayedFor = () => {
    setModalData({
      back: closeModal,
      // eslint-disable-next-line max-len
      confirm: () => confirmUpdate(walkRequest.id, { payedFor: !walkRequest.payedFor }),
      message: walkRequest.payedFor ? 'Confirm walk is not payed for' : 'Confirm this is payed for',
    });
  };

  //-----------------------------------------------------------------------------------------------
  // --- Dogs array to be displayed --------
  const dogs = walkRequest.dogs.map((dog) => <div key={dog.id}>{dog.name}</div>);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>{adminWalkRequestDate.format('dddd')}</div>
        <div>{adminWalkRequestDate.format('MMM D')}</div>
        <div>{walkRequestUser && walkRequestUser.username}</div>
        <div>{dogs}</div>
        <button onClick={handlePayedFor} className={isPayedForClass}>
          Payed For
        </button>
        <button
          style={{ marginRight: '1em' }}
          onClick={handleIsAccepted}
          className={isAcceptedClass}
        >
          Is Accepted
        </button>
        <div>
          {numberOfDogsOnWalk}
          dogs already on this date
        </div>
      </div>
      {modalData && (
        <ConfirmationModal
          style={{ display: 'flex', flexDirection: 'row-reverse' }}
          confirm={modalData.confirm}
          back={modalData.back}
          message={modalData.message}
        />
      )}
    </>
  );
}

export default AdminWalkRequest;
