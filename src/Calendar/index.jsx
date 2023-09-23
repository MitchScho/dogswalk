/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import DateList from '../components/DateList';
import Profile from '../components/Profile';
import Nav from '../components/Nav';

import { getMe } from '../api';

//-------------------------------------------------------------------------------------------

function Calendar({ state, setState }) {
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

  if (!state.user) {
    return <div>Loading... No User...</div>;
  }

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
          element={<Profile state={state} setState={setState} />}
        />
      </Routes>
    </>
  );
}

export default Calendar;
