import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Auth from "./Auth";
import Admin from "./Admin";
import Home from "./Home";
import NotFound from "./components/NotFound";
//-- Style Imports --
import "./App.scss";
//--- API imports ---
import { getDogs, getDogWalks, getMe } from "./api.js"

//------------------------------------------------------------------------------------------------------------

function App() {
  const [state, setState] = useState({
    addWalkDate: null,
    walks: [],
    dogs: [],
    user: {},
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
  console.log("user role at app ==>", state.user?.role);

  return (
    <>
      <div className="App">
        <Nav state={state} setState={setState} />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home state={state} setState={setState} />
              }
            ></Route>
            <Route path="/auth/*" element={<Auth />}></Route>
            {state.user?.role === "admin" && (
              <Route
                path="/admin/*"
                element={
                  <Admin walks={state.walks} />
                }
              ></Route>

            )}
            <Route path="/404" element={<NotFound/>}> </Route>
            <Route path="*" element={<Navigate to="/404" replace />}> </Route>
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
