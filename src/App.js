import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Auth from "./Auth";
import Admin from "./Admin";
import Home from "./Home";

//-- Style Imports --
import "./App.scss";
//--- API imports ---
import {getDogs, getDogWalks} from "./api.js"

//------------------------------------------------------------------------------------------------------------

function App() {
const [state, setState] = useState({
  addWalkDate: null,
  walks: [],
  dogs: [],
  users: [],
  reFreshKey: 0,

});
  
  // useEffect(() => {
  //   getUsers().then((users) => {
  //     setState((prev) => ({
  //       ...prev,
  //       users: users.data
  //     }))
  //   })

  // }, []);

  useEffect(() => {
    getDogs().then((dogs) => {
      setState((prev) => ({
        ...prev,
        dogs: dogs.data
      }))
      //   .catch((err) => {
      //     console.log(err.message);
      // })
    })

  }, []);

  useEffect(() => {
    getDogWalks().then((walks) => {

      setState((prev) => ({
        ...prev,
        walks: walks.data
      }))
    })
      .catch((err) => {
        console.log(err.message);
    })

  }, [state.reFreshKey]);


  return (
    <>
      <div className="App">
        <Nav />
        <main>
          <Routes>
            <Route
              path="/*"
              element={
                <Home state={state} setState={setState} />
              }
            ></Route>
            <Route path="auth/*" element={<Auth />}></Route>
            <Route
              path="admin/*"
              element={
                <Admin walks={state.walks} />
              }
            ></Route>
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
