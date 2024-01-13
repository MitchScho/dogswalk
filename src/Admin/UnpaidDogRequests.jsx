/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable array-callback-return */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import UnpaidDogRequest from './UnpaidDogRequest';
//-----------------------------------------------------------------------------------------------

function UnpaidDogRequests({ unpaidDog, setState, setAdminState }) {
  console.log('unpaidDogRequests component ');

  const requestList = unpaidDog[1].map((walkRequest) => (
    <div key={walkRequest.id} className="light-button">
      <UnpaidDogRequest
        key={walkRequest.id}
        walkRequest={walkRequest}
        setState={setState}
        setAdminState={setAdminState}
      />
    </div>
  ));

  return (
    <>
      <div className="header-container">
        <div />
        <div>
          {unpaidDog[1][0].dogName}
          s
          {' '}
          Un Paid Requests
        </div>
        <NavLink to="/admin/unpaid-requests">
          <FontAwesomeIcon className="back-icon" icon={faCircleLeft} />
        </NavLink>
      </div>
      <div className="button-list-container">{requestList}</div>
    </>
  );
}

export default UnpaidDogRequests;
