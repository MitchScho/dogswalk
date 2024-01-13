/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import ProfileDogAvatar from './DogAvatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import './Profile.scss';
import DogAvatar from './DogAvatar';
import { getUsersDogs } from '../api';

function Profile({
  handleDeleteDog, state, setState, addDog, setInputDog, inputDog,
}) {
  //-------------------------------------------------------------------------------
  // --- Duplicated code.......Review this..... -------------------------
  // const [selectedDogs, setSelectedDogs] = useState([]);

  // const selectDogs = (dog) => {
  //   if (selectedDogs.includes(dog)) {
  //     const newDogList = selectedDogs.filter(
  //       (selectedDog) => selectedDog !== dog,
  //     );
  //     return setSelectedDogs(newDogList);
  //   }
  //   return setSelectedDogs((prev) => [...prev, dog]);
  // };
  // const selectDogs = (dog) => {
  //   setSelectedDogs((prevSelectedDogs) => {
  //     if (prevSelectedDogs.includes(dog)) {
  //       return prevSelectedDogs.filter((selectedDog) => selectedDog !== dog);
  //     }
  //     return [...prevSelectedDogs, dog];
  //   });
  // };

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

  //-----------------------------------------------------------------------

  const usersDogList = state.dogs.map((dog) => (
    <div
      key={dog.id}
      className="flex flex-row justify-between items-center"
    >
      <DogAvatar
        key={dog.id}
        dog={dog}
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
            className="appearance-none bg-transparent border-none w-half text-white-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Register Dog"
            aria-label="Full name"
          />
          <button className="add-button" type="button" onClick={() => addDog(state.user.id, inputDog)}>
            Add Dog
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
