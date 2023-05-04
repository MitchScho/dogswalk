/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import getAvailibleSpots from '../helpers/getAvailibleSpots';
// ---Import Components ---
import ConfirmationModal from '../components/ConfirmationModal';
// --- Import api ---
import {
  getUnpaidRequest,
  getWalkRequestUser,
  updateWalkRequest,
  getWalkDateDogs,
} from '../api';
// -----------------------------------------------------------------------------------------------

function UnpaidRequest({
  state, setState, adminState, setAdminState,
}) {
  console.log(state.walks);
  const [unpaidRequest, setUnpaidRequest] = useState(null);
  const [walkRequestUser, setWalkRequestUser] = useState(null);
  const [modalData, setModalData] = useState(null);
  // const [walksForDate, setWalksForDate] = useState(null);
  const params = useParams();

  // ---------------------------------------------------------------------------------------------
  // --- Get walk call -----------
  useEffect(() => {
    getUnpaidRequest(params.walkRequestId).then((res) => {
      setUnpaidRequest(res.data);
    });
  }, [adminState.adminReFreshKey, params.walkRequestId]); // state.adminRefreshKey

  // -----------------------------------------------------------------------------------------------

  useEffect(() => {
    getWalkRequestUser(params.walkRequestId)
      .then((res) => {
        setWalkRequestUser(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [params.walkRequestId]);

  // -------------------------------------------------------------------------------------------
  // console.log(unpaidRequest);
  useEffect(() => {
    // eslint-disable-next-line prefer-destructuring

    // const date = unpaidRequest;
    // console.log('date', date);

    getWalkDateDogs(params.walkRequestId).then((res) => {
      console.log('Walk Date Dogs Response', res);
    });
  }, [params.walkRequestId]);
  // -------------------------------------------------------------------------------------------

  if (!unpaidRequest) {
    return <div>Loading...</div>;
  }

  //-----------------------------------------------------------------------------------------------
  // --- Store selected admin walk date as a moment object ---

  const adminWalkRequestDate = moment(new Date(unpaidRequest.date));
  console.log(adminWalkRequestDate);
  //------------------------------------------------------------------------------------
  // --- Button Style rendering ---

  const isAcceptedClass = unpaidRequest.isAccepted
    ? 'payedFor-accepted'
    : 'notPayedFor-accepted';
  const isPayedForClass = unpaidRequest.payedFor
    ? 'payedFor-accepted'
    : 'notPayedFor-accepted';

  // -----------------------------------------------------------------------------------------------
  // --- Number of dogs on walk ---

  const availibleSpotsForDate = getAvailibleSpots(
    adminWalkRequestDate,
    state.walkRequests,
  );
  const numberOfDogsOnWalk = 12 - availibleSpotsForDate;

  //---------------------------------------------------------------------------------------------

  const closeModal = () => {
    setModalData(null);
  };
  //-----------------------------------------------------------------------------

  const confirmUpdate = (id, payload) => {
    updateWalkRequest(id, payload).then(() => {
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
      confirm: () => confirmUpdate(unpaidRequest.id, { isAccepted: !unpaidRequest.isAccepted }),
      message: unpaidRequest.isAccepted
        ? 'Confirm walk is not accepted'
        : 'Confirm this is accepted',
    });
  };

  //------------------------------------------------------------------------------------------------
  // --- Handles confirmation of payedFor status ---
  const handlePayedFor = () => {
    setModalData({
      back: closeModal,
      confirm: () => confirmUpdate(unpaidRequest.id, { payedFor: !unpaidRequest.payedFor }),
      message: unpaidRequest.payedFor
        ? 'Confirm walk is not payed for'
        : 'Confirm this is payed for',
    });
  };

  //-----------------------------------------------------------------------------------------------
  // --- Dogs array to be displayed --------
  const dogs = unpaidRequest.dogs.map((dog) => (
    <div key={dog.id}>{dog.name}</div>
  ));

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div />
        <h3>Walk Request</h3>
        <NavLink to="/admin">back </NavLink>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>Day</div>
        <div>Date</div>
        <div>User</div>
        <div>Dogs</div>
        <div>Payed For</div>
        <div>Is Accepted</div>
        <div>No. of dogs already on this date</div>
      </div>
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
          /12
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

export default UnpaidRequest;
