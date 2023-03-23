import DateList from "../components/DateList";
import Nav from "../components/Nav";

import { useEffect } from "react";

import { getMe } from "../api";

import { Routes, Route } from "react-router-dom";




//-------------------------------------------------------------------------------------------

const Calendar = ({ state, setState }) => {
  
  useEffect(() => {
    
    getMe().then((res) => {
      console.log("getMe response", res);
        setState((prev) => ({
          ...prev,
          user: res.data,
          reFreshKey: prev.reFreshKey + 1,
        }));
      })
        .catch((err) => {
          console.log(err.message);
      })
    
  }, []);

  console.log("user", state.user);

 

  return (
    <>
      <Nav state={state} setState={setState} />
      <Routes>
        <Route
          path="/"
          element={<DateList state={state} setState={setState} />}
        ></Route>
      </Routes>
    </>
  );
};

export default Calendar;
