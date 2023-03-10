import DateList from "../components/DateList";
import LandingPage from "../components/LandingPage";

import { useEffect } from "react";

import { getMe } from "../api";

import { Routes, Route } from "react-router-dom";




//-------------------------------------------------------------------------------------------

const Home = ({ state, setState }) => {
  
  useEffect(() => {
    getMe().then((res) => {
      setState((prev) => ({
        ...prev,
        user: res.data,
      }));
    });
  }, []);
 

  console.log("user at home page", state.user);

  return (
    <>
      <Routes>
        {state.user ? (
          <Route
            path="/"
            element={<DateList state={state} setState={setState} />}
          ></Route>
        ) : (
          <Route path="/" element={<LandingPage />}></Route>
        )}
      </Routes>
    </>
  );
};

export default Home;
