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
import { getDogs, getDogWalks } from "./api.js";

//------------------------------------------------------------------------------------------------------------

function App() {
  const [state, setState] = useState({
    addWalkDate: null,
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
  }, []);

  useEffect(() => {
    getDogWalks()
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
              element={<Admin walks={state.walks} />}
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
