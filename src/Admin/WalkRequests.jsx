/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import WalkRequestList from './WalkRequestList';

function WalkRequests({ adminWalkRequests }) {
  //------------------------------------------------------------------------------------------------
  // --- Create Admin Walk List Array ----
  const walkRequestArray = adminWalkRequests.map((walkRequest) => (
    <Link to={`/admin/walk-request/${walkRequest.id}`} key={walkRequest.id}>
      <WalkRequestList walkRequest={walkRequest} />
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
        Walk Requests
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
      <div>{walkRequestArray}</div>
    </>
  );
}

export default WalkRequests;
