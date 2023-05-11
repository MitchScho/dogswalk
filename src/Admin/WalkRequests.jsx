/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import { deletePaidWalkRequests } from '../api';
// import WalkRequestList from './WalkRequestList';
import WalkRequest from './WalkRequest';

function WalkRequests({
  adminWalkRequests, state, setState, adminState, setAdminState,
}) {
  //------------------------------------------------------------------------------------------------

  if (!adminWalkRequests) {
    return <div>Loading...</div>;
  }

  const clearPaidRequests = () => {
    console.log('clear paid requests');
    deletePaidWalkRequests()
      .then(() => {
        setAdminState((prev) => ({
          ...prev,
          adminReFreshKey: prev.adminReFreshKey + 1,
        }));
      });
  };

  // --- Create Admin Walk List Array ----
  const walkRequestArray = adminWalkRequests.map((walkRequest) => (
    <WalkRequest
      key={walkRequest.id}
      walkRequest={walkRequest}
      state={state}
      setState={setState}
      adminState={adminState}
      setAdminState={setAdminState}
    />
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
        <button onClick={clearPaidRequests}>Clear Paid Requests</button>
        <h3>Walk Requests</h3>
        <NavLink to="/admin">back </NavLink>
      </div>
      <div>{walkRequestArray}</div>
    </>
  );
}

export default WalkRequests;
