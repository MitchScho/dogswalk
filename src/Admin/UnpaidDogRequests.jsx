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
    <UnpaidDogRequest key={request.id} request={request} />
  ));

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div />
        <div>UnpaidDogRequests</div>
        <NavLink to="/admin/unpaid-requests">
          <FontAwesomeIcon className="back-icon" icon={faCircleLeft} />
        </NavLink>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {requestList}
      </div>
    </>
  );
}

export default UnpaidDogRequests;
