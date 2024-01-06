/* eslint-disable array-callback-return */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import UnpaidDogRequest from './UnpaidDogRequest';
// -----------------------------------------------------------------------------------------------

function UnpaidDogRequests({ unpaidDog }) {
  // console.log('unpaidDog', unpaidDog[1]);

  const requestList = unpaidDog[1].map((request) => (
    <div key={request.id} className="light-button">
      <UnpaidDogRequest key={request.id} request={request} />
    </div>
  ));

  return (
    <>
      <div className="header-container">
        <div />
        <div>UnpaidDogRequests</div>
        <NavLink to="/admin/unpaid-requests">
          <FontAwesomeIcon className="back-icon" icon={faCircleLeft} />
        </NavLink>
      </div>
      <div className="button-list-container">
        {requestList}
      </div>
    </>
  );
}

export default UnpaidDogRequests;
