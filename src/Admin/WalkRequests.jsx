/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
// import WalkRequestList from './WalkRequestList';
import AdminWalkRequest from './AdminWalkRequest';

function WalkRequests({
  adminWalkRequests, state, setState, adminState, setAdminState,
}) {
  //------------------------------------------------------------------------------------------------
  console.log('walk requets in list', adminWalkRequests);
  if (!adminWalkRequests) {
    return <div>Loading...</div>;
  }

  // --- Create Admin Walk List Array ----
  const walkRequestArray = adminWalkRequests.map((walkRequest) => (
    <AdminWalkRequest
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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div />
        <h3>Walk Requests</h3>
        <NavLink to="/admin">back </NavLink>
      </div>
      <div>{walkRequestArray}</div>
    </>
  );
}

export default WalkRequests;
