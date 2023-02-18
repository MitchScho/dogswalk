import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Auth from "./Auth";
import Admin from "./Admin";
import Home from "./Home";
import useApplicationData from "./hooks/useApplicationData";
//-- Style Imports --
import "./App.scss";
//------------------------------------------------------------------------------------------------------------

function App() {
  const { state, createDogWalk, deleteDogWalk } = useApplicationData();

  return (
    <>
      <div className="App">
        <Nav />
        <main>
          <Routes>
            <Route
              path="/*"
              element={
                <Home
                  state={state}
                  createDogWalk={createDogWalk}
                  deleteDogWalk={deleteDogWalk}
                />
              }
            ></Route>
            <Route path="auth/*" element={<Auth />}></Route>
            <Route
              path="admin/*"
              element={
                <Admin walks={state.walks} reFreshkey={state.reFreshKey} />
              }
            ></Route>
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
