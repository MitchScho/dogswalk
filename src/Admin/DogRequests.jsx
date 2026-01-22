/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
//---------------------------------------------------------------------------
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import DogAvatar from '../components/DogAvatar';
import sortAllRequestsByDog from '../helpers/sortAllRequestsByDog';
import './index.scss';

function DogRequests({ adminState }) {
  const navigate = useNavigate();
  const [dogsWithRequests, setDogsWithRequests] = useState({});

  useEffect(() => {
    const sorted = sortAllRequestsByDog(adminState.walkRequests || []);
    setDogsWithRequests(sorted);
  }, [adminState.walkRequests, adminState.adminReFreshKey]);

  const handleSelectDog = (dog) => {
    navigate('/admin/dog-requests/detail', { state: { dogId: dog.id, dogName: dog.name } });
  };

  const dogList = Object.entries(dogsWithRequests).map(([dogName, requests]) => {
    const { dogId, image } = requests[0];
    const dog = { id: dogId, name: dogName, image };
    return (
      <div key={dogId} className="dog-light-button">
        <DogAvatar
          dog={dog}
          selectDogs={handleSelectDog}
          selectedDogs={[]}
          handleDeleteDog={() => {}}
        />
      </div>
    );
  });

  return (
    <>
      <div className="header-container">
        <div />
        <h3>Dog Requests</h3>
        <NavLink to="/admin">
          <FontAwesomeIcon className="back-icon" icon={faCircleLeft} />
        </NavLink>
      </div>
      <div className="button-list-container dog-requests-avatars">
        {dogList.length > 0 ? dogList : (
          <p className="dog-requests-empty">No dogs with walk requests.</p>
        )}
      </div>
    </>
  );
}

export default DogRequests;
