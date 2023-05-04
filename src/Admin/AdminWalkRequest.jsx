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
  getWalkDateDogs,

} from '../api';
// -----------------------------------------------------------------------------------------------

function AdminWalkRequest({
  state, setState, setAdminState, walkRequest,
}) {
  console.log(' state. walks', state.walks);
  console.log(' walkRequest', walkRequest);
  // const [walkRequest, setCurrentWalkRequest] = useState(null);
  const [walkRequestUser, setWalkRequestUser] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [walkForDate, setWalkForDate] = useState(null);
  // const params = useParams();
  console.log('walk for date', walkForDate);
  // ---------------------------------------------------------------------------------------------
  // --- Get walk call -----------
  // useEffect(() => {
  //   console.log('get walk request');
  //   getWalkRequest(walkRequest.id)
  //     .then((res) => {
  //       setCurrentWalkRequest(res.data);
  //     });
  // }, [adminState.adminReFreshKey, walkRequest.id]);// state.adminRefreshKey

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
  // console.log(walkRequest);
  useEffect(() => {
    // eslint-disable-next-line prefer-destructuring

    // const date = walkRequest;
    // console.log('date', date);

    getWalkDateDogs(walkRequest.id)
      .then((res) => {
        // console.log('Walk Date Dogs Response', res);
        setWalkForDate(res.data);
      });
  }, [modalData]);

  // console.log('walk for Date', walkForDate);
  // -------------------------------------------------------------------------------------------

  if (!walkRequest) {
    return <div>Loading no walk request...</div>;
  }

  //-----------------------------------------------------------------------------------------------
  // --- Store selected admin walk date as a moment object ---

  const adminWalkRequestDate = moment(new Date(walkRequest.date));
  console.log(adminWalkRequestDate);
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

  const availibleSpotsForDate = getAvailibleSpots(adminWalkRequestDate, state.walkRequests);
  const numberOfDogsOnWalk = 12 - availibleSpotsForDate;

  //---------------------------------------------------------------------------------------------

  const closeModal = () => {
    setModalData(null);
  };
  //-----------------------------------------------------------------------------
  const confirmUpdate = (id, payload) => {
    updateWalkRequest(id, payload)
      .then((res) => {
        console.log('confirm update response', res.data);
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

  console.log('walk request paid for', walkRequest.payedFor);
  console.log('walk request is Accepted', walkRequest.isAccepted);
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
          style={{ marginRight: '10em' }}
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
