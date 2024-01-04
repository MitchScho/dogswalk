/* eslint-disable consistent-return */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import getAvailibleSpots from '../helpers/getAvailibleSpots';
import { deleteDogWalkRequest } from '../api';
// --- Style Imports ---
import './DateListItem.scss';
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
      return <button onClick={deleteWalkRequest}>Delete Walk Request</button>;
    }

    return availableSpots > 0 ? (
      <button onClick={clickToAddWalk}>Add To Walk</button>
    ) : (
      <div>no available spots</div>
    );
  };

  //------------------------------------------------------------------------------------------------
  // ---- Component return --------

  return (
    <div className="dateListItem">
      <div>{date.format('ddd')}</div>
      <div>
        {availibleSpotsForDate}
        {' '}
        spots available
      </div>
      <div>{requestButton(usersCurrentWalkRequest, availibleSpotsForDate)}</div>
      <div>{date.format('MMM D')}</div>
    </div>
  );
}

export default DateListItem;
