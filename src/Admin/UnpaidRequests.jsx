/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import UnpaidDog from './UnpaidDog';
import sortRequestsByDog from '../helpers/sortRequestsByDog';

function UnpaidRequests({ adminUnpaidRequests, setUnpaidDog }) {
  console.log('Unpaid requests', adminUnpaidRequests);

  const dogsWithUnpaidRequests = sortRequestsByDog(adminUnpaidRequests);

  //------------------------------------------------------------------------------------------------
  console.log('dogsWithUnpaidRequests', dogsWithUnpaidRequests);

  // --- Create Unpaid Dog List Array ----
  const unpaidRequestsDogList = Object.entries(dogsWithUnpaidRequests).map(
    (dog) => (
      <UnpaidDog
        key={dog[1][0].dogId}
        dog={dog}
        setUnpaidDog={setUnpaidDog}
      />
      // <NavLink
      //   to={`/admin/unpaid-dog-requests/${dog[1][0].dogName}`}
      //   key={dog[1][0].dogId}
      // >
      //   <UnpaidDog dog={dog} />
      // </NavLink>
    ),
  );
  console.log('unpaidRequestsDogList', unpaidRequestsDogList);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div />
        <h3>Unpaid Requests</h3>
        <NavLink to="/admin">back </NavLink>
      </div>
      <div>{unpaidRequestsDogList}</div>
    </>
  );
}

export default UnpaidRequests;