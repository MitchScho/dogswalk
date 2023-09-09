/* eslint-disable array-callback-return */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import UnpaidDogRequest from './UnpaidDogRequest';
// -----------------------------------------------------------------------------------------------

function UnpaidDogRequests({ unpaidDog }) {
  console.log('unpaidDog', unpaidDog[1]);

  const requestList = unpaidDog[1].map((request) => (
    <UnpaidDogRequest key={request.id} request={request} />
  ));

  console.log('request list', requestList);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>UnpaidDogRequests</div>
        <NavLink to="/admin/unpaid-requests">back </NavLink>
      </div>
      <div>{requestList}</div>
    </>
  );
}

export default UnpaidDogRequests;
