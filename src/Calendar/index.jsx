/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import DateList from '../components/DateList';
import Profile from '../components/Profile';
import Nav from '../components/Nav';

import { getMe, deleteDog, addDogForUser } from '../api';

//-------------------------------------------------------------------------------------------

function Calendar({ state, setState }) {
  const [inputDog, setInputDog] = useState('');
  //-------------------------------------------------------------------------------
  useEffect(() => {
    getMe()
      .then((res) => {
        setState((prev) => ({
          ...prev,
          user: res.data,
          reFreshKey: prev.reFreshKey + 1,
        }));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  //----------------------------------------

  if (!state.user) {
    return <div>Loading User Application...</div>;
  }
  //----------------------------------------------
  const addDog = (userId) => {
    // e.preventDefault();

    addDogForUser(userId, inputDog)
      .then(() => {
        setState((prev) => ({
          ...prev,
          reFreshKey: prev.reFreshKey + 1,
        }));
        setInputDog('');
      });
  };

  //-----------------------------------------

  const handleDeleteDog = (dogId) => {
    deleteDog(dogId).then(() => {
      setState((prev) => ({
        ...prev,
        reFreshKey: prev.reFreshKey + 1,
      }));
    });
  };

  //-------------------------------------------

  return (
    <>
      <Nav state={state} setState={setState} />
      <Routes>
        <Route
          path="/"
          element={<DateList state={state} setState={setState} />}
        />
        <Route
          path="/profile"
          element={(
            <Profile
              handleDeleteDog={handleDeleteDog}
              addDog={addDog}
              state={state}
              setState={setState}
              setInputDog={setInputDog}
              inputDog={inputDog}
            />
)}
        />
      </Routes>
    </>
  );
}

export default Calendar;
