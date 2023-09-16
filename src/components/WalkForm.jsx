/* eslint-disable consistent-return */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import DogAvatar from './DogAvatar';
import { requestDogWalk } from '../api';
// --- Style Imports ---
import './WalkForm.scss';
//--------------------------------------------------------------------------------------------------

function WalkForm({
  date, state, setState, setAddWalkDate,
}) {
  //-------------------------------------------------------------------------------
  const [selectedDogs, setSelectedDogs] = useState([]);

  const selectDogs = (dog) => {
    if (selectedDogs.includes(dog)) {
      const newDogList = selectedDogs.filter(
        (selectedDog) => selectedDog !== dog,
      );
      return setSelectedDogs(newDogList);
    }
    setSelectedDogs((prev) => [...prev, dog]);
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
      selectedDogs={selectedDogs}
    />
  ));

  //-----------------------------------------------------------------------------------------------

  return (
    <>
      <div className="walk-form-date">
        <div>{date.format('dddd')}</div>
        <div>{date.format('MMM D')}</div>
      </div>
      <div className="dog-form-controls">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {dogList}
        </div>
        <div className="walk-request-buttons">
          <button onClick={(() => { setAddWalkDate(null); })}>Cancel</button>
          <button onClick={confirmWalk}>Request Walk</button>
        </div>
      </div>
    </>
  );
}

export default WalkForm;
