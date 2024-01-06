/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import ProfileDogAvatar from './DogAvatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import './Profile.scss';
import DogAvatar from './DogAvatar';
import { getUsersDogs, addDogForUser } from '../api';

function Profile({ handleDeleteDog, state, setState }) {
  const [inputDog, setInputDog] = useState('');

  //-------------------------------------------------------------------------------
  // --- Duplicated code.......Review this..... -------------------------
  const [selectedDogs, setSelectedDogs] = useState([]);

  const selectDogs = (dog) => {
    if (selectedDogs.includes(dog)) {
      const newDogList = selectedDogs.filter(
        (selectedDog) => selectedDog !== dog,
      );
      return setSelectedDogs(newDogList);
    }
    return setSelectedDogs((prev) => [...prev, dog]);
  };

  //----------------------------------------------------------------
  console.log('State Re Fresh', state.reFreshKey);
  useEffect(() => {
    getUsersDogs(state.user.id).then((dogs) => {
      setState((prev) => ({
        ...prev,
        dogs: dogs.data,
      }));
    });
  }, [state.reFreshKey]);

  if (!state.dogs) {
    return <div>Loading no Dogs yet...</div>;
  }

  //---------------------------------------------------------------

  // const handleDeleteDog = (dogId) => {
  //   deleteDog(dogId);
  //   setState((prev) => ({
  //     ...prev,
  //     reFreshKey: prev.reFreshKey + 1,
  //   }));
  // };

  //-----------------------------------------------------------------------

  const usersDogList = state.dogs.map((dog) => (
    <div
      key={dog.id}
      className="flex flex-row justify-between items-center"
    >
      <DogAvatar
        key={dog.id}
        dog={dog}
        selectDogs={selectDogs}
        selectedDogs={selectedDogs}
      />
      <button
        className="delete-button"
        type="button"
        onClick={() => handleDeleteDog(dog.id)}
      >
        Delete
      </button>
    </div>
  ));

  // console.log(usersDogList);

  //-----------------------------------------------------------------

  const addDog = (e) => {
    e.preventDefault();

    addDogForUser(state.user.id, inputDog)
      .then(() => {
        setState((prev) => ({
          ...prev,
          reFreshKey: prev.reFreshKey + 1,
        }));
        setInputDog('');
      });
  };

  return (
    <div className="border-solid flex items-center justify-center flex-col">
      <div className="back-icon-container">
        <div />
        <h4>Profile</h4>
        <NavLink to="/calendar">
          <FontAwesomeIcon className="back-icon" icon={faCircleLeft} />
        </NavLink>
      </div>
      <div>{usersDogList}</div>
      <form className="w-half max-w-sm">
        <div className="flex items-center border-b border-grey-500 py-2">
          <input
            value={inputDog}
            onChange={(e) => setInputDog(e.target.value)}
            className="appearance-none bg-transparent border-none w-half text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Register Dog"
            aria-label="Full name"
          />
          <button className="add-button" type="button" onClick={addDog}>
            Add Dog
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
