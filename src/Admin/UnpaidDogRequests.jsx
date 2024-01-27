/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable array-callback-return */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import UnpaidDogRequest from './UnpaidDogRequest';
//-----------------------------------------------------------------------------------------------

function UnpaidDogRequests({
  setState, setAdminState, adminState,
}) {
  console.log('unpaidDogRequests component unpaidDog...', adminState.unpaidDog[1]);

  // eslint-disable-next-line max-len
  // when that new state gets updated in the unpaid dog request trigger the unPaidDog state change here
  // const [trigger, setTrigger] = useState(null);
  // useEffect(() => {
  //   console.log('trigger upstream unpaidDog');
  //   setAdminState((prev) => ({
  //     ...prev,
  //     adminReFreshKey: prev.adminReFreshKey + 1,
  //   }));
  //   setState((prev) => ({
  //     ...prev,
  //     reFreshKey: prev.reFreshKey + 1,
  //   }));
  // }, [trigger]);

  const requestList = adminState.unpaidDog[1].map((walkRequest) => (
    <div key={walkRequest.id} className="light-button">
      <UnpaidDogRequest
        key={walkRequest.id}
        walkRequest={walkRequest}
        /// a new state here
        setState={setState}
        adminState={adminState}
        setAdminState={setAdminState}
      />
    </div>
  ));

  return (
    <>
      <div className="header-container">
        <div />
        <div>
          {adminState.unpaidDog[1][0].dogName}
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
