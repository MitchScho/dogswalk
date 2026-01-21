/* eslint-disable consistent-return */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useState } from 'react';
// --- Style Imports ---
import './WalkForm.scss';
// --- Component Imports ---
import DogAvatar from './DogAvatar';
// --- Api Imports ---
import { requestDogWalk } from '../api';
//--------------------------------------------------------------------------------------------------

function WalkForm({
  date, state, setState, setAddWalkDate,
}) {
  //-------------------------------------------------------------------------------
  const [selectedDogs, setSelectedDogs] = useState([]);

  const selectDogs = (dog) => {
    setSelectedDogs((prevSelectedDogs) => {
      if (prevSelectedDogs.includes(dog)) {
        return prevSelectedDogs.filter((selectedDog) => selectedDog !== dog);
      }
      return [...prevSelectedDogs, dog];
    });
  };

  //------------------------------------------------------------------------------------------

  const confirmWalk = () => {
    const { user } = state;

    if (selectedDogs.length > 0) {
      requestDogWalk(date, selectedDogs, user)
        .then(() => {
          setState((prev) => ({
            ...prev,
            reFreshKey: prev.reFreshKey + 1,
          }));
        });
      setAddWalkDate(null);
    }
  };

  //---------------------------------------------------------------------------------------------

  const dogList = state.dogs.map((dog) => (
    <DogAvatar
      key={dog.id}
      dog={dog}
      selectDogs={selectDogs}
      // selectedClass={selectedClass}
      selectedDogs={selectedDogs}
    />
  ));

  //-----------------------------------------------------------------------------------------------

  return (
    <div className="walk-form-wrapper">
      <div className="walk-form-date">
        <div>{date.format('dddd')}</div>
        <div>{date.format('MMM D')}</div>
      </div>
      <div className="dog-form-controls">
        <div
          className="walk-form-img"
        >
          {dogList}
        </div>
        <div className="walk-request-buttons">
          <button
            className="light-button"
            onClick={() => {
              setAddWalkDate(null);
            }}
          >
            Cancel
          </button>
          <button className="light-button" onClick={confirmWalk}>Request Walk</button>
        </div>
      </div>
    </div>
  );
}

export default WalkForm;
