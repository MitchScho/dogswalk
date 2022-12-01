import Nav from './components/Nav'
import Auth from './Auth';
import Admin from './Admin';
import DateList from './components/DateList'
import './App.scss';
import useApplicationData from './hooks/useApplicationData';
import { Routes, Route } from "react-router-dom";
//------------------------------------------------------------------------------------------------------------

function App() {


  const { state, createDogWalk, deleteDogWalk } = useApplicationData();


  return (
    <>
      <div className="App">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<DateList
              walks={state.walks}
              createDogWalk={createDogWalk}
              deleteDogWalk={deleteDogWalk}
              dogs={state.dogs} />}>
            </Route>
            <Route path="auth/*" element={<Auth />}></Route>
            <Route path="admin/*" element={<Admin walks={state.walks} reFreshkey={state.reFreshKey}/>}></Route>
          </Routes>
        </main>
      </div>
    </>
  );

}

export default App;

