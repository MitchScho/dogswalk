/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import UnpaidRequestList from './UnpaidRequestList';

function UnpaidRequests({ adminUnpaidRequests }) {
  //------------------------------------------------------------------------------------------------
  // --- Create Admin Walk List Array ----
  const unpaidRequestArray = adminUnpaidRequests.map((unpaidRequest) => (
    <Link to={`/admin/unpaid-request/${unpaidRequest.id}`} key={unpaidRequest.id}>
      <UnpaidRequestList unpaidRequest={unpaidRequest} />
    </Link>
  ));

  return (
    <>
      <h3
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        Unpaid Requests
      </h3>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1em',
        }}
      >
        <div>Day</div>
        <div>Date</div>
        <div>Dogs Requested For Walk</div>
      </div>
      <div>{unpaidRequestArray}</div>
    </>
  );
}

export default UnpaidRequests;
