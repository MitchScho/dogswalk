/* eslint-disable consistent-return */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
// --- Helper Imports ---
import getAvailibleSpots from '../helpers/getAvailibleSpots';
// --- Style Imports ---
import './DateListItem.scss';
// --- Api Imports ---
import { deleteDogWalkRequest } from '../api';
//------------------------------------------------------------------------------------------------

function DateListItem({
  date, setAddWalkDate, state, setState,
}) {
  //-----------------------------------------------------------------------------------------------
  // --- Update availible spots ---

  const availibleSpotsForDate = getAvailibleSpots(date, state.walks);

  //-----------------------------------------------------------------------------------------------

  const findUsersCurrentWalkRequest = () => {
    if (state.user && state.walkRequests) {
      const usersWalkRequest = state.walkRequests.find((walkRequest) => (
        date.isSame(walkRequest.date, 'day')
          && walkRequest.userId === state.user.id
      ));

      return usersWalkRequest;
    }
  };

  const usersCurrentWalkRequest = findUsersCurrentWalkRequest();

  //------------------------------------------------------------------------------------------------
  const clickToAddWalk = () => {
    if (!usersCurrentWalkRequest) {
      setAddWalkDate(date);
    }
  };

  //------------------------------------------------------------------------------------------------

  const deleteWalkRequest = () => {
    if (usersCurrentWalkRequest?.id) {
      deleteDogWalkRequest(usersCurrentWalkRequest.id).then(() => {
        setState((prev) => ({
          ...prev,
          reFreshKey: prev.reFreshKey + 1,
        }));
      });
    }
  };

  //------------------------------------------------------------------------------------------------

  // const handleBlur = (e) => {
  // const currentTarget = e.currentTarget;

  // // Check the newly focused element in the next tick of the event loop
  // setTimeout(() => {
  //   // Check if the new activeElement is a child of the original container
  //   if (!currentTarget.contains(document.activeElement)) {
  //     // You can invoke a callback or add custom logic here
  //     console.log("blur");
  //   }
  // }, 0);
  //   console.log('blur');
  // };
  //------------------------------------------------------------------------------------------------
  const requestButton = (usersCurrentRequest, availableSpots) => {
    if (usersCurrentRequest) {
      return <button className="light-button" onClick={deleteWalkRequest}>Delete Request</button>;
    }

    return availableSpots > 0 ? (
      <button className="light-button" onClick={clickToAddWalk}>
        Add To Walk
      </button>
    ) : (
      <div>no available spots</div>
    );
  };

  //------------------------------------------------------------------------------------------------
  // ---- Component return --------

  return (
    <div className="date-list-item-container">
      <div className=" flex justify-between items-center">
        <div>{date.format('dddd')}</div>
        <div>{date.format('MMM D')}</div>
      </div>
      <div className="date-list-item-footer">
        <div>
          {availibleSpotsForDate}
          {' '}
          spots available
        </div>
        <div>
          {requestButton(usersCurrentWalkRequest, availibleSpotsForDate)}
        </div>
      </div>
    </div>
  );
}

export default DateListItem;
