/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import UnpaidDog from './UnpaidDog';
import sortRequestsByDog from '../helpers/sortRequestsByDog';

function UnpaidRequests({ adminState, setAdminState }) {
  console.log('Unpaid requests', adminState.unpaidRequests);

  const dogsWithUnpaidRequests = sortRequestsByDog(adminState.unpaidRequests);
  // const [trigger, setTrigger] = useState(null);

  // useEffect(() => {
  //   sortRequestsByDog(adminState.unpaidRequests);
  // }, [dogsWithUnpaidRequests]);
  //------------------------------------------------------------------------------------------------
  console.log('dogs With Unpaid Requests', dogsWithUnpaidRequests);

  // --- Create Unpaid Dog List Array ----
  const unpaidRequestsDogList = Object.entries(dogsWithUnpaidRequests).map(
    (unpaidDog) => (
      <div key={unpaidDog[1][0].dogId} className="light-button">
        <UnpaidDog
          key={unpaidDog[1][0].dogId}
          unpaidDog={unpaidDog}
          setAdminState={setAdminState}
        />
      </div>
      // <NavLink
      //   to={`/admin/unpaid-dog-requests/${dog[1][0].dogName}`}
      //   key={dog[1][0].dogId}
      // >
      //   <UnpaidDog dog={dog} />
      // </NavLink>
    ),
  );

  return (
    <>
      <div className="header-container">
        <div />
        <h3>Unpaid Requests</h3>
        <NavLink to="/admin">
          <FontAwesomeIcon className="back-icon" icon={faCircleLeft} />
          {' '}
        </NavLink>
      </div>
      <div className="button-list-container">{unpaidRequestsDogList}</div>
    </>
  );
}

export default UnpaidRequests;
