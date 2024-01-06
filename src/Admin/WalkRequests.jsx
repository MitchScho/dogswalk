/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
//--------------------------------------------------------------------------
// --- Style Imports ---
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
// import './WalkRequests.scss';
//---------------------------------------------------------------------------
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
      <div className="header-container">
        <button className="purple-button" onClick={clearPaidRequests}>Clear Paid Requests</button>
        <h3>Walk Requests</h3>
        <NavLink to="/admin">
          <FontAwesomeIcon className="back-icon" icon={faCircleLeft} />
        </NavLink>
      </div>
      <div>{walkRequestArray}</div>
    </>
  );
}

export default WalkRequests;
