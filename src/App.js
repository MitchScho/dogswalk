import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LandingPage from "./components/LandingPage";
import Auth from "./Auth";
import Admin from "./Admin";
import Calendar from "./Calendar";
import NotFound from "./components/NotFound";
//-- Style Imports --
import "./App.scss";
//--- API imports ---
import { getDogs, getWalks, getDogWalkRequests } from "./api.js";

//------------------------------------------------------------------------------------------------------------

function App() {
  const [state, setState] = useState({
    addWalkDate: null,
    walkRequests: [],
    walks: [],
    dogs: [],
    user: null,
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
    getWalks()
      .then((walks) => {
        setState((prev) => ({
          ...prev,
          walks: walks.data,
        }));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [state.reFreshKey]);

  useEffect(() => {
    getDogs()
      .then((dogs) => {
        setState((prev) => ({
          ...prev,
          dogs: dogs.data,
        }));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [state.reFreshKey]);

  useEffect(() => {
    
    getDogWalkRequests()
      .then((walkRequests) => {
        setState((prev) => ({
          ...prev,
          walkRequests: walkRequests.data,
        }));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [state.reFreshKey]);

  return (
    <>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route
              path="/calendar/*"
              element={<Calendar state={state} setState={setState} />}
            ></Route>
            <Route path="/auth/*" element={<Auth />}></Route>
            <Route
              path="/admin/*"
              element={<Admin walkRequests={state.walkRequests} />}
            ></Route>
            <Route path="/404" element={<NotFound />}>
              {" "}
            </Route>
            <Route path="*" element={<Navigate to="/404" replace />}>
              {" "}
            </Route>
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
