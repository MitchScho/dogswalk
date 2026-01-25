/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
//---------------------------------------------------------------------------
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import AdminDog from './AdminDog';
import sortAllRequestsByDog from '../helpers/sortAllRequestsByDog';
import './index.scss';

function WalkHistory({ adminState }) {
  const navigate = useNavigate();
  const [dogsWithRequests, setDogsWithRequests] = useState({});

  useEffect(() => {
    const sorted = sortAllRequestsByDog(adminState.walkRequests || []);
    setDogsWithRequests(sorted);
  }, [adminState.walkRequests, adminState.adminReFreshKey]);

  const dogList = Object.entries(dogsWithRequests).map(([dogName, requests]) => {
    const { dogId, image } = requests[0];
    return (
      <div key={dogId} className="dog-light-button">
        <AdminDog
          dogId={dogId}
          dogName={dogName}
          dogImage={image}
          navigate={navigate}
          navigateTo="/admin/walk-history/detail"
        />
      </div>
    );
  });

  return (
    <>
      <div className="header-container">
        <div />
        <h3>Walk History</h3>
        <NavLink to="/admin">
          <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
        </NavLink>
      </div>
      <div className="button-list-container walk-history-avatars">
        {dogList.length > 0 ? dogList : (
          <p className="walk-history-empty">No dogs with walk requests.</p>
        )}
      </div>
    </>
  );
}

export default WalkHistory;
